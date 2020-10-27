const HandleHttpError = (req, res, next) => {
  res.handleHttpError = ({message}) => {
    res.status(500).send({error: true, message})
  }

  next()
}

module.exports = HandleHttpError