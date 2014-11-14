/**
 * GoogleMapsController
 *
 * @description :: Server-side logic for managing Googlemaps
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
    getGeoLocationFromAddress: function (req, res) {
        console.log('need to finish GoogleMapsController.getGeoLocationFromAddress')
        var _address = req.query.address;
        _address = {'address':_address};
        GoogleMapsService.getGeoLocationFromAddress(_address,function(result){
        res.write('latitude:'+result.latitude+'  longitude:'+result.longitude);
        res.end();
    });
  },
};




