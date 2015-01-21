// VenueService.js - in api/services
module.exports = {

    createVenue: function(venue_dto, cb) {
        var venue = {
            'meetingID': venue_dto.meetingID,
            'venueID': venue_dto.venueID,
            'businessName': venue_dto.businessName,
            'yelpID': venue_dto.yelpID,
            'latitude': venue_dto.latitude,
            'longitude': venue_dto.longitude,
            'voters': []
        };

        Venue.create(venue).exec(function handleResult(err,created) {
            cb(created);
        });
    },



    destroyVenue: function(meetingID, venueID, cb) {
        var criteria = {
            'meetingID': meetingID,
            'venueID': venueID
        };

        Venue.destroy(criteria).exec(function handleResult(err,created) {
            cb(created);
        });
    },



    getMeetingVenues: function(meetingID, cb) {
        Venue.findVenuesByMeetingID(meetingID,function handleResult(venues) {
            return cb(venues);
        });
    },

    getMeetingVenue: function(meetingID, venueID, cb) {
        Venue.findByMeetingIDVenueID(meetingID, venueID,function handleResult(venues) {
            cb(venues[0]);
        });
    },

    updateVenue: function(venue, cb) {
        Venue.updateVenue(venue, function handleResult(result) {
            cb(result);
        });
    },


    removeVoterVotes: function(meetingID,voter, cb) {
        Venue.findVenuesByMeetingID(meetingID,function handleResult(venues){

        async = require("async");
          
        // 1st para in async.each() is the array of items
        async.each(venues,
          // 2nd param is the function that each item is passed to
          function(venue, callback){

              var index = venue.voters.indexOf(voter);
              if(index >= 0)
                venue.voters.splice(index, 1);

            VenueService.updateVenue(venue,function handleResult(venue){
                callback();
                });
          },
          // 3rd param is the function to call when everything's done
          function(err){
            // All tasks are done now
            return cb();
          });
      });
    },

    addVoter: function(meetingID,venueID,voter, cb) {
        var waterfall = require('async-waterfall');

        waterfall([
          function(callback)
          {
            VenueService.removeVoterVotes(meetingID,voter,function handleResult(result){
                callback(null);
            });
          },
          function(callback){
            VenueService.getMeetingVenue(meetingID,venueID,function handleResult(venue){
              var index = venue.voters.indexOf(voter);
              if(index < 0)
                venue.voters.push(voter);
              
              VenueService.updateVenue(venue, function handleResult(result) {
                callback(null);
                });
            });
          }
        ], 
        function(err,result){
            cb(result);
        });
    }
};