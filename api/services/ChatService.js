// ChatService.js - in api/services
module.exports = {

    addComment: function(comment,cb) {
		comment.logdatetime = Number(Date.now());
		console.log(JSON.stringify(comment));
        Comment.create(comment).exec(function createdComment(err,created){
        	if(err != null)
        		console.log(err);
        	cb(created);
        });
    },
    getMeetingComments: function(query,cb){
    var waterfall = require('async-waterfall');

    waterfall([
      function(callback)
      {
        GuestService.getMeetingGuests(query.meetingID,function(guests){
          callback(null,guests);
        });
      },
      function(guests,callback){
        console.log(JSON.stringify(guests));
        Comment.findByMeetingID(query.meetingID).exec(function handleResult(err,comments){callback(null,guests,comments)});
      },
      function(guests,comments,callback){


        var nicknames = {};
        for(var i=0; i< guests.length; i++)
        {
            nicknames[guests[i].guestID] = guests[i].nickname;
        }

        for(var i=0; i<comments.length;i++)
        {
            var guestID = comments[i].guestID
            comments[i].nickname = nicknames[guestID];
        }
        console.log(JSON.stringify(comments));

        callback(null,comments);

      }
    ], 
    function(err,result){
      if(result!= null)
        cb(JSON.stringify(result));
      
    });      

    }    


};
