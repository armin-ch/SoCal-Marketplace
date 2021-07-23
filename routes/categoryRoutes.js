const router = require('express').Router()
const { Category, Listing } = require('../models')
const passport = require('passport')

// GET by category
router.get('/categories/:name', passport.authenticate('jwt'), (req, res) => Category.find({name: req.params.name})
  .populate({
    path: 'listings',
    model: 'Listing',
    populate: {
      path: 'seller',
      model: 'User'
    }
  })
  .then(listing => res.json(listing))
  .catch(err => console.log(err)))

  router.post('/categories', (req, res) => Category.create({name: req.body.name})
  .then(category=> res.json(category)))

module.exports = router