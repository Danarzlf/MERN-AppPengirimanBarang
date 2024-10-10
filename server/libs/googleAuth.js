// libs/googleAuth.js
const { google } = require("googleapis");
const User = require("../models/user");
const UserProfile = require("../models/userprofile");
const Notification = require('../models/notification');
const jwt = require("jsonwebtoken");
const { JWT_SECRET_KEY } = process.env;

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  'http://localhost:8000/api/v1/users/google/callback'
);

const scopes = [
  'https://www.googleapis.com/auth/userinfo.email',
  'https://www.googleapis.com/auth/userinfo.profile',
];

const authorizationUrl = oauth2Client.generateAuthUrl({
  access_type: 'offline',
  scope: scopes,
  include_granted_scopes: true,
});

const googleLogin = (req, res) => {
  res.redirect(authorizationUrl);
};

const googleCallback = async (req, res, next) => {
  try {
    const { code } = req.query;
    const { tokens } = await oauth2Client.getToken(code);

    oauth2Client.setCredentials(tokens);

    const oauth2 = google.oauth2({
      auth: oauth2Client,
      version: 'v2',
    });

    const { data } = await oauth2.userinfo.get();

    console.log(data);

    if (!data.email || !data.name) {
      return res.status(400).json({
        message: "Gagal mendapatkan email atau nama dari akun Google.",
        data,
      });
    }

    let user = await User.findOne({ email: data.email });

    if (!user) {
      user = await User.create({
        email: data.email,
        password: null,
        googleId: data.id,
      });
      
      await UserProfile.create({
        fullName: data.name,
        userId: user._id,
      });

      await Notification.create({
        title: 'Selamat datang!',
        message: `Hai ${data.name}, selamat datang di aplikasi kami!`,
        userId: user._id,
      });
    }

    const userData = {
      email: user.email,
      role: user.role,
    };

    const payload = {
      id: user._id,
      email: user.email,
      role: user.role,
    };

    const secret = process.env.JWT_SECRET_KEY;
    const expiresIn = 60 * 60 * 1;

    const token = jwt.sign(payload, secret, { expiresIn });

    res.cookie("User", JSON.stringify({
      data: {
        user: userData,
        token,
      }
    }), {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      secure: process.env.NODE_ENV === 'production',
    });

    return res.redirect(`http://localhost:5173?token=${token}`);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  googleLogin,
  googleCallback,
};
