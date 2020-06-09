"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfigConfigData = exports.ServerConfigData = exports.Config = void 0;
const tslib_1 = require("tslib");
const electron_1 = tslib_1.__importDefault(require("electron"));
const fs_1 = tslib_1.__importDefault(require("fs"));
class Config {
    constructor(configName) {
        console.log((electron_1.default.app || electron_1.default.remote.app).getPath('userData'));
        this.configFP = (electron_1.default.app || electron_1.default.remote.app).getPath('userData') + configName + "cfg";
    }
    loadConfig() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                let ret = yield fs_1.default.promises.readFile(this.configFP);
                this.saveData = JSON.parse(ret.toString());
            }
            catch (error) { }
        });
    }
    saveConfig() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                fs_1.default.promises.writeFile(this.configFP, JSON.stringify(this.saveData));
            }
            catch (error) { }
        });
    }
}
exports.Config = Config;
class ServerConfigData {
    constructor(name, ip, domain) {
        this._serverName = name;
        this._serverIP = ip;
        this._serverDomain = domain;
    }
    get serverName() {
        return this._serverName;
    }
    get serverIP() {
        return this._serverIP;
    }
    get serverDomain() {
        return this._serverDomain;
    }
}
exports.ServerConfigData = ServerConfigData;
class ConfigConfigData {
    constructor(showvm, showPing) {
        this._showPingScreen = showPing;
        this._showVMScreen = showvm;
    }
    get showVMScreen() {
        return this._showVMScreen;
    }
    get showPingScreen() {
        return this._showPingScreen;
    }
}
exports.ConfigConfigData = ConfigConfigData;
//# sourceMappingURL=config.js.map