"use strict";
var IBDateUtil = (function () {
    function IBDateUtil() {
    }
    IBDateUtil.getDate = function (server_utc_date) {
        var year = Number(server_utc_date.substring(0, 4));
        var month = Number(server_utc_date.substring(5, 7));
        var day = Number(server_utc_date.substring(8, 10));
        var hour = Number(server_utc_date.substring(11, 13));
        var minute = Number(server_utc_date.substring(14, 16));
        var date = new Date(Date.UTC(year, month - 1, day, hour, minute));
        return date;
    };
    return IBDateUtil;
}());
exports.IBDateUtil = IBDateUtil;
//# sourceMappingURL=dateutil.model.js.map