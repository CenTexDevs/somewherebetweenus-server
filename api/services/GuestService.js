// HelloWorldService.js - in api/services
module.exports = {

    callGuestModel: function(cb) {
        return Guest.getBasicArray(cb);
    }
};
