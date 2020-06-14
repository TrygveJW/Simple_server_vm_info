"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveConfigsToFiles = void 0;
const tslib_1 = require("tslib");
const table_1 = require("./helpers/table");
const configSaver_1 = require("./helpers/configSaver");
const EventWatcher_1 = require("./helpers/WoldsethUtils/EventWatcher");
const enums_1 = require("./helpers/enums");
const { dialog } = require('electron').remote;
//import {Config, ServerData} from "src/helpers/config"
// ####################################################
let configButtonBar = document.getElementById("config-bar");
let configScreen = document.getElementById("config-screen");
const Watcher = new EventWatcher_1.EventWatcher();
let activeManager;
let selectableManagers = new Map();
function saveConfigsToFiles() {
    for (const mang of selectableManagers.values()) {
        mang.saveConfig();
    }
}
exports.saveConfigsToFiles = saveConfigsToFiles;
const dialogOptions = {
    type: 'question',
    buttons: ["yes", "no"],
    title: 'Question',
    message: 'Save changes?'
};
window.addEventListener("beforeunload", (ev) => {
    ev.preventDefault();
    let index = dialog.showMessageBoxSync(null, dialogOptions);
    if (index == 0) {
        saveConfigsToFiles();
    }
    window.close();
}, false);
function changeToConfig(newConfig) {
    activeManager === null || activeManager === void 0 ? void 0 : activeManager.removeScreen();
    activeManager = selectableManagers.get(newConfig);
    activeManager.makeScreen();
}
class ConfigConfigManager {
    constructor(buttonParent, screenParent) {
        this.managerType = enums_1.ManagerTypes.Main;
        this.selectable = false;
        this.displayed = false;
        this.buttonParent = buttonParent;
        this.screenParent = screenParent;
        this.saver = new configSaver_1.ConfigSaver("config");
    }
    saveConfig() {
        this.saver.saveConfig(JSON.stringify(Array.from(this.currentConfig.entries())));
    }
    makeScreen() {
        var _a;
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (this.screenElement == null) {
                try {
                    let cfgString = yield this.saver.loadConfig();
                    this.currentConfig = new Map(JSON.parse(cfgString));
                }
                catch (error) {
                    this.currentConfig = new Map();
                }
                for (const key of selectableManagers.keys()) {
                    this.screenElement = document.createElement("div");
                    if (key != enums_1.ManagerTypes.Main) {
                        let inp = document.createElement("input");
                        inp.type = "checkbox";
                        inp.name = key.toString() + "btn";
                        this.screenElement.appendChild(inp);
                        let lbl = document.createElement("label");
                        lbl.htmlFor = key.toString() + "btn";
                        lbl.innerHTML = "Eable " + key.toString() + " screen";
                        this.screenElement.appendChild(lbl);
                        Watcher.addToWatcher(inp, "change", (ev) => {
                            if (inp.checked && !selectableManagers.get(key).selectable) {
                                selectableManagers.get(key).makeButton();
                            }
                            else if (!inp.checked && selectableManagers.get(key).selectable) {
                                selectableManagers.get(key).removeButton();
                            }
                            this.currentConfig.set(key, inp.checked);
                        });
                        if ((_a = this.currentConfig) === null || _a === void 0 ? void 0 : _a.has(key)) {
                            inp.checked = this.currentConfig.get(key);
                            selectableManagers.get(key).makeButton();
                        }
                    }
                }
            }
            this.screenParent.appendChild(this.screenElement);
            this.displayed = true;
        });
    }
    removeScreen() {
        this.screenElement.remove();
        this.displayed = false;
    }
    makeButton() {
        if (this.buttonElement == null) {
            this.buttonElement = document.createElement("button");
            this.buttonElement.innerHTML = "Meta-Config";
            this.buttonElement.onclick = () => {
                changeToConfig(this.managerType);
            };
        }
        this.buttonParent.appendChild(this.buttonElement);
        this.selectable = true;
    }
    removeButton() {
        this.buttonElement.remove();
        this.selectable = false;
    }
}
class ServerPingConfigManager {
    constructor(buttonParent, screenParent) {
        // ##################
        this.managerType = enums_1.ManagerTypes.Ping;
        this.selectable = false;
        this.displayed = false;
        this.buttonParent = buttonParent;
        this.screenParent = screenParent;
        this.saver = new configSaver_1.ConfigSaver("ping_server");
    }
    saveConfig() {
        this.saver.saveConfig(this.formatTableDataToSaveData(this.configtable.tableCurrentValues));
    }
    formatTableDataToSaveData(tblData) {
        return tblData === null || tblData === void 0 ? void 0 : tblData.map((row) => {
            let a = new configSaver_1.ServerConfigData();
            a.serverName = row[0];
            a.serverIP = row[1];
            a.serverDomain = row[2];
            return a;
        });
    }
    formatSaveDataToTableData(saveData) {
        return saveData === null || saveData === void 0 ? void 0 : saveData.map((s) => {
            let server = Object.assign(new configSaver_1.ServerConfigData(), s);
            return [server.serverName, server.serverIP, server.serverDomain];
        });
    }
    makeScreen() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (this.configtable == null) {
                let defaultVals = null;
                try {
                    let savedata = yield this.saver.loadConfig();
                    defaultVals = this.formatSaveDataToTableData(savedata);
                }
                catch (error) { }
                this.configtable = new table_1.InputConfigTable(["Name", "IP", "Domain"], this.screenParent, defaultVals);
            }
            this.configtable.buildTable();
            this.displayed = true;
        });
    }
    removeScreen() {
        this.configtable.removeTable();
        this.displayed = false;
    }
    makeButton() {
        if (this.buttonElement == null) {
            this.buttonElement = document.createElement("button");
            this.buttonElement.innerHTML = "Ping-Config";
            this.buttonElement.onclick = () => {
                changeToConfig(this.managerType);
            };
        }
        this.buttonParent.appendChild(this.buttonElement);
        this.selectable = true;
    }
    removeButton() {
        this.buttonElement.remove();
        this.selectable = false;
    }
}
selectableManagers.set(enums_1.ManagerTypes.Main, new ConfigConfigManager(configButtonBar, configScreen));
selectableManagers.get(enums_1.ManagerTypes.Main).makeButton();
selectableManagers.set(enums_1.ManagerTypes.Ping, new ServerPingConfigManager(configButtonBar, configScreen));
//selectableManagers.get(ManagerTypes.Ping).makeButton();
changeToConfig(enums_1.ManagerTypes.Main);
//# sourceMappingURL=configRenderer.js.map