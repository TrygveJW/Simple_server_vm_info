"use strict";
// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const configSaver_1 = require("./helpers/configSaver");
let gridContainer = document.getElementById("grid-container");
let pingCofig = new configSaver_1.ConfigSaver("pingScreen");
let displayList = [];
let waitTime = (1) * 60 * 1000;
function clearPingBoxes() {
    displayList.forEach(element => {
        element.htmlRoot.remove();
    });
    displayList = [];
}
function drawPingBoxes() {
    clearPingBoxes();
    // pingCofig.saveData.forEach(element => {
    //     let box = new ServerBox(element);
    //     displayList.push(box);
    //     // this is NOT a good way of dooing this
    //     box.makePingBox(gridContainer);
    // });
}
function initPingScreen() {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        yield pingCofig.loadConfig();
        drawPingBoxes();
        refreshPingScreen();
    });
}
function refreshPingScreen() {
    displayList.forEach(element => {
        element.updateScreen();
    });
}
initPingScreen();
setInterval(refreshPingScreen, waitTime);
//# sourceMappingURL=renderer.js.map