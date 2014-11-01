/**
 * MeetingController
 *
 * @description :: Server-side logic for managing meetings
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
  addguest : function(req,res){
    var _nickname = req.body.nickname;
    var _meetingid = req.body.meetingid;
    var _latitude = req.body.latitude;
    var _longitude = req.body.longitude;

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
   * `MeetingController.create()`
   */
  create: function (req, res) {
    return res.json({
      todo: 'create() is not implemented yet!'
    });
  },


  /**


  /**
   * `MeetingController.removeguest()`
   */
  removeguest: function (req, res) {
    return res.json({
      todo: 'removeguest() is not implemented yet!'
    });
  },


  /**
   * `MeetingController.getcenter()`
   */
  getcenter: function (req, res) {
    return res.json({
      todo: 'getcenter() is not implemented yet!'
    });
  },
  
  getguests: function(req,res){
    var id = '12345';
    GuestService.getMeetingGuests(id,function(guests){
      
      for (var i=0; i<guests.length; i++) {
	res.write(guests[i].nickname+'\n');
      }
      
      res.end();
    });
  }
};

