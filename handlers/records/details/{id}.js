'use strict';

/**
 * @imports
 */

var oracle_service = requireService("oracle");

/**
 * Operations on /records/details/{id}
 */
module.exports = {

    post: function (req, res) {
        var id = req.params.id;
        var user = req.decoded;

        oracle_service.query(`

            SELECT *
            FROM hr.records
            WHERE id = ` + id, 

        function(err, results) {
            if (err) {
                res.status(400);
                res.json({
                    success: false,
                    message: ERROR.RECORDS.FAILED_TO_FIND_RECORD.message,
                    code: ERROR.RECORDS.FAILED_TO_FIND_RECORD.code,
                    err: err
                });
                
                return;
            }

            var record = oracle_service.parse(results)[0];

            res.status(200);
            res.json({
                success: true,
                message: "Successfully fetched record details.",
                data: record
            });

        });

    }

};
