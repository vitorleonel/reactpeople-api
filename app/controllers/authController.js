const mongoose = require('mongoose');
const User = mongoose.model('User');
const { github } = require('../services');

module.exports = {
  async auth(req, res, next) {
    try {
      const access_token = await github.getAccessToken(req.body.code);

      if(!access_token)
        return res.status(422).json({ message: 'Invalid authorized code!' });

      const githubUser = await github.getUser(access_token);

      if(!githubUser)
        return res.status(422).json({ message: 'Invalid token!' });

      let user = await User.findOne({ refId: githubUser.id });

      if(!user)
        user = await User.create({
          refId: githubUser.id,
          name: githubUser.name,
          username: githubUser.login,
          email: githubUser.email,
          photo: githubUser.avatar_url,
        });

      res.json({
        access_token: User.generateToken(user),
        user: {
          _id: user._id,
          name: user.name,
          username: user.username,
          email: user.email,
          photo: user.photo,
          location: user.location,
        },
      });
    } catch (error) {
      next(error);
    }
  }
}
