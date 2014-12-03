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
        Venue.findByMeetingID2(meetingID,function handleResult(venues) {
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


    removeVoter: function(meetingID,venueID,voter, cb) {
        VenueService.getMeetingVenue(meetingID,venueID,function handleResult(venue){
          var index = venue.voters.indexOf(voter);
          if(index >= 0)
            venue.voters.splice(index, 1);


          VenueService.updateVenue(venue, function handleResult(result) {
            cb(result);
        });
      });
    },

    addVoter: function(meetingID,venueID,voter, cb) {
        VenueService.getMeetingVenue(meetingID,venueID,function handleResult(venue){
          var index = venue.voters.indexOf(voter);
          if(index < 0)
            venue.voters.push(voter);
          VenueService.updateVenue(venue, function handleResult(result) {
            cb(result);
        });
      });
    }
};