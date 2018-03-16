'use strict';

/**
 * @imports
 */


var oracle_service = requireService("oracle");

/**
 * Operations on /users/update/{id}
 */
module.exports = {

    post: function (req, res) {
        var id = req.params.id;
        var user = req.decoded;
        var request = req.body;

        oracle_service.query(`

            UPDATE hr.users
            SET firstname = ` + request.firstName + `
            WHERE id = ` + id, 

        function(err, results) {
            if (err) {
                res.status(400);
                res.json({
                    success: false,
                    message: ERROR.USERS.FAILED_TO_UPDATE_USER.message,
                    code: ERROR.USERS.FAILED_TO_UPDATE_USER.code,
                    err: err
                });
                
                return;
            }

            res.status(200);
            res.json({
                success: true,
                message: "Successfully user details."
            });

        });
    }
    
};
