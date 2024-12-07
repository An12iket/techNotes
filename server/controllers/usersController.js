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
const updateUsers = asyncHandler(async (req, res) => {

})
const deleteUsers = asyncHandler(async (req, res) => {

})

module.exports = {
    getAllUsers,
    createNewUsers,
    updateUsers,
    deleteUsers
}