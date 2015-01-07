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
    var _nickname = req.param('nickname');
    var _meetingid = req.param('meetingid');
    var _guestid = req.param('guestid');

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
    var _smsNumber = req.param('smsNumber');
    var _nickname = req.param('nickname');
    var _meetingID = req.param('meetingID');

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
    var _guestid = req.param('guestid');
    var _nickname = req.param('nickname');
    var _meetingid = req.param('meetingid');
    var _latitude = req.param('latitude');
    var _longitude = req.param('longitude');

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
    var _guestid = req.param('guestid');
    var _meetingid = req.param('meetingid');

    //add validation on params
    
    var guest = {'guestID':_guestid,
      'meetingID':_meetingid};
      
    GuestService.removeGuest(guest,function(guests){
	    res.write(JSON.stringify(guests));
      res.end();
    });
  },

  listguests : function(req,res){
    var _meetingid = req.param('meetingid');

    //add validation on params
    
    var meeting = {'meetingID':_meetingid};
      
    GuestService.getMeetingGuests(meeting.meetingID,function(guests){
      res.write(JSON.stringify(guests));
      res.end();
    });
  },

  getmeetingmarkers: function(req,res){


    var waterfall = require('async-waterfall');

    waterfall([
      function(callback) //get guests
      {
        var markers = [];

        markers[markers.length] = { 'type':'guest',
          'nickname' : 'rob',
          'latitude' : 30.50,
          'longitude': -97.50
        };

        markers[markers.length] = { 'type':'guest',
          'nickname' : 'tom',
          'latitude' : 30.51,
          'longitude': -97.51
        };

        markers[markers.length] = { 'type':'guest',
          'nickname' : 'dave',
          'latitude' : 30.52,
          'longitude': -97.52
        };

          callback(null,markers);
      },
      function(markers, callback){ //get venues

        markers[markers.length] = { 'type':'venue',
          'votes' : 1,
          'winner' : 'false',
          'nickname' : 'taco bell',
          'latitude' : 30.60,
          'longitude': -97.50
        };

        markers[markers.length] = { 'type':'venue',
          'votes' : 1,
          'winner' : 'false',
          'nickname' : 'burger king',
          'latitude' : 30.61,
          'longitude': -97.51
        };

        markers[markers.length] = { 'type':'venue',
          'votes' : 2,
          'winner' : 'true',
          'nickname' : 'chik fil a',
          'latitude' : 30.62,
          'longitude': -97.52
        };

        callback(null,markers);
      }
    ], 
    function(err,result){
      if(result!= null)
        res.write(JSON.stringify(result));
      res.end();
    });    

  },


  /**
   * `MeetingController.getcenter()`
   */
  getcenter: function (req, res) {
    var _meetingid = req.param('meetingid');
    MeetingService.getCenter(_meetingid,function(location){
      var location={'latitude':location.latitude,'longitude':location.longitude}
	    res.write(JSON.stringify(location));
      res.end();
    });
  },
  
  getguests: function(req,res){
    var _meetingid = req.param('meetingid');
    GuestService.getMeetingGuests(_meetingid,function(guests){
      res.write(JSON.stringify(guests));
      res.end();
    });
  }
};

