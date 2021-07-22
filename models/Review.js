const { model, Schema } = require('mongoose')

const Review = new Schema({
  title: String,
  body: String,
  rating: Number,
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  seller: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
})

module.exports = model('Review', Review)
