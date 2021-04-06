const jwt = require('jsonwebtoken')
const moment = require('moment')
const excludeUrls = ['/login']

const AuthMiddleware = (req, res, next) => {
  if(excludeUrls.includes(req.path)){
    next()
  } else {
    const { authorization } = req.headers
    const { JWT_SECRET } = process.env

    if(!authorization){
      res.send({message: 'URL requer autenticação!'})
    }

    const decoded = jwt.verify(authorization, JWT_SECRET)
    const now = moment().unix()

    if(now > decoded.exp){
      res.send({ message: 'Token expirado!'})
    }
    
    req.decoded = decoded

    next()
  }
  
}

module.exports = AuthMiddleware