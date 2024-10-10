const express = require("express");
const checkRole = require("../middlewares/checkRole");
const Auth = require("../middlewares/authentication");
const {
  register,
  registerNoVerify,
  verifyOtp,
  login,
  authenticateUser,
  getAllUsers,
  getUserById,
  deleteUserById,
  changePasswordUser,
  forgetPasswordUser,
  updatePasswordUser
} = require("../controllers/user.controller");

// Import Google OAuth functions
const { googleLogin, googleCallback } = require("../libs/googleAuth");

const router = express.Router();

router.get('/google', googleLogin); // Route for Google login
router.get('/google/callback', googleCallback); // Route for Google callback login

router.post("/register", register);
router.post("/registerNoVerify", register);
router.put("/verify-otp", verifyOtp);
router.post("/login", login);
router.get(
  "/authenticate",
  Auth,
  checkRole(["User", "Admin"]),
  authenticateUser
);
router.get("/all-users", getAllUsers);
router.get("/:id", getUserById);
router.put("/change-password", Auth, checkRole(["User", "Admin"]), changePasswordUser);
router.post("/forget-password", forgetPasswordUser);
router.put("/update-password", updatePasswordUser);
router.delete("/:id", deleteUserById);

module.exports = router;
