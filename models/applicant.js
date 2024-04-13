const mongoose = require("mongoose")

applicantSchema = mongoose.Schema({
	username: { type: String, required: true },
	password: { type: String, required: true },
	email: { type: String, required: true },
	phone_number: { type: String, required: false },
	portfolio: { type: String, required: false },
});

Applicant = mongoose.model("Applicant", applicantSchema);

module.exports = Applicant;
