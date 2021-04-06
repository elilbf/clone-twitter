const PostsModel = require('../models/Post')
const UserModel = require('../models/User')

module.exports = {
  async create(data, user) {
    if(!data.content){
      throw new Error('O Content não existe!')
    }
  
    const postInstance = new PostsModel(data)
    const response = await postInstance.save()
    const postedByUser = await UserModel.findOneAndUpdate({ user }, { $push: {posts: response._id}})

    return {...response._doc, user: postedByUser}
  }
}