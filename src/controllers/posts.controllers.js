const PostsModel = require('../models/Post')
const UserModel = require('../models/User')

module.exports = {
  async create(req, res) {
    try {
      const {body} = req
      const {user} = body
    
      if(!body.content){
        throw new Error('O Content não existe!')
      }
    
      const postInstance = new PostsModel(body)
      const response = await postInstance.save()
      const postedByUser = await UserModel.findOneAndUpdate({ user }, { $push: {posts: response._id}})
    
      res.send({...response._doc, user: postedByUser})
    } catch (e) {
      console.error(e)
      res.status(500).send( {error: true })
    }
  }
}