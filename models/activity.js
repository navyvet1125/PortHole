const mongoose = require('mongoose')
mongoose.Promise = require('bluebird')
const User 	 = require('./user')
const Comment = require('./comment')

const activitySchema = new mongoose.Schema({
	//New information for the news feeds.
	//Date includes when the  activity was created,
	//the profile picture of the person who the activity tracks,
	//the title of the activity,
	//the body of the activity,
	//and on whose feeds the activity will post.
	creator: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
	created: {type: Date, default: Date.now()},
	name: String,
	picture: String,
	title: String,
	body: String,
	comments:[{type: mongoose.Schema.Types.ObjectId, ref: 'Comment', autopopulate: true}],
	receivers: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
});

activitySchema.plugin(require('mongoose-autopopulate'))

const Activity = mongoose.model('Activity', activitySchema)

module.exports = Activity