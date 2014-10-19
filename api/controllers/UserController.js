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
	}
};

