/**
* Venue.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
  	meetingID:{
  		type:'string'
  	},
  	venueID:{
  		type:'string'
  	},
    businessName:{
        type:'string'
    },
    yelpID:{
        type:'string'
    },
    latitude:{
        type:'float'
    },
    longitude:{
        type:'float'
    },
    voters:{
    	type:'array'
    }
  },
  updateVenue: function(venue,cb) {
  	Venue.update({'meetingID':venue.meetingID,'venueID':venue.venueID},venue).exec(function handleResult(err, venue) {
    if (err) console.log(err);//return cb(err);
      if (!venue) return cb(new Error('Venue not found.'));
      return cb(venue);
    });
  },  
  findByMeetingIDVenueID: function(meetingID,venueID,cb) {
    Venue.find({'meetingID':meetingID,'venueID':venueID}).exec(function handleResult(err, venues) {
      if (err){
        console.log(err);
      return cb(err);
      } 
      if (!venues){
        console.log('!venues');
        return cb(new Error('Venues not found.'));
      }
      return cb(venues);
    });
  },
  findByMeetingID2 : function(meetingID,cb) {
    Venue.find({'meetingID':meetingID}).exec(function handleResult(err, venues) {
      if (err){
        console.log(err);
      return cb(err);
      } 
      if (!venues){
        console.log('!venues');
        return cb(new Error('Venues not found.'));
      }
      return cb(venues);
    });
  }


};

