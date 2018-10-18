const axios = require('axios');

module.exports = {

  async getAccessToken(code) {
    try {
      const body = {
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code,
      };

      const { data } = await axios.post('https://github.com/login/oauth/access_token', body, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        }
      });

      if(!data.access_token)
        return null;

      return data.access_token;
    } catch (error) {}

    return null;
  },

  async getUser(access_token) {
    try {
      const { data } = await axios.get('https://api.github.com/user', {
        headers: {
          'Authorization': `Bearer ${access_token}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        }
      });

      if(!data.id)
        return null;

      return data;
    } catch (error) {}

    return null;
  }
}
