const User = require("../models/userModel");
const { isValidObjectId } = require("mongoose")
// @desc Register new user
// @route POST /api/user/register
// @access Public
const registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    // check for all fields
    if (!name || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    // check if user already exists
    const findUser = await User.findOne({ email });
    if (findUser) {
        return res.status(409).json({ message: "User already exists" });
    }

    const user = await User.create({ name, email, password });
    res.status(200).json({ message: "User created successfully", user });
}

// @desc Login user
// @route POST /api/user/login
// @access Public
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    // check if email exits or not
    const findUser = await User.findOne({ email });
    if (!findUser) {
        return res.status(404).json({ message: "User not found" });
    }

    // check if password is correct
    const isMatch = findUser?.password === password;
    if (!isMatch) {
        return res.status(401).json({ message: "Invalid credentials" });
    } else {
        return res.status(200).json({ message: "Login successful", user: findUser });
    }
}

// @desc Get All Users
// @route GET /api/user/getAll
// @access Public

const getAllUsers = async (req, res) => {
    const users = await User.find();

    res.status(200).json({
        message: "All Users fetched successfully",
        users
    });
}

// @desc Get Single User
// @route GET /api/user/:id
// @access Public

const getSingleUser = async (req, res) => {
    const { id } = req.params;
    if (!isValidObjectId(id)) {
        return res.status(404).json({ message: "User not found" });
    }

    const findUser = await User.findById(id);
    if (!findUser) {
        return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
        message: "User fetched successfully",
        user: findUser
    });
}

// @desc Update User
// @route PUT /api/user/:id
// @access Public

const updateUser = async (req, res) => {
    const { id } = req.params;
    const { name, email, password } = req.body;
    if (!isValidObjectId(id)) {
        return res.status(404).json({ message: "User not found" });
    }
    const findUser = await User.findById(id);
    if (!findUser) {
        return res.status(404).json({ message: "User not found" });
    }

    const updatedUser = await User.findByIdAndUpdate(id,
        { name, email, password },
        { new: true }
    );

    res.status(200).json({
        message: "User updated successfully",
        user: updatedUser
    })
}

// @desc Update User by provided fields
// @route PATCH /api/user/:id
// @access Public

const updateUserBySingleFIeld = async (req, res) => {
    const { id } = req.params;
    const { name, email, password } = req.body;

    // Check if the provided ID is valid
    if (!isValidObjectId(id)) {
        return res.status(404).json({ message: "User not found" });
    }

    // Find the user by ID
    const findUser = await User.findById(id);

    // If user not found, return 404
    if (!findUser) {
        return res.status(404).json({ message: "User not found" });
    }

    // Update only the fields that are provided in the request body
    const updatedFields = {};
    if (name) updatedFields.name = name;
    if (email) updatedFields.email = email;
    if (password) updatedFields.password = password;

    // Update user with the provided fields
    const updatedUser = await User.findByIdAndUpdate(
        id,
        updatedFields,
        { new: true }
    );

    // If user updated successfully, return updated user
    res.status(200).json({
        message: "User updated successfully",
        user: updatedUser
    });
}

// @desc Delete User
// @route DELETE /api/user/:id
// @access Public

const deleteUser = async (req, res) => {
    const { id } = req.params;
    if (!isValidObjectId(id)) {
        return res.status(404).json({ message: "User not found" });
    }
    const findUser = await User.findById(id);
    if (!findUser) {
        return res.status(404).json({ message: "User not found" });
    }

    await User.findByIdAndDelete(id);
    res.status(200).json({
        message: "User deleted successfully"
    })
}

module.exports = {
    registerUser,
    loginUser,
    getAllUsers,
    getSingleUser,
    updateUser,
    updateUserBySingleFIeld,
    deleteUser
}