const jwt = require('jsonwebtoken')
const User = require('../models/users')


//Creating auth function for authentication
/**
 * 
 * @param {String} req 
 * @param {*} res 
 * @param {*} next 
 */
const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        const decoded = jwt.verify(token, 'bookstore')
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token })

        if (!user) {
            throw new Error()
        }

        req.token = token
        req.user = user
        req.role=decoded.role
        next()
    } catch (e) {
        res.status(401).send({ error: 'Authentication is necessary' })
    }
}

module.exports = auth