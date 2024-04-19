const express = require('express');
const verifyJWT = require('../services/auth');
const Recruiter = require('../models/recruiter');
const Job = require('../models/jobs')

router = express.Router();

router.get("/profile", verifyJWT, async (req, res) => {
	username = req.user.username;
	const recruiter =  await Recruiter.findOne({username: username}).exec();
	res.json(recruiter);
})

router.post("/postjob", verifyJWT, async (req, res) => {
	if(await Recruiter.findOne({username: req.user.username}).exec()){
		const dbJob = new Job(req.body.job);
		try{
		await dbJob.save();
		}catch(err){
			return res.json({message: err});
		}
		res.json({message: "Success!!!"})
	}else
		res.json({message: "Error!! you are not authorized to do so."})
})

router.get("/posted-jobs", verifyJWT, async (req, res) => {
	if(await Recruiter.findOne({username: req.user.username}).exec()){
		res.json(await Job.find({jobPostedBy: req.user.username}).exec())
	}else
		res.json({message: "Error!! Unauthorized!"})
})

router.delete("/postjob", verifyJWT, async (req, res) => {
	const recruiterPosting = req.user.username;
	const job = await Job.findOne({jobId: req.body.job.jobId}).exec();
	if(job.jobPostedBy === recruiterPosting){
		await job.deleteOne({jobId: job.jobId}).exec();
		res.json({message: "Success!!"})
	}
})
module.exports = router;
