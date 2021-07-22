const { model, Schema } = require('mongoose')

const User = new Schema({
  name: String,
  email: String,
  listings: [{
    type: Schema.Types.ObjectId,
    ref: 'Listing'
  }],
  reviews: [{
    type: Schema.Types.ObjectId,
    ref: 'Review'
  }],
  // notifications: [{
  //   messages: String
  // }]
})

User.plugin(require('passport-local-mongoose'))

module.exports = model('User', User)