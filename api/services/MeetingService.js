// HelloWorldService.js - in api/services
module.exports = {

    createMeeting: function(meeting,cb) {
	Meeting.create(meeting).exec(function createGuest(err,created){cb(created)});
    },
    
    findAll: function(cb) {
	Meeting.findAll().exec(function findAll(err,meetings){cb(meetings)});
    },

    getCenter: function(meetingID,cb) {
	Guest.findByMeetingID(meetingID).exec(function getCenter(err,guests){
            
            var cnt = 0;
            var totalLats = 0.0;
            var totalLongs = 0.0;
            
            //console.log(guests);
            
             for (var i=0; i<guests.length; i++) {
              console.log(guests[i]);
                cnt = cnt + 1;
                totalLats = totalLats + guests[i].latitude;
                totalLongs = totalLongs + guests[i].longitude;
              }

              if (cnt == 0)
              {
                var location = {'latitude':1.0,'longitude':1.0};
                cb(location);
                return;
              }
              
              var latitude = totalLats / cnt;
              var longitude = totalLongs / cnt;
              
  
             var location = {'latitude':latitude,'longitude':longitude};
             cb(location);
          });
    }
};
