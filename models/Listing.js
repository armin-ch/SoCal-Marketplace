const { model, Schema } = require('mongoose')

const Listing = new Schema({
  title: String,
  rent: Boolean,
  sell: Boolean,
  body: String,
  price: Number,
  datePosted: Date,
  seller: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category'
  }
  // imageURLs: [{
  //   type: String
  // }]
})

module.exports = model('Listing', Listing)
