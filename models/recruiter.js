const mongoose = require("mongoose");

recruiterSchema = mongoose.Schema({
	firstname: {type: String, required: false},
	lastname: {type: String, required: false},
	username: {type: String, required: true},
	password: {type:String, required: true},
	email: {type: String, required: true},
	companyName: {type: String, require: true}
})

Recruiter = mongoose.model("Recruiter", recruiterSchema)

module.exports = Recruiter
