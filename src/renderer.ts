// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

import { ServerBox } from "./screens/PingBox";
import {Config, ServerData} from "./helpers/config"

let gridContainer : HTMLElement = document.getElementById("grid-container")!;
let pingCofig : Config<ServerData[]> = new Config("pingScreen");
let displayList: ServerBox[] = [];
let waitTime = (1) * 60 * 1000;



function clearPingBoxes(){
    displayList.forEach(element => {
        element.htmlRoot.remove();
    });
    displayList = [];
}

function drawPingBoxes(){
    clearPingBoxes();
    pingCofig.saveData.forEach(element => {
        let box = new ServerBox(element);
        displayList.push(box);

        // this is NOT a good way of dooing this
        box.makePingBox(gridContainer);
    });
}

async function initPingScreen() {
    await pingCofig.loadConfig();
    drawPingBoxes();
    refreshPingScreen();
}

function refreshPingScreen(){
    displayList.forEach(element => {
        element.updateScreen();
    });
}

initPingScreen();
setInterval(refreshPingScreen, waitTime);

