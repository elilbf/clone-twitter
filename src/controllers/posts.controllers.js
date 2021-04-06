const PostsService = require('../services/posts.service')

module.exports = {
  async create(req, res) {
    try {
      const {body} = req
      const {user} = body
      
      const response = await PostsService.create(body, user)
    
      res.send(response)
    } catch (e) {
      console.error(e)
      res.status(500).send( {error: true })
    }
  }
}