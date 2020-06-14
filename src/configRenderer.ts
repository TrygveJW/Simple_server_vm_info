
import { InputConfigTable } from "./helpers/table";

import { ServerConfigData, ConfigSaver} from "./helpers/configSaver"
import { EventWatcher } from './helpers/WoldsethUtils/EventWatcher';
import { ManagerTypes} from './helpers/enums'
import { PingConfig } from 'ping';
import { webContents } from 'electron';


const { dialog } = require('electron').remote
//import {Config, ServerData} from "src/helpers/config"








// ####################################################



let configButtonBar = document.getElementById("config-bar") as HTMLElement;
let configScreen = document.getElementById("config-screen") as HTMLElement;

const Watcher = new EventWatcher();
let activeManager: ConfigManager
let selectableManagers: Map<ManagerTypes,ConfigManager> = new Map<ManagerTypes, ConfigManager>()


interface ConfigManager{
    managerType : ManagerTypes;
    selectable: boolean;
    displayed: boolean;

    makeScreen(): void;
    removeScreen():void;

    makeButton(): void;
    removeButton():void;

    saveConfig(): void;
}


export function saveConfigsToFiles(){
    for (const mang of selectableManagers.values()) {
        mang.saveConfig();
    }
}

const dialogOptions = {
    type: 'question',
    buttons: ["yes", "no"],
    title: 'Question',
    message: 'Save changes?'

}
window.addEventListener("beforeunload", (ev) => {
    ev.preventDefault();
    let index = dialog.showMessageBoxSync(null, dialogOptions);
    if (index == 0){
        saveConfigsToFiles();
    }
    window.close()
}, false)

function changeToConfig(newConfig: ManagerTypes){
    activeManager?.removeScreen();
    activeManager = selectableManagers.get(newConfig);
    activeManager.makeScreen();
    
}

class ConfigConfigManager implements ConfigManager{
    private buttonParent: HTMLElement;
    private screenParent: HTMLElement;

    private buttonElement: HTMLButtonElement;
    private screenElement: HTMLElement;

    managerType: ManagerTypes = ManagerTypes.Main;
    selectable: boolean = false;
    displayed: boolean = false;

    private saver: ConfigSaver<string>;
    private currentConfig: Map<ManagerTypes,boolean>;

    constructor(buttonParent: HTMLElement, screenParent: HTMLElement){
        this.buttonParent = buttonParent;
        this.screenParent = screenParent;
        this.saver = new ConfigSaver("config");
    }

    saveConfig(){
        this.saver.saveConfig(JSON.stringify(Array.from(this.currentConfig.entries())));
    }
    
    async makeScreen() {
        if (this.screenElement == null){

            try {
                let cfgString = await this.saver.loadConfig();
                this.currentConfig = new Map<ManagerTypes, boolean>(JSON.parse(cfgString))
            } catch (error) {
                this.currentConfig = new Map<ManagerTypes,boolean>();
            }

            for (const key of selectableManagers.keys()) {
                this.screenElement = document.createElement("div");
                if (key != ManagerTypes.Main){
                    let inp = document.createElement("input") as HTMLInputElement;
                    inp.type = "checkbox";
                    inp.name = key.toString() + "btn";
                    this.screenElement.appendChild(inp);

                    let lbl = document.createElement("label") as HTMLLabelElement;
                    lbl.htmlFor = key.toString() + "btn";
                    lbl.innerHTML = "Eable " + key.toString() + " screen";
                    this.screenElement.appendChild(lbl);

                    Watcher.addToWatcher(inp, "change", (ev) => {
                        if (inp.checked && !selectableManagers.get(key).selectable){
                            selectableManagers.get(key).makeButton();
                        } else if (!inp.checked && selectableManagers.get(key).selectable){
                            selectableManagers.get(key).removeButton();
                        }
                        this.currentConfig.set(key, inp.checked);
                    })
                    if (this.currentConfig?.has(key)){
                        inp.checked = this.currentConfig.get(key);
                        selectableManagers.get(key).makeButton();
                    }

                }
            }
        }
        this.screenParent.appendChild(this.screenElement);
        this.displayed = true;
    }

    removeScreen(): void {
        this.screenElement.remove();
        this.displayed = false;
    }

    makeButton(): void {
        if (this.buttonElement == null){
            this.buttonElement = document.createElement("button");
            this.buttonElement.innerHTML = "Meta-Config";
            this.buttonElement.onclick = () =>{
            changeToConfig(this.managerType);
            }
        }
        this.buttonParent.appendChild(this.buttonElement);
        this.selectable = true;

    }
    removeButton(): void {
        this.buttonElement.remove();
        this.selectable = false
    }
}



class ServerPingConfigManager implements ConfigManager{
    
    private buttonParent: HTMLElement;
    private screenParent: HTMLElement;

    private buttonElement: HTMLButtonElement;
    private screenElement: HTMLElement;

    private configtable: InputConfigTable;

    private saver: ConfigSaver<ServerConfigData[]>;

    constructor(buttonParent: HTMLElement, screenParent: HTMLElement){
        this.buttonParent = buttonParent;
        this.screenParent = screenParent;
        this.saver = new ConfigSaver("ping_server");

        
    }

    saveConfig(){
        this.saver.saveConfig(this.formatTableDataToSaveData(this.configtable.tableCurrentValues));
    }

    // ##################
    managerType: ManagerTypes = ManagerTypes.Ping;
    selectable: boolean = false;
    displayed: boolean = false;

    private formatTableDataToSaveData(tblData:  string[][]): ServerConfigData[]{
        return tblData?.map((row) => {
            let a = new ServerConfigData();
            a.serverName = row[0];
            a.serverIP = row[1];
            a.serverDomain = row[2];
            return a;
        });
    }

    private formatSaveDataToTableData(saveData: ServerConfigData[]): string[][]{
        return saveData?.map((s) => {
            let server = Object.assign(new ServerConfigData(), s)
            return [server.serverName, server.serverIP, server.serverDomain];
        })

        
    }

    
    async makeScreen() {
        if (this.configtable == null){
            let defaultVals = null;
            try {
                let savedata = await this.saver.loadConfig();
                defaultVals = this.formatSaveDataToTableData(savedata);
            } catch (error) {}

            this.configtable = new InputConfigTable(["Name", "IP", "Domain"], this.screenParent, defaultVals);
        }

        this.configtable.buildTable();
        this.displayed = true;
    }

    removeScreen(): void {
        this.configtable.removeTable();
        this.displayed = false;
    }

    makeButton(): void {
        if (this.buttonElement == null){
            this.buttonElement = document.createElement("button");
            this.buttonElement.innerHTML = "Ping-Config";
            this.buttonElement.onclick = () =>{
            changeToConfig(this.managerType);
            }
        }
        this.buttonParent.appendChild(this.buttonElement);
        this.selectable = true;
        

    }
    removeButton(): void {
        this.buttonElement.remove();
        this.selectable = false;
    }

    

}


selectableManagers.set(ManagerTypes.Main, new ConfigConfigManager(configButtonBar, configScreen));
selectableManagers.get(ManagerTypes.Main).makeButton();

selectableManagers.set(ManagerTypes.Ping, new ServerPingConfigManager(configButtonBar, configScreen));
//selectableManagers.get(ManagerTypes.Ping).makeButton();


changeToConfig(ManagerTypes.Main);
