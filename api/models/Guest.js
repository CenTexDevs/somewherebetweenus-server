/**
* Guest.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    nickname:{
        type:'string'
    },
    meetingID:{
        type:'string'
    },
    latitude:{
        type:'float'
    },
    longitude:{
        type:'float'
    }
  },
  findByMeeting: function(meetingID,cb) {

    Guest.findBymeetingID(meetingID).exec(function (err, guests) {
      if (err) return cb(err);
      if (!guests) return cb(new Error('User not found.'));
      return cb(guests);
    });
  },
  getBasicArray:function(cb){
    return cb({'key1':'value1'});
  }
};

