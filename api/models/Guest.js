/**
* Guest.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
  connection: 'someMongodbServer',
  
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
  findByMeetingID: function(meetingID,cb) {
    Guest.find({'meetingID':meetingID}).exec(function (err, guests) {
      if (err) return cb(err);
      if (!guests) return cb(new Error('User not found.'));
      return cb(guests);
    });
  },
  findByMeetingIDAndNickname: function(meetingID,nickname,cb) {
    Guest.find({'meetingID':meetingID,'nickname':nickname}).exec(function (err, guests) {
      if (err) return cb(err);
      if (!guests) return cb(new Error('User not found.'));
      return cb(guests);
    });
  },
  updateGuestLocation: function(meetingID,nickname,latitude,longitude,cb) {
    Guest.update({'meetingID':meetingID,'nickname':nickname},{'latitude':latitude,'longitude':longitude}).exec(function (err, guest) {
      if (err) return cb(err);
      if (!guest) return cb(new Error('User not found.'));
      return cb(guest);
    });
  }
};

