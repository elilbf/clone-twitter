const express = require("express")
const mongoConnector = require("./mongoose-connector")
const { create: createPosts } = require('./src/controllers/posts.controllers')
const { create: createUser, profile, login } = require('./src/controllers/user.controller')
const HandleHttpError = require('./src/middlewares/handle-http-error')
const AuthMiddleware = require('./src/middlewares/auth-middleware')

require("dotenv").config()

const app = express()
const { HTTP_PORT, MONGO_URI } = process.env

mongoConnector(MONGO_URI)

app.use(express.json())
app.use(HandleHttpError)
app.use(AuthMiddleware)

app.get("/", (req, res) => {
  res.send("Hello World")
});

app.post("/posts", createPosts)
app.post('/users', createUser)
app.post('/login', login)
app.get('/profile/:user', profile)


app.listen(HTTP_PORT, () => {
  console.log(`Estou conectado na porta ${HTTP_PORT}`)
})
