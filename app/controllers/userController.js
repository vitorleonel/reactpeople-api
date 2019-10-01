const mongoose = require('mongoose');
const User = mongoose.model('User');

module.exports = {
  async index(req, res) {
    let users = [];

    try {
      users = await User.find(
        {
          'location.coordinates': { $ne: null }
        },
        'name username photo location'
      );

      res.json({
        users
      });
    } catch (error) {
    } finally {
      res.json({
        users
      });
    }
  },

  async show(req, res) {
    try {
      const user = await User.findById(req.params.id).select(
        'name username photo location'
      );

      if (!user) throw new Error('User not found.');

      res.json({
        user
      });
    } catch ({ message }) {
      res.status(404).json({ message });
    }
  },

  async updateLocation(req, res) {
    try {
      if (!req.body.lng || !req.body.lat)
        throw new Error('No longitude and latitude provided.');

      const user = await User.findById(req.params.id);

      if (!user || user.refId !== req.refId) throw new Error('User not found.');

      user.set({
        location: {
          type: 'Point',
          coordinates: [req.body.lng, req.body.lat]
        }
      });

      await user.save();

      res.status(204).json({});
    } catch ({ message }) {
      res.status(400).json({ message });
    }
  }
};
