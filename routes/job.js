const Job = require('../models/jobs')
const express = require('express')

const router = express.Router();

router.get('/', async (req, res) => {
	res.json(await Job.find({}).exec())
})

module.exports = router
