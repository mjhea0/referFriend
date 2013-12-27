var config;

config = {
  production: {
    google: {
      returnURL: 'http://referFriend.herokuapp.com/auth/google/callback',
      realm: 'http://referFriend.herokuapp.com/'
    },
    mongoUrl: 'mongodb://localhost/realize-change'
  },
  development: {
    google: {
      returnURL: 'http://localhost:1337/auth/google/callback',
      realm: 'http://localhost:1337/'
    },
    mongoUrl: 'mongodb://localhost/realize-change',
  }
};

module.exports = global.process.env.NODE_ENV === 'production' ? config.production : config.development;
