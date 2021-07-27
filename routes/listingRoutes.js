const router = require('express').Router()
const { Listing, User, Category } = require('../models')
const passport = require('passport')

// GET all listings
router.get('/listings', (req, res) => {
  Listing.find({}).sort({ datePosted: -1 })
    .populate('seller')
    .populate('category')
    .then(listings => res.json(listings))
    .catch(err => console.log(err))
})


// GET all listings by username
router.get('/listings/getall/:userid', (req, res) => {
  Listing.find({ seller: req.params.userid }).sort({ datePosted: -1 })
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
  category: req.body.category,
  imageURL: req.body.imageURL,
  lat: req.body.lat,
  lng: req.body.lng
})
  .then(listing => {
    User.findByIdAndUpdate(req.user._id, { $push: { listings: listing._id } })
      .then(() => {
       Category.findByIdAndUpdate(listing.category, { $push: {listings: listing._id}})
       .then(()=> res.json(listing))
      })
  })
  .catch(err => console.log(err)))

// PUT one listing
router.put('/listings/:id', passport.authenticate('jwt'), (req, res) => Listing.findByIdAndUpdate(req.params.id, { $set: req.body })
  .then(listing => res.json(listing))
  .catch(err => console.log(err)))


// DELETE one listing
router.delete('/listings/:id', passport.authenticate('jwt'), (req, res) => Listing.findByIdAndDelete(req.params.id)
  .then(listing => res.json(listing))
  .catch(err => console.log(err)))

module.exports = router
