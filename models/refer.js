var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    passportLocalMongoose = require('passport-local-mongoose');

var Refer = new Schema({
    name: String,
    email: String
});

Refer.plugin(passportLocalMongoose);

module.exports = mongoose.model('Refer', Refer);


