var async = require("async");
var oracledb = require('oracledb');
oracledb.autoCommit = true;


var _client = null;

module.exports = {

	/**
	 * Parse all the results in regular JSON format
	 * 
	 * @param {Object} results
	 * @return {Object}]
	 */
	parse: function(results) {
	    var final = [];

	    var metadata = results.metaData;
	    var rows = results.rows;

	    rows.forEach(function(row) {
	        var newRow = {};

	        metadata.forEach(function(column, index) {
	            newRow[column.name.toLowerCase()] = row[index];
	        });

	        final.push(newRow);
	    });

	    return final;
	},

	/**
	 * Executes a query against the oracledb
	 * 
	 * @param {String} query
	 */
	query: function(query, cb) {
		var self = module.exports;

		async.waterfall([

			/**
			 * Check if a current connection exists
			 * 
			 * @param {Function} next
			 */
			function(next) {
				self.connect(next);
			},

			/**
			 * Execute a query against the oracledb using a valid connection
			 * 
			 * @param {Object} client
			 * @param {Function} next
			 */
			function(client, next) {
				client.execute(query, next);
			}

		], cb);
	},


	/**
	 * Obtain a oracledb connection
	 *
	 * @param {Function} cb
	 */
	connect: function(cb) {
		if (!_client) {

			_isConnected = true;

			oracledb.getConnection({
				user: "SYSTEM",
				password: "contract2018",
				connectString: "34.201.51.155/xe"
			}, function (err, connection) {
				if (err) {
					cb(err);
					return;
				}

				_client = connection;
				cb(null, _client);
			})

			return;
		}

		cb(null, _client);
		return;
	}

}