const router = require("express").Router();
const {
  getAllNotifications,
  createNotification,
  markNotificationsAsRead,
  deleteNotificationById
} = require("../controllers/notification.controller");
const Auth = require("../middlewares/authentication");
const checkRole = require("../middlewares/checkRole");

router.get("/", Auth, checkRole(["User", "Admin"]), getAllNotifications);
router.post("/",createNotification);
router.put(
  "/markAsRead",
  Auth,
  checkRole(["User", "Admin"]),
  markNotificationsAsRead
);
router.delete('/:id', Auth, checkRole(["User", "Admin"]), deleteNotificationById);

module.exports = router;
