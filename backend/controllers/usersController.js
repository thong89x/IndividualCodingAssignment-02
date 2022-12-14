let User = require('../models/user.model');
const bcrypt = require('bcrypt')
const asyncHandler = require('express-async-handler')


// @desc Get all users
// @route GET /users
// @access Private
const getAllUsers = asyncHandler(async (req, res) => {
    // Get all users from MongoDB
    const users = await User.find().select('-password').lean()

    // If no users 
    if (!users?.length) {
        return res.status(400).json({ message: 'No users found' })
    }

    res.json(users)
})
const getUserById = asyncHandler(async (req, res) => {
    console.log(req.params.id)
    // Get all users from MongoDB
    const users = await User.findById(req.params.id).select('-password').lean()

    // If no users 
    if (!users) {
        return res.status(400).json({ message: 'No users found' })
    }

    res.json(users)
})
const createUser = asyncHandler(async (req, res) => {
    console.log("has req")

    const { username, password, roles } = req.body

    // Confirm data
    if (!username || !password) {
        return res.status(400).json({ message: 'username and password fields are required' })
    }
    // Check for duplicate username
    const duplicate = await User.findOne({ username }).lean().exec()

    if (duplicate) {
        return res.status(409).json({ message: 'Duplicate username' })
    }
    // Hash password 
    const hashedPwd = await bcrypt.hash(password, 10) // salt rounds

    var userObject = { username, "password": hashedPwd,roles }

    const user = await User.create(userObject)

    if (user) { //created 
        res.status(201).json({ message: `New user ${username} created` })
    } else {
        res.status(400).json({ message: 'Invalid user data received' })
    }
})
// @desc Update a user
// @route PATCH /users
// @access Private
const updateUser = asyncHandler(async (req, res) => {
    const { username, password,roles, active  } = req.body
    const id = req.params.id;
    // Confirm data 
    if (!id || !username|| typeof active !== 'boolean') {
        return res.status(400).json({ message: 'All fields except password are required' })
    }

    // Does the user exist to update?
    const user = await User.findOne({ username }).exec()

    if (!user) {
        return res.status(400).json({ message: 'User not found' })
    }
    user.roles = roles
    user.active = active

    if (password) {
        // Hash password 
        user.password = await bcrypt.hash(password, 10) // salt rounds 
    }

    const updatedUser = await user.save()

    res.json({ message: `${updatedUser.username} updated` })
})

// @desc Delete a user
// @route DELETE /users
// @access Private
const deleteUser = asyncHandler(async (req, res) => {

//     User.remove({}, function(err) {
//         if (err) {
//             console.log(err)
//         } else {
//             res.end('success');
//         }
//     }
// );
//     return;
    const id  = req.params.id  || req.body.id
    console.log(id);
    // Confirm data
    if (!id) {
        return res.status(400).json({ message: 'User ID Required' })
    }

    const user = await User.findById(id).exec()
    if (!user) {
        return res.status(400).json({ message: 'User not found' })
    }

    const result = await user.deleteOne()

    const reply = `Username ${result.username} with ID ${result._id} deleted`

    res.json(reply)
})

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
}