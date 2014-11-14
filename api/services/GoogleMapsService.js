// HelloWorldService.js - in api/services
module.exports = {

    getGeoLocationFromAddress: function(address,cb) {
	//console.log('in geolocateVenues');
        var request = require("request");

        var urlPrefix="http://maps.googleapis.com/maps/api/geocode/json?address=";
	
	var _url = urlPrefix + (address.address);
	   
	//console.log(urlPrefix);
	//console.log('');
	//console.log(address.address);
	//console.log('');

        request(_url, function(error, response, body) {
	    //console.log(body);
            var obj = JSON.parse(body);
            coordinates = {latitude:(obj.results[0].geometry.location.lat),longitude:(obj.results[0].geometry.location.lng)};
            return cb(coordinates);
        });
    }
};




