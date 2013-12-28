var development = {
  google: {
    returnURL: 'http://127.0.0.1:1337/auth/google/callback',
    realm: 'http://127.0.0.1:1337'
  },
  mongoUrl: process.env.MONGOLAB_URI || 'mongodb://localhost/referFriend',
  env : global.process.env.NODE_ENV || 'development'
};

var production = {
  google: {
    returnURL: 'http://referfriend.herokuapp.com/auth/google/callback',
    realm: 'http://referfriend.herokuapp.com/'
  },
  mongoUrl: process.env.MONGOLAB_URI || 'mongodb://localhost/referFriend',
  env : global.process.env.NODE_ENV || 'production'
};

module.exports = global.process.env.NODE_ENV === 'production' ? production : development;
