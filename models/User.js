const { model, Schema } = require('mongoose')

const User = new Schema({
  name: String,
  email: String,
  listings: [{
    type: Schema.Types.ObjectId,
    ref: 'Listing'
  }],
  rating: {
    type: Number,
    default: 0
  },
  numratings: {
    type: Number,
    default: 0},
  history: [{
    type: Schema.Types.ObjectId,
    ref: 'Listing'
  }]
    ref: 'Review'
  }],
  // notifications: [{
  //   messages: String
  // }]
})

User.plugin(require('passport-local-mongoose'))

module.exports = model('User', User)