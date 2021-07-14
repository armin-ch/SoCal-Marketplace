const { model, Schema } = require('mongoose')

const User = new Schema({
  userName: String,
  email: String,
  posts: [{
    type: Schema.Types.ObjectId,
    ref: 'Post'
  }]
  reviews: [{
    type: Schema.Types.ObjectId,
    ref: 'Review'
  }]
})

User.plugin(require('passport-local-mongoose'))

module.exports = model('User', User)