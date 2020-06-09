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

export class ServerConfigData{
    private _serverName: string;
    private _serverIP: string;
    private _serverDomain: string;

    public get serverName(): string {
        return this._serverName;
    }

    public get serverIP(): string {
        return this._serverIP;
    }

    public get serverDomain(): string {
        return this._serverDomain;
    }


    constructor(name: string, ip :string, domain:string) {
        this._serverName = name;
        this._serverIP = ip;
        this._serverDomain = domain;
    }
}

export class ConfigConfigData{
    private _showPingScreen: boolean;
    private _showVMScreen: boolean;

    public get showVMScreen(): boolean {
        return this._showVMScreen;
    }

    public get showPingScreen(): boolean {
        return this._showPingScreen;
    }

    constructor (showvm: boolean, showPing: boolean){
        this._showPingScreen = showPing;
        this._showVMScreen = showvm;
    }

    
 
    
}