var mongoose 	= require('mongoose');
// var Promise = require("bluebird")
// var bcrypt = Promise.promisifyAll(require('bcrypt-nodejs'));

var userSchema = new mongoose.Schema({
	//Artist is someone who uses the website for their portfolio.
	//Visitors are people who have accounts but do not keep their portfolios on the site
	//Admin users can add or remove anyone, change anyone's type, and can add,
	//approve, or remove causes.  
	type: {type: 'String', enum: [
	    'artist',
	    'visitor', 
	    'admin' 
	], default:'visitor'},
	career: {type:String, default:'none'},
	login: {type: String, required: true},
	name: {type: String, required:true},
	occupation: String,
	avatar: String,
	email: {type: String, unique:true, required: true},
	city: String,
	created: {type: Date, default: Date.now()},							//When the user was created
	modified: Date,														//When the user last updated their profile
	lastLogin: Date,
	fb_access_token: String,
	password: String,
	// Information about the artist
	bio: String,
	// A list of followers the artist has.  An array of User Id's
	followers: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
	approved: {type: Boolean, default: false},  					  //If the profile is approved
	active: {type: Boolean, default: true}  					  //If the profile is active
});
userSchema.plugin(require('mongoose-bcrypt'));
//search users by type
userSchema.statics.findByType = function(type, cb){
	return this.find({type: type}, cb);
};
//Search users by career
userSchema.statics.findByCareer = function(career, cb){
	return this.find({career: career}, cb);
};
//Search users by Email
userSchema.statics.findByEmail = function(email, cb){
	return this.findOne({email: email}, cb);
};

//Search to see if the user is of a certain type.
userSchema.statics.searchNameAndType = function(name, type, cb){
	this.find({type: type}, function(err, users){
		if(err) return err;
		var person;
		users.forEach(function(user){
			if(user.name.toLowerCase() === name.toLowerCase())person = user;
		});
		return cb(err, person);
	});
};
var User = mongoose.model('User', userSchema);

module.exports = User;