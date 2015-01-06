// HelloWorldService.js - in api/services
module.exports = {

    createGuest: function(guest,cb) {
	Guest.create(guest).exec(function createGuest(err,created){cb(created);});
    },
    
    removeGuest: function(guest,cb) {
	Guest.destroy({meetingID:guest.meetingID,guestID:guest.guestID}).exec(function removeGuest(err,deleted){cb(deleted)});
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
            function(callback)
            {
                console.log('step 2 - start');
                //shorten url part
                var googl = require('goo.gl');

                // Shorten a long url and output the result
                googl.shorten('http://www.somewherebetween.us/joingroup.html?meetingID='+invitation.meetingID)
                    .then(function (shortUrl) {
                        console.log('step 2 - end');
                        callback(null,shortUrl);
                    })
                    .catch(function (err) {
                        console.log(err);
                        console.log('step 2 - end (error)');
                        callback(err);
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
            }
        ], function(err,result){
            console.log('error handler');
            cb(JSON.stringify(result)); //if all succeeds, result is the {response:x,body:y} object
        });
    }
};
