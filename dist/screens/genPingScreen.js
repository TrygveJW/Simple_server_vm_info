"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.genPingScreen = void 0;
function genPingScreen() {
    let gridC = document.getElementById("grid-container");
    let toClone = document.getElementById("ping-server-1");
    for (let index = 2; index <= 6; index++) {
        console.log("AAAAAAAAAA");
        let aaa = toClone.cloneNode(true);
        //aaa.getRootNode. .id = "ping-server-{index}";
        let r = gridC.appendChild(aaa);
        console.log(r);
    }
}
exports.genPingScreen = genPingScreen;
var ServerStatus;
(function (ServerStatus) {
    ServerStatus[ServerStatus["OFFLINE"] = 0] = "OFFLINE";
    ServerStatus[ServerStatus["ONLINE"] = 1] = "ONLINE";
    ServerStatus[ServerStatus["NO_INTERNET"] = 2] = "NO_INTERNET";
})(ServerStatus || (ServerStatus = {}));
class PingServer {
    constructor(name, ip) {
        this.status = ServerStatus.NO_INTERNET;
        this.name = name;
        this.ip = ip;
    }
    makePingBox(parent) {
        let rootElent = new HTMLElement();
    }
}
//# sourceMappingURL=genPingScreen.js.map