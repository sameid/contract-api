'use strict';

/**
 * @imports
 */

var oracle_service = requireService("oracle");

/**
 * Operations on /users/create
 */
module.exports = {
	
    post: function (req, res) {
        var user = req.decoded;
        var request = req.body;

        oracle_service.query(`

            INSERT INTO hr.users
            (` + 
            request.firstName + `,` +
            request.lastName + `,` +
            request.email + `) VALUES (firstname, lastname, email)`,

        function(err, results) {
            if (err) {
                res.status(400);
                res.json({
                    success: false,
                    message: ERROR.USERS.FAILED_TO_CREATE_USER.message,
                    code: ERROR.USERS.FAILED_TO_CREATE_USER.code,
                    err: err
                });
                
                return;
            }

            res.status(200);
            res.json({
                success: true,
                message: "Successfully created user."
            });

        });
    }
};
