const { model, Schema } = require('mongoose')

const Listing = new Schema({
  title: String,
  rent: Boolean,
  sell: Boolean,
  body: String,
  price: Number,
  datePosted: Date,
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
  address: String
})

module.exports = model('Listing', Listing)
