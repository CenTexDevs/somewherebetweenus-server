/**
* Meeting.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
  
  attributes: {
    meetingID:{
        type:'string'
    }
  },
  findAll: function(cb) {
    Meeting.find().exec(function (err, meetings) {
      if (err) return cb(err);
      if (!meetings) return cb(new Error('Meetings not found.'));
      return cb(meetings);
    });
  }
};