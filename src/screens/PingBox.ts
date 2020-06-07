import ping from "ping";
import dns from 'dns';

import {ServerStatus} from "./../helpers/enums"
import {ServerData} from "./../helpers/config"

export class ServerBox {
    private name: string;
    private ip: string;
    private domain : string;
    
    private status :ServerStatus = ServerStatus.NO_INTERNET;

    htmlRoot : HTMLElement = null;
    private statusText :HTMLHeadingElement = null
    private statusBox : HTMLElement = null


    private pingOK: boolean = false;
    private domainOk: boolean = false;

    constructor(server: ServerData) {
        this.name = server.serverName;
        this.ip = server.serverIP;
        this.domain = server.serverDomain;
    }

    updateScreen(){
        this.checkDomainStatus();
        this.checkPingStatus();
    }

    private async checkDomainStatus(){
        try {
            let res = await dns.promises.resolve4(this.domain);
            this.domainOk = res.includes(this.ip);
            
        } catch(err){
            //TODO:Maby this only will trigger when no internett
            this.domainOk = false;
        }
        this.updateDisplayedStatus()
    }

    private async checkPingStatus(){
        
        try {
            //TODO:verefy this will stopp somtime when no answer
            let res = await ping.promise.probe(this.ip, {timeout: 10})
            this.pingOK = res.alive;
        } catch (error) {
            this.pingOK = false;
        }
    }

    private updateDisplayedStatus(){
        let newStatus :ServerStatus;
        if (this.pingOK){
            if (this.domainOk){
                newStatus = ServerStatus.ONLINE;
            } else {
                newStatus = ServerStatus.DOMAIN_ERROR;
            }
        } else{
            newStatus = ServerStatus.OFFLINE;
        }


        switch(newStatus) {
            case ServerStatus.ONLINE:
                this.statusBox.style.background = "rgba(0,255,0)"
                this.statusText.innerHTML = "ONLINE"
                break;
            case ServerStatus.OFFLINE:
                this.statusBox.style.background = "rgba(255,0,0)"
                this.statusText.innerHTML = "OFFLINE"
                break;
            // case ServerStatus.NO_INTERNET:
            //     this.statusBox.style.background = "rgba(0,0,0)"
            //     this.statusText.innerHTML = "NO INTERNET"
            //     break;
            case ServerStatus.DOMAIN_ERROR:
                this.statusBox.style.background = "rgba(0,0,255)"
                this.statusText.innerHTML = "DOMAIN ERROR"
                break;
            default:
              // code block
        } 
    }

    makePingBox(parent : HTMLElement): void {
        // make the grid box
        let rootElent : HTMLElement = document.createElement("div");
        rootElent.className = 'grid-item';
        this.htmlRoot = rootElent;
        parent.appendChild(rootElent)

        // make the server info box #################
        let serverInf : HTMLElement = document.createElement("div");
        serverInf.className = 'server-info';
        this.htmlRoot.appendChild(serverInf);

        


        let infTypes : HTMLElement = document.createElement("div");
        infTypes.className = 'types';
        serverInf.appendChild(infTypes);

        let infoH1 : HTMLHeadingElement = document.createElement("h2");
        infoH1.innerHTML = "Server";
        infTypes.appendChild(infoH1);

        let infoH2 : HTMLHeadingElement = document.createElement("h2");
        infoH2.innerHTML = "IP";
        infTypes.appendChild(infoH2);

        let infoH3 : HTMLHeadingElement = document.createElement("h2");
        infoH3.innerHTML = "Domain";
        infTypes.appendChild(infoH3);

        

        let col : HTMLElement = document.createElement("div");
        serverInf.appendChild(col);
        for (let n = 0; n < 3; n++) {
            let tmp = document.createElement("h2");
            tmp.innerHTML = ":";
            col.appendChild(tmp);
        }
        



        let infvalues : HTMLElement = document.createElement("div");
        infvalues.className = 'values';
        serverInf.appendChild(infvalues);

        let valuesH1 : HTMLHeadingElement = document.createElement("h2");
        valuesH1.innerHTML = this.name;
        infvalues.appendChild(valuesH1);

        let valuesH2 : HTMLHeadingElement = document.createElement("h2");
        valuesH2.innerHTML = this.ip;
        infvalues.appendChild(valuesH2);

        let valuesH3 : HTMLHeadingElement = document.createElement("h2");
        valuesH3.innerHTML = this.domain;
        infvalues.appendChild(valuesH3);



        //#########################
        let serverStatus : HTMLElement = document.createElement("div");
        serverStatus.className = 'server-status';
        this.statusBox = serverStatus
        this.htmlRoot.appendChild(serverStatus);


        let statusH1 : HTMLHeadingElement = document.createElement("h1");
        statusH1.innerHTML = "STATUS";
        serverStatus.appendChild(statusH1);

        let statusH2 : HTMLHeadingElement = document.createElement("h1");
        statusH2.innerHTML = "NOT SET";
        this.statusText = statusH2;
        serverStatus.appendChild(statusH2);

    }
}
