const mongoose = require('mongoose');

const { Schema, Types: {ObjectId} } = mongoose;


const User = new Schema({
  
    name: {type: String, required: true },
    age: {type: String, required: true },
    bio: {type: String, required: true },
    user: {type: String, required: true },
    location: {type: Object, required: true },
    posts: [{type: ObjectId, ref: 'Post' }],
    email: {type: String, required: true },
    profile_pic: {type: String, required: true },
    birth_date: Date
})

module.exports = mongoose.model('user', User)