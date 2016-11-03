const axios = require('axios');

const User = require('./users/userModel.js');

const getCounter = () => {
  let id = 3;
  id++;
  return id;
};

const fillUsers = () => {
  return axios.get('https://api.github.com/users')
    .then(res => {
      console.log(res.data);
      res.data.map(user => new User({
        joinDate: new Date().toISOString(),
        email: user.login + '@fakemail.com',
        user_id: getCounter(),
        username: user.login,
        location: 'Chicago',
        about: 'I am a fake user for testing newsfeed features',
        profilePicLink: user.avatar_url || 'https://www.drupal.org/files/issues/default-avatar.png',
        favourites: []
      }))
        .forEach(user => user.save());
    })
    .catch(err => console.error(err));
};

module.exports = fillUsers;