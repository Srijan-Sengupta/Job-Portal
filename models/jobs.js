const {default: mongoose} = require("mongoose");

jobSchema = mongoose.Schema({
	jobId: {type: String, required: true, unique: true},
	jobTitle: {type: String, required: true},
	jobPostedBy: {type: String, required: true},
	jobPostDate: {type: String, required: true},
	companyName: {type: String, required: true},
	jobTime: {type: String, required: true},
	jobDesc: {type: String, required: true},
	candidates: {type: Array, required: false}
})

Job = mongoose.model("Job", jobSchema)

module.exports = Job
