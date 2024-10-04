module.exports = (role) => {
  return function (req, res, next) {
    // console.log("req user", req.user); // Memeriksa nilai req.User

    if (!role.includes(req.user.role)) {
      res.status(403).json({
        status: false,
        message: `Access denied. You are not authorized . You are not ${role}`,
      });
    } else {
      next();
    }
  };
};
