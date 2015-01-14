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
   * venueID, businessname, meetingID, latitude, longitude
   */
  addvenue: function (req, res) {

    var _businessname = req.query.businessname;
    var _yelpid = req.query.yelpid;
    var _meetingID = req.query.meetingID;
    var _longitude = req.query.longitude;
    var _latitude = req.query.latitude;
    var _venueID = '12345';

    //add validation on params
    
    var venue_dto = {'meetingID':_meetingID,
      'venueID' : _venueID,
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
    var meetingID = req.query.meetingID;
    var venueID = req.query.venueID;

    VenueService.destroyVenue(meetingID,venueID,function(result){
      res.write(JSON.stringify(result));
      res.end();
    });
  }, 

  /**
   * `VenuesController.addvoter()`
   */
  addvoter: function (req, res) {
    var meetingID = req.query.meetingID;
    var venueID = req.query.venueID;
    var voter = req.query.voterID;

    VenueService.addVoter(meetingID,venueID,voter,function(result){
      res.write(JSON.stringify(result));
      res.end();
    });
  }, 

  /**
   * `VenuesController.removevoter()`
   */
  removevoter: function (req, res) {
    var meetingID = req.query.meetingID;
    var venueID = req.query.venueID;
    var voter = req.query.voterID;

    VenueService.removeVoter(meetingID,venueID,voter,function(result){
      res.write(JSON.stringify(result));
      res.end();
    });
  }, 

  /**
   * `VenuesController.showvotes()`
   */
  showvotes: function (req, res) {
    var meetingID = req.query.meetingID;
    VenueService.getMeetingVenues(meetingID,function(venues){
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
    //var _meetingID = req.query.meetingID;

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

