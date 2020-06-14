import electron  from "electron";
import fs, { exists } from "fs"; 

import { ManagerTypes} from './enums'


export class ConfigSaver<T>{
    private configDir: string;
    private configFP: string;
    private dirName = "monitor_app"

    constructor(configName: string){
        this.configDir = `${(electron.app || electron.remote.app).getPath('userData')}/${this.dirName}`;
        this.configFP = this.configDir + `/${configName}.cfg`;
        this.makeSaveDir();
        
    }

    makeSaveDir(){
        let exists = fs.existsSync(this.configDir);
        if (!exists){
            fs.promises.mkdir(this.configDir);
        }
    }
    
    /**
     * Tries to load the spesefied config type from the configfile with the config name
     * if no file is found null is returned
     *
     * @returns {Promise<T>} 
     * @memberof ConfigSaver
     */
    async loadConfig(): Promise<T>{
        let saveData = null;
        try {
            let ret = await fs.promises.readFile(this.configFP);
            
            saveData = JSON.parse(ret.toString());
            return saveData;
        } catch (error) {}
    }

    /**
     *
     *
     * @param {T} saveData
     * @returns {Promise<boolean>}
     * @memberof ConfigSaver
     */
    async saveConfig(saveData: T): Promise<boolean>{
        try {
            console.log(saveData)
            fs.promises.writeFile(this.configFP, JSON.stringify(saveData));
            return true;
        } catch (error) {
            return false;
        }
    }
}

export class ServerConfigData{
    serverName: string;
    serverIP: string;
    serverDomain: string;
}

// export class ConfigConfigData{
//     private _showPingScreen: boolean;
//     private _showVMScreen: boolean;

//     public get showVMScreen(): boolean {
//         return this._showVMScreen;
//     }

//     public get showPingScreen(): boolean {
//         return this._showPingScreen;
//     }

//     public UpdateConfigValue(type : ManagerTypes, value:Boolean){

//     }

//     constructor (showvm: boolean, showPing: boolean){
//         this._showPingScreen = showPing;
//         this._showVMScreen = showvm;
//     }

    
 
    
// }