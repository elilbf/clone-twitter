const bcrypt = require('bcrypt')
const moment = require('moment')
const jwt = require('jsonwebtoken')
const UserModel = require('../models/User')

const createToken = (payload) => {
  const { JWT_SECRET } = process.env
  console.log(process.env)

  return jwt.sign({
    iat: moment().unix(),
    exp: moment().add(1, 'day').unix(),
    id: payload._id
  }, JWT_SECRET)
}

module.exports = { 
  async create(req, res) {

    try {
      const { body } = req
      const {password} = body
      const encryptedPassword = bcrypt.hashSync(password, 2)
      const created = await UserModel.create({...body, password: encryptedPassword})
    
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

  },

  async login(req, res) {
    const {body} = req
    const user = await UserModel.findOne({ email: body.email})

    if(!user){
      res.send({error: true, message: 'Usuário não existe'})
    }

    if(bcrypt.compareSync(body.password, user.password)){
      res.send({token: createToken(user)})
    } else {
      res.send({error: true, message: 'Senha incorreta'})
    }
  }
}