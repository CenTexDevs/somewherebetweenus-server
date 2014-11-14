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
    }
};
