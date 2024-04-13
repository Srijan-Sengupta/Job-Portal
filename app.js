const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const Applicant = require("./models/applicant");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

urlEncodedParser = bodyParser.urlencoded({ extended: false });
require("dotenv").config();

//Init the DB
mongoose
	.connect(process.env.DATABASE)
	.then(() => console.log(`MongoDB Up!`))
	.catch((err) => {
		console.log(err);
	});

const app = express();
const port = process.env.PORT;

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});

app.get("/", (req, res) => {
	res.send("Hello the server is running !!");
});

app.use(
	cors({
		origin: [`http://localhost:${port}`],
		methods: ["GET", "POST", "PUT", "DELETE"],
		credentials: true,
	})
);

app.use(express.json());

app.post("/register-applicant", async (req, res) => {
	const applicant = req.body;

	const takenUsername = Applicant.findOne({ username: applicant.username });
	const takenEmail = Applicant.findOne({ email: applicant.email });

	if (takenUsername) {
		res.json({ message: "This username has already been taken" });
	} else if (takenEmail) {
		res.json({ message: "This email is already in use." });
	} else {
		applicant.password = await bcrypt.hash(req.body.password, 10);

		const dbApplicant = new Applicant({
			username: applicant.username,
			password: applicant.password,
			email: applicant.email,
		});
		dbApplicant.save();
		res.json({ message: "Success" });
	}
});

app.post("/applicant-login", async (req, res) => {
	const applicantLoggingIn = req.body;

	Applicant.findOne({ username: applicantLoggingIn.username }).then((dbUser) => {
		if(!dbUser){
			return res.json({message: "Invalid Username or Password"})
		}
		bcrypt.compare(applicantLoggingIn.password, dbUser.password).then(isCorrect => {
			if(isCorrect){
				const payload = {
					id: dbUser._id,
					username: dbUser.username,
				}
				jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: 86400}, (err, token) => {
					if (err) return res.json({message: err})
					return res.json({message: "Success", token: "Bearer " + token})
				})
			}else{
				return res.json({message: "Invalid username or password"})
			}
		})
	});
});

function verifyJWT(req, res, next){
	const token = req.headers["x-access-token"]?.split(' ')[1]

	if(token){
		jwt.verify(token, process.env.PASSPORTSECRET, (err, decoded) => {
			if(err){
				return res.json({isLggingIn: false, message: "Failed to authenticate"})
			}
			req.user = {}
			req.user.id = decoded.id
			req.user.username = decoded.username
			next()
		})
	}else{
		res.json({message: "Incorrect Tocken given", isLggingIn: false})
	}
}
