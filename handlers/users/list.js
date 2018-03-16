'use strict';

/**
 * @imports
 */

var oracle_service = requireService("oracle");

/**
 * Operations on /users/list
 */
module.exports = {

    post: function (req, res) {

        var id = req.params.id;
        var user = req.decoded;

        oracle_service.query('SELECT * FROM hr.users', function(err, results) {
            if (err) {
                res.status(400);
                res.json({
                    success: false,
                    message: ERROR.USERS.FAILED_TO_LIST_USER.message,
                    code: ERROR.USERS.FAILED_TO_LIST_USER.code,
                    err: err
                });
                
                return;
            }

            res.status(200);
            res.json({
                success: true,
                message: "Successfully all users.",
                data: results
            });

        });

    }

};
