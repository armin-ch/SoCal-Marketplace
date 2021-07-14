const router = require('express').Router()
const { Review, User } = require('../models')
const passport = require('passport')

router.post('/reviews', passport.authenticate('jwt'), (req, res) => {
  Review.create({
    title: req.body.title,
    body: req.body.body,
    rating: req.body.rating,
    author: req.user._id,
  })
    .then(review => {
      User.findByIdAndUpdate(req.body.user_id, { $push: { reviews: review._id } })
        .then(() => {
          res.json({
            title: review.title,
            author: req.user,
            user_id: req.body.user_id
          })
        })
    })
})

module.exports = router