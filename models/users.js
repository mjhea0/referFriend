var mongoose = require('mongoose');
var config = require('../config');

console.log(config);

var userSchema = new mongoose.Schema({
	name: {type: String, required: true},
	email: {type: String, lowercase: true, unique: true, required: true}
});

module.exports = mongoose.model('User', userSchema);
