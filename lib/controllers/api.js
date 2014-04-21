'use strict';

var Spotify = require('spotify-web');
var xml2js = require('xml2js');
var pw = require('../config/pw');
var lame = require('lame');
var Speaker = require('speaker');
var q = require('../models/queue');

// exports.add = function(track) {
// 	return q.addToQueue(track);
// };

exports.playQueue = function(req, res) {

	//if(GLOBAL.queue.q.length > 0) {
		//Spotify.login(pw.spotify.username, pw.spotify.pwd, function (err, spotify) {
			//if (err) throw err;
			//console.log('play');

			// first get a "Track" instance from the track URI
			// var uri = GLOBAL;
			// spotify.get(uri, function (err, track) {
			// 	if (err) throw err;
			// 	console.log('Playing: %s - %s', track.artist[0].name, track.name);
			//
			// 	track.play()
			// 		.pipe(new lame.Decoder())
			// 		.pipe(new Speaker())
			// 		.on('finish', function () {
			// 			spotify.disconnect();
			// 		});
			//
			// });
		//});
	//}
};

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
					return res.json(data);
				});
				parser.parseString(xml);
				spotify.disconnect();
			});
		});
	}
};

exports.getQueue = function(req, res) {
	var queue = q.getQueue(function(err, queue) {
		if(err) return err;
		return res.send(queue);
	});
};
