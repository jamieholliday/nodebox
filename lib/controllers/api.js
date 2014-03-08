'use strict';

var Spotify = require('spotify-web');
var xml2js = require('xml2js');
var pw = require('../config/pw');

exports.searchAll = function(req, res) {
	var searchTerm = req.body.searchTerm;
	if(searchTerm !== '') {

		var query = {
			query: searchTerm,
			type: ['tracks', 'artists', 'albums'],
			maxResults: 10
		};

		Spotify.login(pw.spotify.username, pw.spotify.pwd, function(err, spotify) {
			if (err) return res.send(err);

			spotify.search(query, function(err, xml) {
				if(err) {
					spotify.disconnect();
					return res.send(err);
				}

				var parser = new xml2js.Parser();
				parser.on('end', function(data) {
					console.log(JSON.stringify(data, null, 2));
					return res.json(data);
				});
				parser.parseString(xml);
			});
		});
	}
};