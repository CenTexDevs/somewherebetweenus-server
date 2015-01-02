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

    //add validation on params
    
    var guest = {'nickname':_nickname,
      'meetingID':_meetingid};
      
    GuestService.removeGuest(guest,function(result){
      res.write(JSON.stringify(result));
      res.end();
    });
  },

  inviteGuest : function(req,res){
    var _smsNumber = req.query.smsNumber;
    var _fromUsername = req.query.fromUsername;
    var _groupID = req.query.groupID;

    //add validation on params
    
    var invitation = {'smsNumber':_smsNumber,
      'fromUsername':_fromUsername,
      'groupID':_groupID
    };
      
    GuestService.inviteGuest(invitation,function(result){
      res.write(JSON.stringify(result));
      res.end();
    });
  },

  addguest : function(req,res){
    var _nickname = req.query.nickname;
    var _meetingid = req.query.meetingid;
    var _latitude = req.query.latitude;
    var _longitude = req.query.longitude;

    //add validation on params
    
    var guest = {'nickname':_nickname,
      'meetingID':_meetingid,
      'latitude':_latitude,
      'longitude':_longitude};
      
    GuestService.createGuest(guest,function(guest){
      res.write(guest.nickname+'\n');
      res.end();
    });
  },

  /**
   * `MeetingController.removeguest()`
   */
  removeguest: function (req, res) {
    var _nickname = req.query.nickname;
    var _meetingid = req.query.meetingid;

    //add validation on params
    
    var guest = {'nickname':_nickname,
      'meetingID':_meetingid};
      
    GuestService.removeGuest(guest,function(guests){
      for (var i=0; i<guests.length; i++) {
	res.write(guests[i].nickname+'\n');
      }
      res.end();
    });
  },


  /**
   * `MeetingController.getcenter()`
   */
  getcenter: function (req, res) {
    var _meetingid = req.query.meetingid;
    MeetingService.getCenter(_meetingid,function(location){
	res.write('latitude:'+location.latitude+'  longitude:'+location.longitude+'\n');
        res.end();
    });
  },
  
  getguests: function(req,res){
    var _meetingid = req.query.meetingid;
    GuestService.getMeetingGuests(_meetingid,function(guests){
      
      for (var i=0; i<guests.length; i++) {
	res.write(guests[i].nickname+'\n');
      }
      
      res.end();
    });
  }
};

