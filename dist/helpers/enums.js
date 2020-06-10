"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ManagerTypes = exports.ServerStatus = void 0;
var ServerStatus;
(function (ServerStatus) {
    ServerStatus[ServerStatus["OFFLINE"] = 0] = "OFFLINE";
    ServerStatus[ServerStatus["ONLINE"] = 1] = "ONLINE";
    ServerStatus[ServerStatus["NO_INTERNET"] = 2] = "NO_INTERNET";
    ServerStatus[ServerStatus["DOMAIN_ERROR"] = 3] = "DOMAIN_ERROR";
})(ServerStatus = exports.ServerStatus || (exports.ServerStatus = {}));
var ManagerTypes;
(function (ManagerTypes) {
    ManagerTypes[ManagerTypes["Main"] = 0] = "Main";
    ManagerTypes[ManagerTypes["Ping"] = 1] = "Ping";
    ManagerTypes[ManagerTypes["Vm"] = 2] = "Vm";
})(ManagerTypes = exports.ManagerTypes || (exports.ManagerTypes = {}));
//# sourceMappingURL=enums.js.map