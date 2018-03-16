'use strict';

/**
 * @imports
 */

var oracle_service = requireService("oracle");

/**
 * Operations on /records/list
 */
module.exports = {

    post: function (req, res) {
        var user = req.decoded;

        oracle_service.query('SELECT * FROM hr.records', function(err, results) {
            if (err) {
                res.status(400);
                res.json({
                    success: false,
                    message: ERROR.RECORDS.FAILED_TO_LIST_RECORD.message,
                    code: ERROR.RECORDS.FAILED_TO_LIST_RECORD.code,
                    err: err
                });
                
                return;
            }

            var rows = oracle_service.parse(results);

            res.status(200);
            res.json({
                success: true,
                message: "Successfully fetched all records.",
                data: rows
            });

        });

    }

};
