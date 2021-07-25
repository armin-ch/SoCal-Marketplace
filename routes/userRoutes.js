const router = require('express').Router()
const { User, Listing } = require('../models')
const passport = require('passport')
const jwt = require('jsonwebtoken')

router.post('/users/register', (req, res) => {
  const { email, name, username } = req.body
  User.register(new User({ email, name, username }), req.body.password, err => {
    if (err) { console.log(err) }
    res.sendStatus(200)
  })
})

router.post('/users/login', (req, res) => {
  User.authenticate()(req.body.username, req.body.password, (err, user) => {
    if (err) { console.log(err) }
    res.json(user ? jwt.sign({ id: user._id }, process.env.SECRET) : null)
  })
})

router.get('/users/me', passport.authenticate('jwt'), (req, res) => {
  User.findById(req.user.id)
    .populate('listings')
    .populate({
      path: 'history',
      model: 'Listing',
      populate: {
        path: 'seller',
        model: 'User',
      },
      populate: {
        path: 'category',
        model: 'Category',
      }
    })
    .then(() => res.json(req.user))
    .catch(err => console.log(err))
  })

router.get('/users/id/:id', passport.authenticate('jwt'), (req, res) => {
  User.findById(req.params.id)
  .then(user => res.json(user))
})

router.get('/users/:username', passport.authenticate('jwt'), (req, res) => {
  User.findOne({ username: req.params.username })
    .populate({
      path: 'listings',
      model: 'Listing',
      populate: {
        path: 'seller',
        model: 'User',
      },
      populate: {
        path: 'category',
        model: 'Category',
      }
    })
    .then(user => res.json(user))
    .catch(err => console.log(err))
})

router.put('/users/:username', passport.authenticate('jwt'), (req, res) => {
  User.findOneAndUpdate({ username: req.params.username }, { $set: req.body })
  .then(user => res.json(user))
})

// push a listing in
router.put('/users/:username/listing', passport.authenticate('jwt'), (req, res) => {
  User.findOneAndUpdate({ username: req.params.username }, { $push: req.body })
  .then(user => res.json(user))
})

router.get('/users/history/:username', passport.authenticate('jwt'), (req, res) => {
  Listing.find({ buyer: req.params.username })
    .then(listings => res.json(listings))
    .catch(err => console.log(err))
})
// router.put('/users/addnotification', passport.authenticate('jwt'), (req, res) => {
//   const { messages } = req.body
//   User.findOne({ messages: req.params.username })
// })

module.exports = router
