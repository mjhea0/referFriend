var herokuReturn = "http://referfriend.herokuapp.com/auth/google/callback"
var herokuRealm = "http://referfriend.herokuapp.com/"


module.exports = {
  google: {
    returnURL: process.env.herokuReturn || 'http://127.0.0.1:1337/auth/google/callback',
    realm: process.env.herokuRealm || 'http://127.0.0.1:1337'
  },
  mongoUrl: process.env.MONGOLAB_URI || 'mongodb://localhost/referFriend'
};
