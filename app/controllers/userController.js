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
  },

  async show(req, res, next) {
    try {
      const user = await User.findById(req.params.id)
        .select('name username email photo');

      if(!user)
        return res.status(404).json({ message: 'User not found.' });

      res.json({
        user,
      });
    } catch (error) {
      next(error);
    }
  },

  async update(req, res, next) {
    try {
      const user = await User.findById(req.params.id)
        .select('name username email photo');

      if(!user)
        return res.status(404).json({ message: 'User not found.' });

      res.json({
        user,
      });
    } catch (error) {
      next(error);
    }
  },
};
