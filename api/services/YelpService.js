// HelloWorldService.js - in api/services
module.exports = {

    getGeoLocationFromAddress: function(address,cb) {
	console.log('need to finish GoogleMapsService.getGeoLocationFromAddress()');
        var _return = {'key':'value'};
        cb(_return);
    },

    searchVenues: function(location,venueType, cb) {
    
	var markerResults = [];
	var midCoordinate = {latitude:location.latitude,longitude:location.longitude};
    
	var yelp = require("yelp").createClient({
	    consumer_key: "f6TEXZpl19BGpCmvj4sFsA",
	    consumer_secret: "Tc5rr4kO49xrWjif6CGC-zDt5Q8",
	    token: "nW7K79xxVHQKKRVJGB30UyGAbTlwjZD_",
	    token_secret: "c4QpX-2fI4vv9DkkowQvg1UojJg"
	});
	
	//console.log(JSON.stringify(midCoordinate));
	var ll=location.latitude+","+location.longitude;

	yelp.search({term: venueType, ll:ll, limit:"20", "sort": 1, "radius_filter":20000}, function(error, data) {
	    function TransformYelpResults(yelpBusiness) {
		//console.log(yelpBusiness);
		return {
		    name:yelpBusiness.name,
		    imageUrl:yelpBusiness.image_url,
		    mobile_url: yelpBusiness.mobile_url,
		    address: yelpBusiness.location.address + ", "+yelpBusiness.location.city+", "+yelpBusiness.location.state_code+" "+yelpBusiness.location.postal_code,
		    display_phone: yelpBusiness.display_phone,
		    url:yelpBusiness.url
		};
	    }
	    
	    if (error) {
	      console.log(error);
	      return cb([]);
	    }
    
	    var venues = data.businesses.map(TransformYelpResults);
	    var idbase = Date.now();

	    for (var i = 0; i < venues.length; i++) {

	    	var _id = 100 + i;
	    	_id = idbase + _id;
		//console.log('venue:'+i);
		var venue = {
			id:_id,
		    name:venues[i].name,
		    imageUrl:venues[i].imageUrl,
		    mobile_url:venues[i].mobile_url,
		    address : venues[i].address,
		    display_phone: venues[i].display_phone,
		    phone: venues[i].phone,
		    url:venues[i].url,
		    coordinates:null
		};
		//console.log(venue.name);
		markerResults.push(venue);
	    };

	    //at this point, I have the venues (markers)
	    //now, go thorugh each and call
	    //GoogleMapsService.getGeoLocationFromAddress(address, cb)
	    //to geth the address
	    //(need to form sync out of async)

		// Include the async package
		// Make sure you add "async" to your package.json
		async = require("async");
		  
		// 1st para in async.each() is the array of items
		async.each(markerResults,
		  // 2nd param is the function that each item is passed to
		  function(item, callback){

		    // Call an asynchronous function, often a save() to DB
		    var address = {"address":item.address};
		    console.log(address);
		    GoogleMapsService.getGeoLocationFromAddress(address,function (venuelocation){
		    	console.log(venuelocation);
		      item.coordinates=venuelocation;
		      callback();
		    });
		  },
		  // 3rd param is the function to call when everything's done
		  function(err){
		    // All tasks are done now
		    return cb(markerResults);
		  }
		);
	});
    }
};

