const mongoose = require("mongoose");

const Post = new mongoose.Schema({
  content: {type: String, required: true},
  user: {type: String, required: true},
  create_date: {type: Date},
  visible: {type: Boolean, required: true},
},
{
  timestamps: true
})

module.exports = mongoose.model('post', Post)