const mongoose = require("mongoose");
const { Schema, Types: {ObjectId} } = mongoose

const Post = new Schema({
  content: {type: String, required: true},
  user: {type: String, required: true},
  create_date: {type: Date, required: true},
  visible: {type: Boolean, default: true},
  likes: [{ type: ObjectId, ref: 'user'}]
},
{
  timestamps: true
})

module.exports = mongoose.model('post', Post)