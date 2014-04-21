'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * Thing Schema
 */
var QueueSchema = new Schema({
  'id': Array,
  'title': Array,
  'artist-id': Array,
  'artist': Array,
  'album': Array,
  'album-id': Array,
  'album-artist': Array,
  'album-artist-id': Array,
  'year': Array,
  'track-number': Array,
  'length': Array
});
mongoose.model('Queue', QueueSchema);
mongoose.model('Playing', QueueSchema);

var Queue = mongoose.model('Queue');
var Playing = mongoose.model('Playing');

/**
 * Validations
 */
// ThingSchema.path('awesomeness').validate(function (num) {
//   return num >= 1 && num <= 10;
// }, 'Awesomeness must be between 1 and 10');

Queue.addToQueue = function(track, cb) {
  console.log('track');
  Queue.create(track, cb);
};

Queue.getQueue = function(cb) {
  Queue.find({}, cb);
};

Queue.deleteFromQueue = function(id) {
  Queue.remove({id: id}, function(err, track) {
    if(err) {
      return err;
    } else {
      return 'deleted';
    }
  });
};

Queue.addToPlaying = function(track) {
  Playing.create(track, function(err, addedTrack) {
    if(err) {
      return err;
    } else {
      return addedTrack;
    }
  });
};

Queue.deleteFromPlaying = function() {
  Playing.find({}).remove(function(err, track) {
    if(err) {
      return err;
    } else {
      return 'deleted all';
    }
  });
};

module.exports = Queue;
