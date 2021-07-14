module.exports = require('mongoose').connect(process.env.MONGODB_URI || 'mongodb://localhost/marketplace_db', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})