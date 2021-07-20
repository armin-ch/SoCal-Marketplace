const router = require('express').Router()
const { User } = require('../models')
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
  User.findOne({ username: req.user.username })
    .populate('listings')
    .then(() => res.json(req.user))
    .catch(err => console.log(err))
})

router.get('/users/:username', passport.authenticate('jwt'), (req, res) => {
  User.findOne({ username: req.params.username })
    .populate({
      path: 'listings',
      model: 'Listing',
      populate: {
        path: 'seller',
        model: 'User',
      }
      // populate: {
      //   path: 'category',
      //   model: 'Category',
      // }
    })
    .populate({
      path: 'reviews',
      model: 'Review',
      populate: {
        path: 'author',
        model: 'User'
      }
    })
    .then(user => res.json(user))
    .catch(err => console.log(err))
})

module.exports = router
