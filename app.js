const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

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

app.use(
	cors({
		origin: [`http://localhost:${port}`],
		methods: ["GET", "POST", "PUT", "DELETE"],
		credentials: true,
	})
);
app.use(express.json());

app.use("/auth", require("./routes/authenticate"))
app.use("/applicant", require("./routes/applicant"))
app.use("/recruiter", require("./routes/recruiter"))

app.get("/", (_req, res) => {
	res.json({message: "Start Test all up!!"})
})

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});
