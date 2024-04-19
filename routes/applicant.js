const express = require("express")
const verifyJWT = require("../services/auth");
const Applicant = require("../models/applicant");
const Job = require("../models/jobs") 

router = express.Router();

router.get("/profile", verifyJWT, async (req, res) => {
	username = req.user.username;
	const applicant = await Applicant.findOne({username: username}).exec();
	if(applicant){
		res.json(applicant)
	}else{
		res.json({message: "applicant not found!"})
	}
});

router.get("/applied-jobs", verifyJWT, async (req, res) => {
	username = req.user.username;
	const applicant = await Applicant.findOne({username: username}).exec();
	if(applicant){
		res.json(applicant.appliedJobs);
		console.log(applicant)
	}else{
		res.json({message: "applicant not found!"})
	}
})

router.post("/apply", verifyJWT, async (req, res) => {
	username = req.user.username;
	applicant = await Applicant.findOne({username: username}).exec();
	job = await Job.findOne({jobId: req.body.jobId}).exec();
	if(applicant && job){
		applicant.appliedJobs.push(req.body.jobId);
		await Applicant.updateOne({ username : applicant.username} ,applicant).exec();
		job.candidates.push(applicant.username);
		await Job.updateOne({ jobId: job.jobId}, job).exec();
		res.json({message: "success"})
		console.log(applicant);
		console.log(job)
	}else{
		res.json({message: "error"});
	}
})

router.delete("/apply", verifyJWT, async (req, res) => {
	username = req.user.username;
	applicant = await Applicant.findOne({username: username}).exec();
	job = await Job.findOne({jobId: req.body.jobId}).exec();
	console.log(applicant)
	console.log(job)
	if(applicant && job){
		const applicantIndex = applicant.appliedJobs.indexOf(job.jobId);
		if(applicantIndex > -1){
			applicant.appliedJobs.splice(applicantIndex, 1);
			await Applicant.updateOne({username: applicant.username}, applicant).exec();
		}
		const jobIndex = job.candidates.indexOf(applicant.username);
		if(jobIndex > -1){
			job.candidates.splice(jobIndex, 1);
			await Job.updateOne({jobId: job.jobId}, job).exec();
		}
		res.json({message: "success"})
	}else{
		res.json({message: "error"});
	}
})

module.exports = router;
