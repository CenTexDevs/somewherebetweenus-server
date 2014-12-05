/**
 * VenuesController
 *
 * @description :: Server-side logic for managing venues
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	


  /**
   * `VenuesController.findvenuesnear()`
   */
  findvenuesnear: function (req, res) {
    return res.json({
      todo: 'findvenuesnear() is not implemented yet!'
    });
  },


  /**
   * `VenuesController.getvenuedetails()`
   */
  getvenuedetails: function (req, res) {
    return res.json({
      todo: 'getvenuedetails() is not implemented yet!'
    });
  }, 

  /**
   * `VenuesController.addvenue()`
   * venueid, businessname, meetingid, latitude, longitude
   */
  addvenue: function (req, res) {

    var _businessname = req.query.businessname;
    var _yelpid = req.query.yelpid;
    var _meetingid = req.query.meetingid;
    var _longitude = req.query.longitude;
    var _latitude = req.query.latitude;
    var _venueid = '12345';

    //add validation on params
    
    var venue_dto = {'meetingID':_meetingid,
      'venueID' : _venueid,
      'businessName':_businessname,
      'yelpID': _yelpid,
      'latitude':_latitude,
      'longitude':_longitude
    };

    VenueService.createVenue(venue_dto,function(result){
      res.write(JSON.stringify(result));
      res.end();
    });
  }, 

  /**
   * `VenuesController.removevenue()`
   */
  removevenue: function (req, res) {
    var meetingid = req.query.meetingid;
    var venueid = req.query.venueid;

    VenueService.destroyVenue(meetingid,venueid,function(result){
      res.write(JSON.stringify(result));
      res.end();
    });
  }, 

  /**
   * `VenuesController.addvoter()`
   */
  addvoter: function (req, res) {
    var meetingid = req.query.meetingid;
    var venueid = req.query.venueid;
    var voter = req.query.voterid;

    VenueService.addVoter(meetingid,venueid,voter,function(result){
      res.write(JSON.stringify(result));
      res.end();
    });
  }, 

  /**
   * `VenuesController.removevoter()`
   */
  removevoter: function (req, res) {
    var meetingid = req.query.meetingid;
    var venueid = req.query.venueid;
    var voter = req.query.voterid;

    VenueService.removeVoter(meetingid,venueid,voter,function(result){
      res.write(JSON.stringify(result));
      res.end();
    });
  }, 

  /**
   * `VenuesController.showvotes()`
   */
  showvotes: function (req, res) {
    var meetingid = req.query.meetingid;
    VenueService.getMeetingVenues(meetingid,function(venues){
      for (var i=0; i<venues.length; i++) {
        res.write(venues[i].businessName+'\n');
        res.write(venues[i].voters.length+'\n');
        res.write('\n');
      }
      res.end();
    });
  }, 
    /**
   * `VenueController.venuetest()`
   */
  venuetest: function (req, res) {
    //var _nickname = req.query.nickname;
    //var _meetingid = req.query.meetingid;

    //add validation on params
    
    var venue = {'meetingID':'1234',
      'venueID':'5678',
      'businessName':'bizname',
      'yelpID':'y1234',
      'latitude': 30.01,
      'longitude':-97.5432,
      'voters':[]
    };


    VenueService.createVenue(venue,function(venue){
      if(false)
        {
          res.end();
          return;
        }
      venue.voters.push('voter1');
      //res.write(JSON.stringify(venue));
      //res.end();
      VenueService.updateVenue(venue,function(result){
        res.write(JSON.stringify(result));
        res.write('done\n');
        res.end();
      });
    });
  }
};
