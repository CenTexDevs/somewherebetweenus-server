/**
 * YelpController
 *
 * @description :: Server-side logic for managing Yelps
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
    testYelpService: function (req, res) {
        var venueType = req.query.venueType;
        var longitude = parseFloat(req.query.longitude);
        var latitude = parseFloat(req.query.latitude);

        var location = {latitude:latitude,longitude:longitude};

        YelpService.searchVenues(location,venueType,function(markers){
             for (var i = 0; i < markers.length; i++) {
		res.write(JSON.stringify(markers[i].name)+'\n');
	    };

            res.end();
        });
    },
    findVenues: function (req, res) {
        var venueType = req.param('venueType');
        var meetingID = req.param('meetingID');

        var waterfall = require('async-waterfall');

        waterfall([
            function(callback) //get guests
            {
                MeetingService.getCenter(meetingID,function(location){
                    
                    console.log(location);
                    callback(null,location);
                });
            },
            function(location, callback){ //get venues
                YelpService.searchVenues(location,venueType,function(markers){
                    callback(null,markers);
                });
            }
        ], 
        function(err,markers){
          if(markers!= null)
            res.write(JSON.stringify(markers));
            res.end();
        });
    }
};
