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

      const user = await User.findOneAndUpdate({
        refId: githubUser.id,
        username: githubUser.login,
      }, {
        refId: githubUser.id,
        name: githubUser.name,
        username: githubUser.login,
        email: githubUser.email,
        photo: githubUser.avatar_url,
      }, { new: true, upsert: true });

      res.json({
        access_token: User.generateToken(user),
      });
    } catch (error) {
      next(error);
    }
  }
}
