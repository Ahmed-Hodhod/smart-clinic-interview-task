"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const jsonwebtoken_1 = tslib_1.__importDefault(require("jsonwebtoken"));
function getTokenPayload(token) {
    return jsonwebtoken_1.default.verify(token, process.env.APP_SECRET);
}
function getUserId(authToken) {
    if (authToken) {
        const { userId } = getTokenPayload(authToken);
        return userId;
    }
    return null;
}
exports.default = getUserId;
