module.exports = {
  google: {
    returnURL: 'hhttp://referfriend.herokuapp.com/auth/google/callback',
    realm: 'http://referfriend.herokuapp.com/'
  },
  mongoUrl: process.env.MONGOLAB_URI || 'mongodb://localhost/referFriend'
};
