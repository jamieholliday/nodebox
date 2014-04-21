'use strict';

var Spotify = require('spotify-web');
var xml2js = require('xml2js');
var pw = require('../config/pw');
var lame = require('lame');
var Speaker = require('speaker');
var q = require('../models/queue');

exports.playQueue = function() {
	//get first track from q and play it.
	q.getFirst(function(err, firstTrack) {
		Spotify.login(pw.spotify.username, pw.spotify.pwd, function(err, spotify) {
			if(err) throw err;
			console.log('play');

			var uri = Spotify.id2uri('track', firstTrack.id[0]);
			spotify.get(uri, function (err, track) {
				if (err) throw err;
				console.log('Playing: %s - %s', track.artist[0].name, track.name);
			
				track.play()
					.pipe(new lame.Decoder())
					.pipe(new Speaker())
					.on('finish', function () {
						spotify.disconnect();
					});
			});
		});
	});
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
