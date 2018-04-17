"use strict";
var IBResponseStatus;
(function (IBResponseStatus) {
    IBResponseStatus[IBResponseStatus["error"] = 0] = "error";
    IBResponseStatus[IBResponseStatus["success"] = 1] = "success";
})(IBResponseStatus = exports.IBResponseStatus || (exports.IBResponseStatus = {}));
var IBResponse = (function () {
    function IBResponse(response) {
        if (response['status'] == 'success')
            this.status = IBResponseStatus.success;
        else
            this.status = IBResponseStatus.error;
        this.type = response['type'];
        this.data = response['data'];
    }
    return IBResponse;
}());
exports.IBResponse = IBResponse;
//# sourceMappingURL=response.model.js.map