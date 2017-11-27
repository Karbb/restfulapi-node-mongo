var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    username: { type: String, required: true},
    score: { type: Number, required: true},
	created_date: { type: Date, default: Date.now}
});

var User = mongoose.model('User', UserSchema);

module.exports.User = User;