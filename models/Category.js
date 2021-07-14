const { model, Schema } = require('mongoose')

const Category = new Schema({
  name: String,
  listings: [{
    type: Schema.Types.ObjectId,
    ref: 'Listing'
  }]
})

module.exports = model('Category', Category)