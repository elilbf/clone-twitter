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
  async create(data) {
     
      const { password } = data
      const encryptedPassword = bcrypt.hashSync(password, 2)

      return await UserModel.create({ ...data, password: encryptedPassword }) 
   
  },
  async profile(user) {
    return await UserModel.find({ user }).populate('posts')
  },
  async login(data) {
    const user = await UserModel.findOne({ email: data.email})

    if(!user){
      throw new Error('Usuário não existe')
    }

    if(bcrypt.compareSync(data.password, user.password)){
      return { token: createToken(user) }
    } else {
      throw new Error('Senha incorreta')
    }

    return 
  }
}