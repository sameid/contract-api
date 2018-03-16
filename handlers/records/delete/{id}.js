'use strict';

/**
 * @imports
 */

var oracle_service = requireService("oracle");

/**
 * Operations on /records/delete/{id}
 */
module.exports = {

    post: function (req, res) {
        var id = req.params.id;
        var user = req.decoded;

        oracle_service.query(`

            UPDATE hr.records
            SET deleted = 1
            WHERE id = ` + id, 

        function(err, results) {
            if (err) {
                res.status(400);
                res.json({
                    success: false,
                    message: ERROR.RECORDS.FAILED_TO_MARK_RECORD_DELETED.message,
                    code: ERROR.RECORDS.FAILED_TO_MARK_RECORD_DELETED.code,
                    err: err
                });
                
                return;
            }

            res.status(200);
            res.json({
                success: true,
                message: "Successfully deleted records."
            });

        });

    }
    
};
