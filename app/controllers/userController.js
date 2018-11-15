const mongoose = require('mongoose');
const User = mongoose.model('User');

module.exports = {
  async index(req, res, next) {
    try {
      const users = await User.find({
        'location.coordinates': { $ne: null },
      }, 'name photo location');

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
        .select('name photo location');

      if(!user)
        return res.status(404).json({ message: 'User not found.' });

      res.json({
        user,
      });
    } catch (error) {
      next(error);
    }
  },

  async updateLocation(req, res, next) {
    try {
      const user = await User.findById(req.params.id);

      if(!user)
        return res.status(404).json({ message: 'User not found.' });

      user.set({
        location: {
          type: 'Point',
          coordinates: [req.body.lng, req.body.lat],
        },
      });

      await user.save();

      res.status(204).json({});
    } catch (error) {
      next(error);
    }
  },
};