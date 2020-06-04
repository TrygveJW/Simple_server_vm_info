import ping from "ping";


export function genPingScreen() : void{
    let gridC : HTMLElement = document.getElementById("grid-container")!;

    let toClone : ChildNode = document.getElementById("ping-server-1")!;

    for (let index = 2; index <= 6; index++) {
        console.log("AAAAAAAAAA");
        let aaa :HTMLElement = toClone.cloneNode(true) as HTMLElement
        //aaa.getRootNode. .id = "ping-server-{index}";
        let r = gridC.appendChild(aaa);
        
        
        
        console.log(r);
    }
}

enum ServerStatus {
    OFFLINE,
    ONLINE,
    NO_INTERNET,
}

class PingServer {
    name: string;
    ip: string;
    mac : string;
    status :ServerStatus = ServerStatus.NO_INTERNET;

    htmlRoot: HTMLHtmlElement;
    statusText :HTMLHeadingElement;
    statusBox : HTMLHtmlElement;

    constructor(name: string, ip : string) {
        this.name = name;
        this.ip = ip;
    }

    makePingBox(parent : HTMLElement): void {
        let rootElent : HTMLElement = new HTMLElement();

    }
}
