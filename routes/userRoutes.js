const express = require("express");
const { registerUser, loginUser, getAllUsers, getSingleUser, updateUser, updateUserBySingleFIeld, deleteUser } = require("../controllers/userController");


const userRoutes = express.Router();

userRoutes.post("/register", registerUser);
userRoutes.post("/login", loginUser);
userRoutes.get("/getAll", getAllUsers);
userRoutes.get("/:id", getSingleUser);
userRoutes.put("/:id", updateUser);
userRoutes.patch("/:id", updateUserBySingleFIeld);
userRoutes.delete("/:id", deleteUser);


module.exports = {
    userRoutes
}