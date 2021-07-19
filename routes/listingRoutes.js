const router = require('express').Router()
const { Listing, User } = require('../models')
const passport = require('passport')

// GET all listings
router.get('/listings', (req, res) => {
  Listing.find({})
    .populate('seller')
    .populate('category')
  .then(listings => res.json(listings))
  .catch(err => console.log(err))
})

// GET one listing
router.get('/listings/:id', passport.authenticate('jwt'), (req, res) => Listing.findById(req.params.id)
  .populate('seller')
  .then(listing => res.json(listing))
  .catch(err => console.log(err)))

// POST one listing
router.post('/listings', passport.authenticate('jwt'), (req, res) => Listing.create({
  title: req.body.title,
  rent: req.body.rent,
  sell: req.body.sell,
  body: req.body.body,
  price: req.body.price,
  seller: req.user._id,
  datePosted: req.body.datePosted,
  categoty: req.body.category,
  imageURL: req.body.imageURL
})
  .then(listing => {
    User.findByIdAndUpdate(req.user._id, { $push: { listings: listing._id } })
      .then(() => {
        res.json({
          id: listing._id,
          title: listing.title,
          body: listing.body,
          seller: req.user,
          rent: listing.rent,
          sell: listing.sell,
          datePosted: listing.datePosted,
          price: listing.price,
          category: listing.category
        })
      })
  })
  .catch(err => console.log(err)))

// PUT one listing
router.put('/listings/:id', passport.authenticate('jwt'), (req, res) => Listing.findByIdAndUpdate(req.params.id, { $set: req.body })
  .then(listing => {
    User.findByIdAndUpdate(req.user._id, { $push: { listings: listing._id } })
      .then(() => {
        res.json({
          id: listing._id,
          title: listing.title,
          body: listing.body,
          seller: req.user,
          rent: listing.rent,
          sell: listing.sell,
          datePosted: listing.datePosted,
          price: listing.price,
          category: listing.category
        })
      })
  })
  .catch(err => console.log(err)))

// DELETE one listing
router.delete('/listings/:id', passport.authenticate('jwt'), (req, res) => Listing.findByIdAndDelete(req.params.id)
  .then(listing => res.json(listing))
  .catch(err => console.log(err)))

module.exports = router