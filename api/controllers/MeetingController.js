/**
 * MeetingController
 *
 * @description :: Server-side logic for managing meetings
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
  /**
   * `MeetingController.create()`
   */
  create: function (req, res) {
    var _nickname = req.query.nickname;
    var _meetingid = req.query.meetingid;
    var _guestid = req.query.guestid;

    var waterfall = require('async-waterfall');

    waterfall([
      function(callback)
      {
        var meeting = {'meetingid':_meetingid};
        MeetingService.createMeeting(meeting,function(result){
          callback(null);
        });
      },
      function(callback){
        var guest = {'nickname':_nickname,
          'meetingID':_meetingid,
          'guestID':_guestid};
        GuestService.createGuest(guest,function(result){
          callback(null);
        });
      }
    ], 
    function(err,result){
      if(result!= null)
        res.write(JSON.stringify(result));
      res.end();
    });      
  },

  inviteGuest : function(req,res){
    var _smsNumber = req.query.smsNumber;
    var _nickname = req.query.nickname;
    var _meetingID = req.query.meetingID;

    //add validation on params
    
    var invitation = {'smsNumber':_smsNumber,
      'nickname':_nickname,
      'meetingID':_meetingID
    };
      
    GuestService.inviteGuest(invitation,function(result){
      res.write(JSON.stringify(result));
      res.end();
    });
  },

  addguest : function(req,res){
    var _guestid = req.query.guestid;
    var _nickname = req.query.nickname;
    var _meetingid = req.query.meetingid;
    var _latitude = req.query.latitude;
    var _longitude = req.query.longitude;

    //add validation on params
    
    var guest = {'nickname':_nickname,
      'guestID':_guestid,
      'meetingID':_meetingid,
      'latitude':_latitude,
      'longitude':_longitude};
      
    GuestService.createGuest(guest,function(guest){
      res.write(JSON.stringify(guest));
      res.end();
    });
  },

  /**
   * `MeetingController.removeguest()`
   */
  removeguest: function (req, res) {
    var _guestid = req.query.guestid;
    var _meetingid = req.query.meetingid;

    //add validation on params
    
    var guest = {'guestID':_guestid,
      'meetingID':_meetingid};
      
    GuestService.removeGuest(guest,function(guests){
	    res.write(JSON.stringify(guests));
      res.end();
    });
  },

  listguests : function(req,res){
    var _meetingid = req.query.meetingid;

    //add validation on params
    
    var meeting = {'meetingID':_meetingid};
      
    GuestService.getMeetingGuests(meeting.meetingID,function(guests){
      res.write(JSON.stringify(guests));
      res.end();
    });
  },


  /**
   * `MeetingController.getcenter()`
   */
  getcenter: function (req, res) {
    var _meetingid = req.query.meetingid;
    MeetingService.getCenter(_meetingid,function(location){
      var location={'latitude':location.latitude,'longitude':location.longitude}
	    res.write(JSON.stringify(location));
      res.end();
    });
  },
  
  getguests: function(req,res){
    var _meetingid = req.query.meetingid;
    GuestService.getMeetingGuests(_meetingid,function(guests){
      res.write(JSON.stringify(guests));
      res.end();
    });
  }
};

