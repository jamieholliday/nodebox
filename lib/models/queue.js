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

QueueSchema.statics.addToQueue = function(track, cb) {
  Queue.create(track, cb);
};

QueueSchema.statics.getQueue = function() {
  Queue.find({}, function(err, currentQueue) {
    if(err){
      return err;
    } else {
      return currentQueue;
    }
  });
};

QueueSchema.statics.deleteFromQueue = function(id) {
  Queue.remove({id: id}, function(err, track) {
    if(err) {
      return err;
    } else {
      return 'deleted';
    }
  });
};

QueueSchema.statics.addToPlaying = function(track) {
  Playing.create(track, function(err, addedTrack) {
    if(err) {
      return err;
    } else {
      return addedTrack;
    }
  });
};

QueueSchema.statics.deleteFromPlaying = function() {
  Playing.find({}).remove(function(err, track) {
    if(err) {
      return err;
    } else {
      return 'deleted all';
    }
  });
};

module.exports = Queue;
