var URL = "http://referfriend.herokuapp.com/"

module.exports = {
  google: {
    returnURL: process.env.URL + "auth/google/callback" || 'http://127.0.0.1:1337/auth/google/callback',
    realm: process.env.URL || 'http://127.0.0.1:1337'
  },
  mongoUrl: process.env.MONGOLAB_URI || 'mongodb://localhost/referFriend'
};
