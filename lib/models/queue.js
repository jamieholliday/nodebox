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
  Queue.create(track, cb);
};

Queue.getQueue = function(cb) {
  Queue.find({}, cb);
};

Queue.getFirst = function(cb) {
  //get the first track from the queue and remove it
  Queue.findOneAndRemove({}, function(err, track) {
    if(err) throw err; 
    //Pass the removed track to the playing collection
    Queue.addToPlaying(track, cb);
  });
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

Queue.addToPlaying = function(track, cb) {
  //Remove everything from palying before adding
  Queue.deleteFromPlaying(function() {
    //Add the new track and return it so it can be emitted via socket
    Playing.create(track, cb);  
  });
};

Queue.deleteFromPlaying = function(cb) {
  Playing.find({}).remove(cb);
};

module.exports = Queue;
