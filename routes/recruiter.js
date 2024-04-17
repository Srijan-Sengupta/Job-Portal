const express = require('express');
const verifyJWT = require('../services/auth');
const Recruiter = require('../models/recruiter');
const Job = require('../models/jobs')

router = express.Router();

router.get("/profile", verifyJWT, (req, res) => {
	username = req.user.username;
	const recruiter = Recruiter.findOne({username: username})
	res.json(recruiter);
})

router.post("/postjob", verifyJWT, (req, res) => {
	if(Recruiter.findOne({username: req.user.username})){
		const dbJob = new Job(req.job);
		dbJob.save()
		res.json({message: "Success!!!"})
	}else
		res.json({message: "Error!! you are not authorized to do so."})
})

router.get("/posted-jobs", verifyJWT, (req, res) => {
	if(Recruiter.findOne({username: req.user.username})){
		res.json(Job.find({jobPostedBy: req.user.username}))
	}else
		res.json({message: "Error!! Unauthorized!"})
})

router.delete("/postjob", verifyJWT, (req, res) => {
	const recruiterPosting = req.user.username;
	const job = Job.findOne({jobId: req.job.jobId});
	if(job.jobPostedBy === recruiterPosting){
		job.deleteOne({jobId: job.jobId});
		res.json({message: "Success!!"})
	}
})
module.exports = router;
