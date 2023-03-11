"use strict";
class Request {
    constructor(body, userId) {
        this.body = {};
        this.userId = null;
        this.body = body;
        this.userId = userId;
    }
    //cons
    static fromRestRequest(req) {
        return new Request(req.body, req.body.userId);
    }
}
;
module.exports = Request;
//# sourceMappingURL=Request.js.map