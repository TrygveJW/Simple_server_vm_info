import electron  from "electron";
import fs from "fs"; 

export class Config<T>{
    configFP: string;
    saveData: T;

    constructor(configName: string) {
        console.log((electron.app || electron.remote.app).getPath('userData'));
        this.configFP = (electron.app || electron.remote.app).getPath('userData') + configName + "cfg";
    }
    
    async loadConfig(){
        try {
            let ret = await fs.promises.readFile(this.configFP);
            
            this.saveData = JSON.parse(ret.toString()) as T;
        } catch (error) {}

    }

    async saveConfig(){
        try {
            fs.promises.writeFile(this.configFP, JSON.stringify(this.saveData));
        } catch (error) {}
    }

}

export class ServerData{
    serverName: string;
    serverIP : string;
    serverDomain : string;

    constructor(name: string, ip :string, domain:string) {
        this.serverName = name;
        this.serverIP = ip;
        this.serverDomain = domain;
    }
}
