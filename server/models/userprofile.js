const mongoose = require('mongoose');

const userProfileSchema = new mongoose.Schema({
  profilePicture: {
    type: String,
  },
  fullName: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: false,
  },
  city: {
    type: String,
    required: false,
  },
  country: {
    type: String,
    required: false,
  },
  focused: {
    type: String,
    required: false,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
}, {
  timestamps: true // Menambahkan opsi timestamps
});

const UserProfile = mongoose.model('UserProfile', userProfileSchema);

module.exports = UserProfile;
