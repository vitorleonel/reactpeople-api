const mongoose = require('mongoose');
const User = mongoose.model('User');
const { github } = require('../services');

module.exports = {
  async auth(req, res) {
    try {
      const access_token = await github.getAccessToken(req.body.code);

      if (!access_token) throw new Error('Invalid authorized code!');

      const githubUser = await github.getUser(access_token);

      if (!githubUser) throw new Error('Invalid token!');

      let user = await User.findOne({ refId: githubUser.id });
      let newUser = false;

      if (!user) {
        user = await User.create({
          refId: githubUser.id,
          name: githubUser.name || githubUser.login,
          username: githubUser.login,
          email: githubUser.email,
          photo: githubUser.avatar_url
        });

        newUser = true;
      }

      res.json({
        access_token: User.generateToken(user),
        user: {
          _id: user._id,
          name: user.name,
          username: user.username,
          email: user.email,
          photo: user.photo,
          location: user.location
        },
        new: newUser
      });
    } catch ({ message }) {
      res.status(422).json({ message });
    }
  }
};
