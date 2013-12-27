var mongoose = require('mongoose');
var config = require('../config');

console.log(config);

var referSchema = new mongoose.Schema({
	name: String,
	email: String,
	createdDate: Date,
	refererEmail: String,
});

module.exports = mongoose.model('Refer', referSchema);
