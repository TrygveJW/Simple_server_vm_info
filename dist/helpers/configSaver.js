"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServerConfigData = exports.ConfigSaver = void 0;
const tslib_1 = require("tslib");
const electron_1 = tslib_1.__importDefault(require("electron"));
const fs_1 = tslib_1.__importDefault(require("fs"));
class ConfigSaver {
    constructor(configName) {
        this.dirName = "monitor_app";
        this.configDir = `${(electron_1.default.app || electron_1.default.remote.app).getPath('userData')}/${this.dirName}`;
        this.configFP = this.configDir + `/${configName}.cfg`;
        this.makeSaveDir();
    }
    makeSaveDir() {
        let exists = fs_1.default.existsSync(this.configDir);
        if (!exists) {
            fs_1.default.promises.mkdir(this.configDir);
        }
    }
    /**
     * Tries to load the spesefied config type from the configfile with the config name
     * if no file is found null is returned
     *
     * @returns {Promise<T>}
     * @memberof ConfigSaver
     */
    loadConfig() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            let saveData = null;
            try {
                let ret = yield fs_1.default.promises.readFile(this.configFP);
                saveData = JSON.parse(ret.toString());
                return saveData;
            }
            catch (error) { }
        });
    }
    /**
     *
     *
     * @param {T} saveData
     * @returns {Promise<boolean>}
     * @memberof ConfigSaver
     */
    saveConfig(saveData) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                console.log(saveData);
                fs_1.default.promises.writeFile(this.configFP, JSON.stringify(saveData));
                return true;
            }
            catch (error) {
                return false;
            }
        });
    }
}
exports.ConfigSaver = ConfigSaver;
class ServerConfigData {
}
exports.ServerConfigData = ServerConfigData;
// export class ConfigConfigData{
//     private _showPingScreen: boolean;
//     private _showVMScreen: boolean;
//     public get showVMScreen(): boolean {
//         return this._showVMScreen;
//     }
//     public get showPingScreen(): boolean {
//         return this._showPingScreen;
//     }
//     public UpdateConfigValue(type : ManagerTypes, value:Boolean){
//     }
//     constructor (showvm: boolean, showPing: boolean){
//         this._showPingScreen = showPing;
//         this._showVMScreen = showvm;
//     }
// }
//# sourceMappingURL=configSaver.js.map