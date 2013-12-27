module.exports = {
  google: {
    returnURL: 'http://127.0.0.1:1337/auth/google/callback',
    realm: 'http://127.0.0.1:1337'
  },
  mongoUrl: process.env.MONGOLAB_URI || 'mongodb://localhost/referFriend'
};
