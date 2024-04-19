const jwt = require('jsonwebtoken')

function verifyJWT(req, res, next) {
	const token = req.headers["x-access-token"]?.split(" ")[1];

	if (token) {
		jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
			if (err) {
				console.log(err)
				return res.json({
					isLggingIn: false,
					message: "Failed to authenticate",
				});
			}

			req.user = {};
			req.user.id = decoded.id;
			req.user.username = decoded.username;
			next();
		});
	} else {
		res.json({ message: "Incorrect Token given", isLggingIn: false });
	}
}

module.exports = verifyJWT;
