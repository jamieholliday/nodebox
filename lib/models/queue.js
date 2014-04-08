'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * Thing Schema
 */
var QueueSchema = new Schema({any: {}});
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

exports.addToQueue = function(track) {
  Queue.create(track, function(err, newTrack) {
    if(err) {
      return err;
    } else {
      return newTrack;
    }
  });
};

exports.getQueue = function() {
  Queue.find({}, function(err, currentQueue) {
    if(err){
      return err;
    } else {
      return currentQueue;
    }
  });
};

exports.deleteFromQueue = function(id) {
  Queue.remove({id: id}, function(err, track) {
    if(err) {
      return err;
    } else {
      return 'deleted';
    }
  });
};

exports.addToPlaying = function(track) {
  Playing.create(track, function(err, addedTrack) {
    if(err) {
      return err;
    } else {
      return addedTrack;
    }
  });
};

exports.deleteFromPlaying = function() {
  Playing.find({}).remove(function(err, track) {
    if(err) {
      return err;
    } else {
      return 'deleted all';
    }
  });
};
