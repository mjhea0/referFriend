var mongoose = require('mongoose');
var config = require('../config');

console.log(config);

var referSchema = new mongoose.Schema({
	name: {type: String, required: true},
	email: {type: String, unique: true, required: true},
	createdDate: {type: Date, required: true},
	refererEmail: {type: String, required: true}
});

module.exports = mongoose.model('Refer', referSchema);
