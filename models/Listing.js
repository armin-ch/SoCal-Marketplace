const { model, Schema } = require('mongoose')

const Listing = new Schema({
  title: String,
  rent: Boolean,
  sell: Boolean,
  body: String,
  price: Number,
  datePosted: Date,
  buyer: String,
  selldate: Date,
  rating: {
    type: Number,
    default: -1
  },
  isSold: {
    type:Boolean, 
    default: false
  },
  seller: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category'
  },
  imageURL: String,
  lat: Number,
  lng: Number
})

module.exports = model('Listing', Listing)
