'use strict';

/**
 * @imports
 */


var oracle_service = requireService("oracle");

/**
 * Operations on /records/update/{id}
 */
module.exports = {

    post: function (req, res) {
        var id = req.params.id;
        var user = req.decoded;
        var request = req.body;

        console.log(req);

        oracle_service.query(`

            UPDATE hr.records
            SET sample_data = '` + request.sampleData + `'
            WHERE id = '` + id + `'`, 

        function(err, results) {
            if (err) {
                res.status(400);
                res.json({
                    success: false,
                    message: ERROR.RECORDS.FAILED_TO_UPDATE_RECORD.message,
                    code: ERROR.RECORDS.FAILED_TO_UPDATE_RECORD.code,
                    err: err
                });
                
                return;
            }

            res.status(200);
            res.json({
                success: true,
                message: "Successfully updated record data."
            });

        });
    }
    
};
