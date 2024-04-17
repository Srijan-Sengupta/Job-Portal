const express = require("express")
const verifyJWT = require("../services/auth");
const Applicant = require("../models/applicant");
const Job = require("../models/jobs") 

router = express.Router();

router.get("/profile", verifyJWT, (req, res) => {
	username = req.user.username;
	const applicant = Applicant.findOne({username: username});
	if(applicant){
		res.json(applicant)
	}else{
		res.json({message: "applicant not found!"})
	}
});

router.get("/applied-jobs", verifyJWT, (req, res) => {
	username = req.user.username;
	const applicant = Applicant.findOne({username: username});
	if(applicant){
		res.json(applicant.appliedJobs)
	}else{
		res.json({message: "applicant not found!"})
	}
})

router.post("/apply", verifyJWT, (req, res) => {
	username = req.user.username;
	applicant = applicant.findone({username: username});
	job = Job.findone({jobid: req.body.jobid});
	if(applicant && job){
		applicant.appliedJobs.push(req.body.jobid);
		applicant.updateone(applicant.username,applicant);
		job.candidates.push(applicant.username);
		job.updateone(job.jobid, job)
		res.json({message: "success"})
	}else{
		res.json({message: "error"});
	}
})

router.delete("/apply", verifyJWT, (req, res) => {
	username = req.user.username;
	applicant = Applicant.findone({username: username});
	job = Job.findone({jobid: req.body.jobid});
	if(applicant && job){
		const index = applicant.appliedJobs.indexOf(job.jobid);
		if(index > -1){
			arr.splice(index, 1)
		}
		res.json({message: "success"})
	}else{
		res.json({message: "error"});
	}
})

module.exports = router;
