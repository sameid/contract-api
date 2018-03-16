'use strict';

/**
 * @imports
 */

var oracle_service = requireService("oracle");

/**
 * Operations on /records/create
 */
module.exports = {
	
    post: function (req, res) {
        var user = req.decoded;
        var request = req.body;

        oracle_service.query(`

            INSERT INTO hr.records (SAMPLE_DATA) VALUES
            ('` + request.sampleData + `')`, 

        function(err, results) {
            if (err) {
                res.status(400);
                res.json({
                    success: false,
                    message: ERROR.RECORDS.FAILED_TO_CREATE_RECORD.message,
                    code: ERROR.RECORDS.FAILED_TO_CREATE_RECORD.code,
                    err: err
                });
                
                return;
            }

            res.status(200);
            res.json({
                success: true,
                message: "Successfully created record.",
                data: results
            });

        });
    }
};
