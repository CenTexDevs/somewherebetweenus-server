// HelloWorldService.js - in api/services
module.exports = {

    createGuest: function(guest,cb) {
	Guest.create(guest).exec(function createGuest(err,created){cb(created);});
    },
    
    removeGuest: function(guest,cb) {
	Guest.destroy({meetingID:guest.meetingID,guestID:guest.guestID}).exec(function removeGuest(err,deleted){cb(deleted)});
    },

    updateGuestLocation: function(guest,cb) {
            Guest.update({'meetingID':guest.meetingID,'guestID':guest.guestID},{latitude:guest.latitude,longitude:guest.longitude}).exec(function handleResult(err,result) {
                console.log('f2');
                console.log(result);
                cb(result);
               });
    },


    getMeetingGuests: function(meetingID,cb) {
	Guest.findByMeetingID(meetingID).exec(function handleResult(err,guests){cb(guests)});
    },

    getMeetingGuest: function(meetingID,guestID,cb) {
	Guest.findByMeetingID(meetingID,guestID).exec(function handleResult(err,guests){cb(guests)});
    },

    inviteGuest: function(invitation, cb){
        var waterfall = require('async-waterfall');

        console.log('before waterfall, smsnumber is '+JSON.stringify(invitation));

        console.log('step 1');
        waterfall([
            /*function(callback)
            {
                console.log('step 2 - start');
                //shorten url part
                var googl = require('goo.gl');

                // Shorten a long url and output the result
				var url = 'http://www.somewherebetween.us/joingroup.html?meetingID='+invitation.meetingID;
                googl.shorten(url)
                    .then(function (shortUrl) {
                        console.log('step 2 - end');
                        callback(null,shortUrl);
                    })
                    .catch(function (err) {
                        console.log(err);
                        console.log('step 2 - end (error)');
                        //callback(null,url);
                    });
				//callback(null,url);
            },
			*/
			
            function(callback)
            {
                console.log('step 2 - start');
                var request = require('request');

				var url = 'http://www.somewherebetween.us/joingroup.html?meetingID='+invitation.meetingID;
				url = encodeURI(url);
				request
				.get('https://api-ssl.bitly.com/v3/shorten?access_token=b2bbc17c2221b97c9a47148ed3c6fe937ca22fd9&longUrl='+url)
				.on('response', function(response) {
					console.log('step 2 - end');
					console.log(response);
					console.log(response.data);
                    callback(null,response.data);
				});					
            },
            function(shortUrl,callback){
                console.log('step 3 - start');
                //sms part
                var request = require('request');

                var msg = invitation.nickname+' has invited you join their group on SomewhereBetween.US. ';
                msg += 'Click to join: ' + shortUrl;

                console.log('requesting text to '+ invitation.smsNumber);

				request.post(
                    'http://textbelt.com/text',
                    { form: { number: invitation.smsNumber, message: msg } },
                    function (error, response, body) {
                        if (!error && response.statusCode == 200) {
                            console.log('step 3 - end');
                            console.log(body);
                            callback(null,{response:response,body:body});
                        }
                        else
                        {
                            console.log('step 3 - end (error)');
                            callback(error);
                        }
                    }
                );
				/*
				console.log('using ezTexting.com');
				request.post(
					'https://app.eztexting.com/sending/messages?format=json',
					{form:{User:"sbu",Password:"sbupassword",PhoneNumbers:invitation.smsNumber,Message:msg}},
                    function (error, response, body) {
                        if (!error && response.statusCode == 200) {
                            console.log('step 3 - end');
                            console.log(body);
                            callback(null,{response:response,body:body});
                        }
                        else
                        {
                            //console.log(response);
                            //console.log(body);
                            console.log('step 3 - end (error)');
                            callback(error);
                        }
                    }
                );*/
            }
        ], function(err,result){
            console.log('error handler');
            cb(JSON.stringify(result)); //if all succeeds, result is the {response:x,body:y} object
        });
    }
};
