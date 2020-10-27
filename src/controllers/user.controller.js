const UserModel = require('../models/User')

module.exports = { 
  async create(req, res) {

    try {
      const { body } = req
      const created = await UserModel.create(body)
    
      res.send(created) 
    
      } catch (e) {
        res.handleHttpError(e)
        
      }
  },
  async profile(req, res){
    try {
      const { user } = req.params
      const profile = await UserModel.find({ user }).populate('posts')
  
      res.send(profile) 
    } catch (e) {
      res.handleHttpError(e)
    }

  }
}