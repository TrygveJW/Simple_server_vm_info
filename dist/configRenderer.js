"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const table_1 = require("./helpers/table");
const EventWatcher_1 = require("./helpers/WoldsethUtils/EventWatcher");
//import {Config, ServerData} from "src/helpers/config"
let configBar = document.getElementById("config-bar");
let configscreen = document.getElementById("config-screen");
let configtable = document.getElementById("config-table");
let tbl = new table_1.InputConfigTable(["a", "b"], configtable);
tbl.buildTable();
let aa = document.createElement("button");
aa.innerHTML = "AAAAAAAAAAAAAAAAA";
aa.onclick = (jj) => {
    tbl.makeNewInputRow();
};
configscreen.appendChild(aa);
// ####################################################
var ManagerTypes;
(function (ManagerTypes) {
    ManagerTypes[ManagerTypes["Main"] = 0] = "Main";
    ManagerTypes[ManagerTypes["Ping"] = 1] = "Ping";
    ManagerTypes[ManagerTypes["Vm"] = 2] = "Vm";
})(ManagerTypes || (ManagerTypes = {}));
const Watcher = new EventWatcher_1.EventWatcher();
let activeManager;
let selectableManagers = new Map();
class ConfigConfigManager {
    constructor(buttonParent, screenParent) {
        this.buttonParent = buttonParent;
        this.screenParent = screenParent;
    }
    makeScreen() {
        for (const selector of selectableManagers.keys()) {
            //if (selector != ManagerTypes.Main){
            let inp = document.createElement("input");
            inp.type = "checkbox";
            inp.name = selector.toString() + "btn";
            this.screenParent.appendChild(inp);
            let lbl = document.createElement("label");
            lbl.htmlFor = selector.toString() + "btn";
            lbl.innerHTML = "Eable " + selector.toString() + " screen";
            this.screenParent.appendChild(lbl);
            Watcher.AddToWatcher(inp, "change", (ev) => {
                console.log(inp.checked);
            });
            //}
        }
    }
    removeScreen() {
        throw new Error("Method not implemented.");
    }
    makeButton() {
        if (this.buttonElement == null) {
            this.buttonElement = document.createElement("button");
            this.buttonElement.innerHTML = "Meta-Config";
            this.buttonElement.onclick = () => {
                changeToConfig(this);
            };
        }
        this.buttonParent.appendChild(this.buttonElement);
    }
    removeButton() {
        this.buttonElement.remove();
    }
}
class ServerPingConfigManager {
    makeScreen() {
        throw new Error("Method not implemented.");
    }
    removeScreen() {
        throw new Error("Method not implemented.");
    }
    makeButton() {
        throw new Error("Method not implemented.");
    }
    removeButton() {
        throw new Error("Method not implemented.");
    }
}
console.log(configBar, configscreen);
selectableManagers.set(ManagerTypes.Main, new ConfigConfigManager(configBar, configscreen));
selectableManagers.get(ManagerTypes.Main).makeScreen();
function makeConfigButtons() {
}
function saveConfigsToFiles() {
}
function changeToConfig(newConfig) {
    activeManager.removeScreen();
    activeManager = newConfig;
    newConfig.makeScreen();
}
//# sourceMappingURL=configRenderer.js.map