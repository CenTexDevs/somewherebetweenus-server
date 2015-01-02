/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	useHelloWorldService : function(req,res){
		var result = HelloWorldService.alertHelloWorld();
		res.write(JSON.stringify(result));
		res.end();
	},

	inviteUser: function(req,res){
		var request = require('request');

		request.post(
		    'http://textbelt.com/text',
		    { form: { number: '5129147757', message: 'this is my message' } },
		    function (error, response, body) {
		        if (!error && response.statusCode == 200) {
		            console.log(body)
		        }
		    }
		);

		res.write('done');
		res.end();
	}
};

