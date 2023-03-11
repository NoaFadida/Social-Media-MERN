class Request {
  body = {};
  userId = null;

  constructor(body, userId) {
    this.body = body;
    this.userId = userId;
  }
  //cons
  static fromRestRequest(req) {
    return new Request(req.body, req.body.userId);
  }
};


export = Request;