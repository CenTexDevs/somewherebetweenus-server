// HelloWorldService.js - in api/services
module.exports = {

    createGuest: function(guest,cb) {
	Guest.create(guest).exec(function createGuest(err,created){cb(created);});
    },
    
    removeGuest: function(guest,cb) {
	Guest.destroy({meetingID:guest.meetingID,nickname:guest.nickname}).exec(function removeGuest(err,deleted){cb(deleted)});
    },

    getMeetingGuests: function(meetingID,cb) {
	Guest.findByMeetingID(meetingID).exec(function handleResult(err,guests){cb(guests)});
    },
    getMeetingGuest: function(meetingID,nickname,cb) {
	Guest.findByMeetingID(meetingID,nickname).exec(function handleResult(err,guests){cb(guests)});
    }
};
