'use strict';

/**
 * @imports
 */
var jwt = require('jsonwebtoken');
var md5 = require('md5');


var oracle_service = requireService("oracle");

/**
 * Operations on /auth/login
 */
module.exports = {
    post: function (req, res) {

        var email = req.body.email;
        var password = req.body.password;

        var passwordSalted = md5(password + AUTH.SALT);

        oracle_service.query(`

            SELECT *
            FROM hr.users
            WHERE email = '` + email + `'`, 

        function(err, results) {
            if (err) {
                res.status(400);
                res.json({
                    success: false,
                    message: ERROR.AUTH.AUTHENTICATION_ERROR.message,
                    code: ERROR.AUTH.AUTHENTICATION_ERROR.code,
                    err: err
                });
                
                return;
            }

            if (results.rows.length === 0){
                res.status(400);
                res.json({
                    success: false,
                    message: ERROR.AUTH.FAILED_TO_LOOKUP_EMAIL.message,
                    code: ERROR.AUTH.FAILED_TO_LOOKUP_EMAIL.code
                });
                
                return;
            }

            var rows = oracle_service.parse(results);
            var user = rows[0];

            if (user.password !== passwordSalted) {
                res.status(400);
                res.json({
                    success: false,
                    message: ERROR.AUTH.INCORRECT_PASSWORD.message,
                    code: ERROR.AUTH.INCORRECT_PASSWORD.code
                });
                
                return;
            }

            var _user = {
                id: user.id,
                email: user.email,
                firstname: user.firstname,
                lastname: user.lastname
            };

            var token = jwt.sign(_user, "secret", {
                expiresIn: 60 * 60 * 2 // expires in 24 hours
                // expiresIn: 5
            });

            res.status(200);
            res.json({
                success: true,
                message: "Authentication successful.",
                token: token,
                user: _user
            });

        });

    }
};
