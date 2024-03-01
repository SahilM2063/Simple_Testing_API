const express = require("express");
const { registerUser, loginUser, getAllUsers, getSingleUser, updateUser, updateUserBySingleFIeld, deleteUser } = require("../controllers/userController");
const multer = require("multer")

const upload = multer()

const userRoutes = express.Router();

userRoutes.post("/register", upload.none(), registerUser);
userRoutes.post("/login", upload.none(), loginUser);
userRoutes.get("/getAll", getAllUsers);
userRoutes.get("/:id", getSingleUser);
userRoutes.put("/:id", upload.none(), updateUser);
userRoutes.patch("/:id", upload.none(), updateUserBySingleFIeld);
userRoutes.delete("/:id", deleteUser);


module.exports = {
    userRoutes
}