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
      
    GuestService.createGuest(guest,function(result){
      res.write(JSON.stringify(result));
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
      
    GuestService.removeGuest(guest,function(result){
      res.write(JSON.stringify(result));
      res.end();
    });
  },


  /**
   * `MeetingController.getcenter()`
   */
  getcenter: function (req, res) {
    var _meetingid = req.query.meetingid;
    MeetingService.getCenter(_meetingid,function(location){
	res.write(JSON.stringify(location)+'\n');
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

