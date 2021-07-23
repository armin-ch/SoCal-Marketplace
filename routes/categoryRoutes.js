const router = require('express').Router()
const { Category, Listing } = require('../models')
const passport = require('passport')

// GET by category
router.get('/categories/:id', passport.authenticate('jwt'), (req, res) => Category.findById(req.params.id)
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

  // get all listings in a category
  // router.get('/categories/:category', (req,res) => Category.find({name: req.params.category})
  // )

module.exports = router