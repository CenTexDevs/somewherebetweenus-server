// HelloWorldService.js - in api/services
module.exports = {

    callGuestModel: function(cb) {



	var guest = {'nickname':'rob','meetingID':'12345','latitude':30.5,'longitude':-97.5};
	Guest.create({nickname:'rob',meetingID:'12345',latitude:30.5,longitude:-97.5}).exec(function createGuest(err,created){cb(created)});
        //cb(result);
	//return Guest.getBasicArray(cb);
    }
};
