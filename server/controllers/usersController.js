const User = require('../models/User');
const Note = require('../models/Note');
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');

const getAllUsers = asyncHandler(async (req, res) => {
    const users = await User.find().select('-password').lean();
    if(!users){
        return res.status(400).json({
            message: "No users found"
        })
    }
    res.json(users);
})
// create user
const createNewUsers = asyncHandler(async (req, res) => {
    const { username, password, roles } = req.body;
    if(!username || !password || !Array.isArray(roles) || !roles.length){
        return res.status(400).json({
            message : "All fields are required!"
        })
    }
    const duplicate = await User.findOne({ username }).lean().exec();

    if(duplicate){
        return res.status(409).json({
            message: "Duplicate Username"
        })
    }
    // Hash Password
    const hashedPwd = await bcrypt.hash(password, 10) // salt rounds

    const userObject = { username, "password" : hashedPwd, roles }

    // create and store new users
    const user = await User.create(userObject);

    if(user) { // created
        res.status(201).json({
            message: `New user ${username} created`
        })
    } else {
        res.status(400).json({
            message: "Invalid user data received"
        })
    }
})
// Update user
const updateUsers = asyncHandler(async (req, res) => {
    const { id, username, roles, active, password } = req.body;

    // confirm data
    if(!id || !username || !Array.isArray(roles) || !roles.length || typeof active!== 'boolean'){
        return res.status(400).json({
            message: "All fields are required!"
        })
    }

    const user = await User.findById(id).exec();

    if(!user){
        return res.status(400).json({
            message: "User not found"
        })
    }

    // Duplicate
    const duplicate = await User.findOne({ username }).lean().exec();
    // Allow updates to the original user
    if(duplicate && duplicate?._id.toString() !== id){
        return res.status(409).json({
            message: "duplicate username"
        })
    }

    user.username = username
    user.roles = roles
    user.active = active

    if(password){
        // Hash password
        user.password = await bcrypt.hash(password, 10) // salt rounds
    }

    const updatedUsers = await user.save()

    res.json({
        message: `${updateUsers.username} updated`
    })
})
const deleteUsers = asyncHandler(async (req, res) => {

})

module.exports = {
    getAllUsers,
    createNewUsers,
    updateUsers,
    deleteUsers
}