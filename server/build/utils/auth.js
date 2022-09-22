var jwt = require("jsonwebtoken");
require("dotenv").config();
var secret = process.env.JWT_SECRET;
var expiration = "6h";
module.exports = {
    authMiddleware: function (_a) {
        var req = _a.req;
        var token = req.body.token || req.query.token || req.headers.authorization;
        if (req.headers.authorization) {
            token = token.split(" ").pop().trim();
        }
        if (!token) {
            return req;
        }
        try {
            var data = jwt.verify(token, secret, { maxAge: expiration }).data;
            req.user = data;
        }
        catch (_b) {
            console.log("Invalid token");
        }
        return req;
    },
    signToken: function (_a) {
        var email = _a.email, username = _a.username, _id = _a._id;
        var payload = { email: email, username: username, _id: _id };
        return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
    },
};
