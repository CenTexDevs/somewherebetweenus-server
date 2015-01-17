// HelloWorldService.js - in api/services
module.exports = {

    getGeoLocationFromAddress: function(address,cb) {
	//console.log('in geolocateVenues');
        var request = require("request");

        var urlPrefix="http://maps.googleapis.com/maps/api/geocode/json?address=";
	
		var _url = urlPrefix + (address.address);

        console.log('urls is '+ _url);
	   
        request(_url, function(error, response, body) {
	    //console.log(body);
            var obj = JSON.parse(body);
            if(obj.status == "OK")
                if(obj.results[0] != null)
                    coordinates = {latitude:(obj.results[0].geometry.location.lat),longitude:(obj.results[0].geometry.location.lng)};
            
            console.log('in getGeoLocationFromAddress, location is '+ JSON.stringify(coordinates));

            return cb(coordinates);

        });
    }
};




