const User = require('../models/user.model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')

// @desc Login
// @route POST /auth
// @access Public
const login = asyncHandler(async (req, res) => {
    // const { username, password } = req.body

    // if (!username || !password) {
    //     return res.status(400).json({ message: 'All fields are required' })
    // }

    // const foundUser = await User.findOne({ username }).exec()

    // if (!foundUser || !foundUser.active) {
    //     return res.status(401).json({ message: 'Unauthorized' })
    // }

    // const match = await bcrypt.compare(password, foundUser.password)

    // if (!match) return res.status(401).json({ message: 'Unauthorized' })

    // const accessToken = jwt.sign(
    //     {
    //         "UserInfo": {
    //             "username": foundUser.username,
    //             "roles": foundUser.roles
    //         }
    //     },
    //     process.env.ACCESS_TOKEN_SECRET,
    //     { expiresIn: '2m' }
    // )

    // const refreshToken = jwt.sign(
    //     { "username": foundUser.username },
    //     process.env.REFRESH_TOKEN_SECRET,
    //     { expiresIn: '7d' }
    // )

    // // Create secure cookie with refresh token 
    // res.cookie('jwt', refreshToken, {
    //     httpOnly: true, //accessible only by web server 
    //     secure: true, //https
    //     sameSite: 'None', //cross-site cookie 
    //     maxAge: 7 * 24 * 60 * 60 * 1000 //cookie expiry: set to match rT
    // })

    // // Send accessToken containing username and roles 
    // res.json({ accessToken })
})
// @desc Sign up
// @route POST /auth/signup
// @access Public
const SignUp = asyncHandler(async (req, res) => {

    // const { username, password } = req.body

    // // Confirm data
    // if (!username || !password) {
    //     return res.status(400).json({ message: 'username and password fields are required' })
    // }

    // // Check for duplicate username
    // const duplicate = await User.findOne({ username }).lean().exec()

    // if (duplicate) {
    //     return res.status(409).json({ message: 'Duplicate username' })
    // }

    // // Hash password 
    // const hashedPwd = await bcrypt.hash(password, 10) // salt rounds

    // var userObject = { username, "password": hashedPwd }
    // const user = await User.create(userObject)

    // if (user) { //created 
    //     res.status(201).json({ message: `New user ${username} created` })
    // } else {
    //     res.status(400).json({ message: 'Invalid user data received' })
    // }
})
// @desc Refresh
// @route GET /auth/refresh
// @access Public - because access token has expired
const refresh = (req, res) => {
    // const cookies = req.cookies
    // if (!cookies?.jwt) return res.status(401).json({ message: 'Unauthorized' })
    // console.log("Check")
    // const refreshToken = cookies.jwt

    // jwt.verify(
    //     refreshToken,
    //     process.env.REFRESH_TOKEN_SECRET,
    //     asyncHandler(async (err, decoded) => {
    //         if (err) return res.status(403).json({ message: 'Forbidden' })

    //         const foundUser = await User.findOne({ username: decoded.username }).exec()

    //         if (!foundUser) return res.status(401).json({ message: 'Unauthorized' })

    //         const accessToken = jwt.sign(
    //             {
    //                 "UserInfo": {
    //                     "username": foundUser.username,
    //                     "roles": foundUser.roles
    //                 }
    //             },
    //             process.env.ACCESS_TOKEN_SECRET,
    //             { expiresIn: '15m' }
    //         )

    //         res.json({ accessToken })
    //     })
    // )
}

// @desc Logout
// @route POST /auth/logout
// @access Public - just to clear cookie if exists
const logout = (req, res) => {
    // const cookies = req.cookies
    // if (!cookies?.jwt) return res.sendStatus(204) //No content
    // res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true })
    // res.json({ message: 'Cookie cleared' })
}

module.exports = {
    login,
    SignUp,
    refresh,
    logout
}