var jwt = require('jsonwebtoken');

module.exports = function(req, res, next){
	var token = req.headers['auth-token'];

	if (token){
		// change to use secret actually from express app
		jwt.verify(token, "secret", function(err, decoded){
			if (err) {
				return res.status(403).send({
					success: false,
					message: ERROR.AUTH.FAILED_AUTHENTICATE_TOKEN.message,
					code: ERROR.AUTH.FAILED_AUTHENTICATE_TOKEN.code
				});
			}
			else {
				// console.log("DECODE", decoded);
				req.decoded = decoded;
			}
			next(null);
		});
	}
	else {
		return res.status(403).send({
			success: false,
			message: ERROR.AUTH.INVALID_TOKEN.message,
			code: ERROR.AUTH.INVALID_TOKEN.code,
		});
	}
}