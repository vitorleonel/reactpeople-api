const mongoose = require('mongoose');
const User = mongoose.model('User');

module.exports = {
  async index(req, res, next) {
    try {
      const users = await User.find({}, 'name username email photo');

      res.json({
        users,
      });
    } catch (error) {
      next(error);
    }
  }
};
