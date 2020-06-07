"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.genPingScreen = exports.Config = void 0;
const tslib_1 = require("tslib");
const ping_1 = tslib_1.__importDefault(require("ping"));
const dns_1 = tslib_1.__importDefault(require("dns"));
const electron_1 = tslib_1.__importDefault(require("electron"));
const fs_1 = tslib_1.__importDefault(require("fs"));
class serverData {
    constructor(name, ip, domain) {
        this.serverName = name;
        this.serverIP = ip;
        this.serverDomain = domain;
    }
}
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
function genPingScreen() {
    let gridC = document.getElementById("grid-container");
    for (let index = 1; index <= 6; index++) {
        let s = new serverData("name", "ipaddr", "domain");
        let ps = new PingServer(s);
        ps.makePingBox(gridC);
        let toClone = document.getElementById("ping-server-1");
    }
}
exports.genPingScreen = genPingScreen;
class PingScreen {
    constructor() {
    }
    getConfig() {
    }
}
class PingServer {
    constructor(server) {
        this.status = ServerStatus.NO_INTERNET;
        this.htmlRoot = null;
        this.statusText = null;
        this.statusBox = null;
        this.pingOK = false;
        this.domainOk = false;
        this.name = server.serverName;
        this.ip = server.serverIP;
        this.domain = server.serverDomain;
    }
    updateScreen() {
        this.checkDomainStatus();
        this.checkPingStatus();
    }
    checkDomainStatus() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                let res = yield dns_1.default.promises.resolve4(this.domain);
                this.domainOk = res.includes(this.ip);
            }
            catch (err) {
                //TODO:Maby this only will trigger when no internett
                this.domainOk = false;
            }
            this.updateDisplayedStatus();
        });
    }
    checkPingStatus() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                //TODO:verefy this will stopp somtime when no answer
                let res = yield ping_1.default.promise.probe(this.ip, { timeout: 10 });
                this.pingOK = res.alive;
            }
            catch (error) {
                this.pingOK = false;
            }
        });
    }
    updateDisplayedStatus() {
        let newStatus;
        if (this.pingOK) {
            if (this.domainOk) {
                newStatus = ServerStatus.ONLINE;
            }
            else {
                newStatus = ServerStatus.DOMAIN_ERROR;
            }
        }
        else {
            newStatus = ServerStatus.OFFLINE;
        }
        switch (newStatus) {
            case ServerStatus.ONLINE:
                this.statusBox.style.background = "rgba(0,255,0)";
                this.statusText.innerHTML = "ONLINE";
                break;
            case ServerStatus.OFFLINE:
                this.statusBox.style.background = "rgba(255,0,0)";
                this.statusText.innerHTML = "OFFLINE";
                break;
            // case ServerStatus.NO_INTERNET:
            //     this.statusBox.style.background = "rgba(0,0,0)"
            //     this.statusText.innerHTML = "NO INTERNET"
            //     break;
            case ServerStatus.DOMAIN_ERROR:
                this.statusBox.style.background = "rgba(0,0,255)";
                this.statusText.innerHTML = "DOMAIN ERROR";
                break;
            default:
            // code block
        }
    }
    makePingBox(parent) {
        // make the grid box
        let rootElent = document.createElement("div");
        rootElent.className = 'grid-item';
        this.htmlRoot = rootElent;
        parent.appendChild(rootElent);
        // make the server info box #################
        let serverInf = document.createElement("div");
        serverInf.className = 'server-info';
        this.htmlRoot.appendChild(serverInf);
        let infTypes = document.createElement("div");
        infTypes.className = 'types';
        serverInf.appendChild(infTypes);
        let infoH1 = document.createElement("h2");
        infoH1.innerHTML = "Server";
        infTypes.appendChild(infoH1);
        let infoH2 = document.createElement("h2");
        infoH2.innerHTML = "IP";
        infTypes.appendChild(infoH2);
        let infoH3 = document.createElement("h2");
        infoH3.innerHTML = "Domain";
        infTypes.appendChild(infoH3);
        let col = document.createElement("div");
        serverInf.appendChild(col);
        for (let n = 0; n < 3; n++) {
            let tmp = document.createElement("h2");
            tmp.innerHTML = ":";
            col.appendChild(tmp);
        }
        let infvalues = document.createElement("div");
        infvalues.className = 'values';
        serverInf.appendChild(infvalues);
        let valuesH1 = document.createElement("h2");
        valuesH1.innerHTML = this.name;
        infvalues.appendChild(valuesH1);
        let valuesH2 = document.createElement("h2");
        valuesH2.innerHTML = this.ip;
        infvalues.appendChild(valuesH2);
        let valuesH3 = document.createElement("h2");
        valuesH3.innerHTML = this.domain;
        infvalues.appendChild(valuesH3);
        //#########################
        let serverStatus = document.createElement("div");
        serverStatus.className = 'server-status';
        this.statusBox = serverStatus;
        this.htmlRoot.appendChild(serverStatus);
        let statusH1 = document.createElement("h1");
        statusH1.innerHTML = "STATUS";
        serverStatus.appendChild(statusH1);
        let statusH2 = document.createElement("h1");
        statusH2.innerHTML = "NOT SET";
        this.statusText = statusH2;
        serverStatus.appendChild(statusH2);
    }
}
//# sourceMappingURL=genPingScreen.js.map