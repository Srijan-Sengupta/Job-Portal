const mongoose = require("mongoose")

applicantSchema = mongoose.Schema({
	username: { type: String, required: true },
	name: {type: String, require: false},
	address: {type: String, required: false},
	password: { type: String, required: true },
	email: { type: String, required: true },
	phone_number: { type: String, required: false },
	portfolio: { type: String, required: false },
	appliedJobs: {type: Array, require: false},
});

Applicant = mongoose.model("Applicant", applicantSchema);

module.exports = Applicant;
