module.exports.path = "survey";
module.exports.method = "get";

module.exports.called = function (req, res) {
	let formatter = require(`${__basedir}/utils/response-formatter`);

	const version = req.param("version");
	if (!version) {
		console.log("No version ID supplied.");

		res.json(require(formatter.error("Invalid version requested")));
		return
	}

	require(`${__basedir}/database/models/survey`).findOne({
		version: version
	}, { _id: 0 }, function (error, object) {
		if (error) {
			console.log(error);

			res.json(formatter.error(error));
			return;
		}
        
        const url = object.url;
		res.json(formatter.success({ "url": url }, "survey", null));
	})
};
