/**
 * YelpController
 *
 * @description :: Server-side logic for managing Yelps
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
    testYelpService: function (req, res) {

        var location = {latitude:33.0,longitude:-97.0};
        var venueType = "coffee";

        YelpService.searchVenues(location,venueType,function(markers){
            res.write(JSON.stringify(markers));
            res.end();
        });
    }
};
