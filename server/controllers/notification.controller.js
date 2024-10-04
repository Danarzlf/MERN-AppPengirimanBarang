const mongoose = require("mongoose");
const User = require("../models/user");
const UserProfile = require("../models/userprofile");
const Notification = require("../models/notification");
const { formattedDate } = require("../utils/formattedDate");


// const getAllNotifications = async (req, res, next) => {
//     try {
//       const notifications = await Notification.find({ userId: req.user.id })
//         .populate({
//           path: 'userId',
//           select: '_id',
//           populate: {
//             path: 'userProfile',
//             select: 'fullName'
//           }
//         });
  
//       res.status(200).json({
//         status: true,
//         message: "Notifications retrieved successfully",
//         data: { notifications },
//       });
//     } catch (err) {
//       next(err);
//     }
//   };

const getAllNotifications = async (req, res, next) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.user.id);

    console.log('User ID:', userId); // Log the user ID

    const notifications = await Notification.aggregate([
      { $match: { userId } }, // Match notifications for the specific user
      {
        $lookup: {
          from: 'users', // Collection name of User
          localField: 'userId',
          foreignField: '_id',
          as: 'user'
        }
      },
      { $unwind: { path: '$user', preserveNullAndEmptyArrays: true } }, // Unwind user array
      {
        $lookup: {
          from: 'userprofiles', // Collection name of UserProfile
          localField: 'user.userProfile', // Field in User that references UserProfile
          foreignField: '_id',
          as: 'userProfile'
        }
      },
      { $unwind: { path: '$userProfile', preserveNullAndEmptyArrays: true } }, // Unwind userProfile array
      {
        $project: {
          _id: 1,
          title: 1,
          message: 1,
          isRead: 1,
          createdAt: 1,
          updatedAt: 1,
          'user._id': 1,
          'userProfile.fullName': 1
        }
      }
    ]);

    console.log('Aggregated Notifications:', notifications); // Log the aggregated notifications

    res.status(200).json({
      status: true,
      message: "Notifications retrieved successfully",
      data: { notifications },
    });
  } catch (err) {
    console.error('Error retrieving notifications:', err); // Log any errors
    next(err);
  }
};

  
  const createNotification = async (req, res, next) => {
    try {
      const { title, message } = req.body;
  
      if (!title || !message) {
        return res.status(400).json({
          status: false,
          message: "Title and message are required fields",
        });
      }
  
      const allUsers = await User.find();
  
      const newNotifications = await Promise.all(
        allUsers.map(async (user) => {
          const createdNotification = await Notification.create({
            title,
            message,
            userId: user._id,
          });
  
          // Include associated user profile data
          return await Notification.findById(createdNotification._id)
            .populate({
              path: 'userId',
              populate: {
                path: 'userProfile',
                select: 'fullName'
              }
            });
        })
      );
  
      res.status(201).json({
        status: true,
        message: "Notifications created for all users",
        data: { newNotifications },
      });
    } catch (err) {
      next(err);
    }
  };
  
  const markNotificationsAsRead = async (req, res, next) => {
    try {
      const result = await Notification.updateMany(
        { userId: req.user.id },
        { $set: { isRead: true } }
      );
  
      res.status(200).json({
        status: true,
        message: "Notifications marked as read for the user",
        data: { modifiedCount: result.nModified },
      });
    } catch (err) {
      next(err);
    }
  };


  const deleteNotificationById = async (req, res, next) => {
    try {
      const notificationId = req.params.id;
      const userId = req.user.id;
  
      // Find and delete the notification
      const result = await Notification.findOneAndDelete({ _id: notificationId, userId });
  
      if (!result) {
        return res.status(404).json({
          status: false,
          message: "Notification not found",
        });
      }
  
      res.status(200).json({
        status: true,
        message: "Notification deleted successfully",
        data: { notificationId },
      });
    } catch (err) {
      next(err);
    }
  };
  
  module.exports = {
    getAllNotifications,
    createNotification,
    markNotificationsAsRead,
    deleteNotificationById,
  };