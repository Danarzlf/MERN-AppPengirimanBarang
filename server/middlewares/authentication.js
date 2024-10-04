const jwt = require("jsonwebtoken");
const User = require("../models/user"); // Sesuaikan path ke model User Mongoose Anda
const { JWT_SECRET_KEY } = process.env;

module.exports = async function (req, res, next) {
  try {
    let { authorization } = req.headers;
    if (!authorization) {
      return res.status(401).json({
        status: false,
        message: "Tidak diizinkan",
        err: "Token tidak ditemukan di header!",
        data: null,
      });
    }

    const token = authorization.split("Bearer ")[1];
    if (!token) {
      return res.status(401).json({
        status: false,
        message: "Tidak diizinkan",
        err: "Format token salah!",
        data: null,
      });
    }

    const payload = jwt.verify(token, JWT_SECRET_KEY);

    const user = await User.findById(payload.id);
    if (!user) {
      return res.status(401).json({
        status: false,
        message: "Tidak terautentikasi",
        err: "Email tidak terdaftar",
        data: null,
      });
    }

    req.user = user;

    // if (!req.user.isVerified) {
    //   return res.status(401).json({
    //     status: false,
    //     message: "Tidak diizinkan",
    //     err: "Anda perlu memverifikasi email Anda untuk melanjutkan",
    //     data: null,
    //   });
    // }

    next();
  } catch (err) {
    console.error("Error saat verifikasi token:", err);
    return res.status(401).json({
      status: false,
      message: "Tidak diizinkan",
      err: "Token tidak valid",
      data: null,
    });
  }
};
