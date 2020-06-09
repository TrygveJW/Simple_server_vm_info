
import { InputConfigTable } from "./helpers/table";

import { ServerConfigData, ConfigConfigData} from "./helpers/config"
import { EventWatcher } from './helpers/WoldsethUtils/EventWatcher';
//import {Config, ServerData} from "src/helpers/config"



let configBar = document.getElementById("config-bar") as HTMLElement;
let configscreen = document.getElementById("config-screen") as HTMLElement;

let configtablee = document.getElementById("config-table") as HTMLElement;




// ####################################################

enum ManagerTypes{
    Main,
    Ping,
    Vm,
}

const Watcher = new EventWatcher();
let activeManager: ConfigManager
let selectableManagers: Map<ManagerTypes,ConfigManager> = new Map<ManagerTypes, ConfigManager>()


interface ConfigManager{
    selectable: boolean;
    displayed: boolean;

    makeScreen(): void;
    removeScreen():void;

    makeButton(): void;
    removeButton():void;
}

class ConfigConfigManager implements ConfigManager{
    selectable: boolean;
    displayed: boolean;

    makeScreen(): void {
        for (const selector of selectableManagers.keys()) {
            if (this.screenElement == null){
                this.screenElement = document.createElement("div");
                if (selector != ManagerTypes.Main){
                    let inp = document.createElement("input") as HTMLInputElement;
                    inp.type = "checkbox";
                    inp.name = selector.toString() + "btn";
                    this.screenElement.appendChild(inp);

                    let lbl = document.createElement("label") as HTMLLabelElement;
                    lbl.htmlFor = selector.toString() + "btn";
                    lbl.innerHTML = "Eable " + selector.toString() + " screen";
                    this.screenElement.appendChild(lbl);

                    Watcher.AddToWatcher(inp, "change", (ev) => {
                        console.log(inp.checked);
                    })
                }
            }
            this.screenParent.appendChild(this.screenElement);
        }
    }
    removeScreen(): void {
        throw new Error("Method not implemented.");
    }
    makeButton(): void {
        if (this.buttonElement == null){
            this.buttonElement = document.createElement("button");
            this.buttonElement.innerHTML = "Meta-Config";
            this.buttonElement.onclick = () =>{
            changeToConfig(this);
            }
        }
        this.buttonParent.appendChild(this.buttonElement);
        

    }
    removeButton(): void {
        this.buttonElement.remove();
    }

    // ##################
    private buttonParent: HTMLElement;
    private screenParent: HTMLElement;

    private buttonElement: HTMLButtonElement;
    private screenElement: HTMLElement;

    constructor(buttonParent: HTMLElement, screenParent: HTMLElement){
        this.buttonParent = buttonParent;
        this.screenParent = screenParent;
    }



}

class ServerPingConfigManager implements ConfigManager{
    selectable: boolean;
    displayed: boolean;

    makeScreen(): void {
        this.configtable.buildTable();
    }
    removeScreen(): void {
        
    }
    makeButton(): void {
        if (this.buttonElement == null){
            this.buttonElement = document.createElement("button");
            this.buttonElement.innerHTML = "Ping-Config";
            this.buttonElement.onclick = () =>{
            changeToConfig(this);
            }
        }
        this.buttonParent.appendChild(this.buttonElement);
        

    }
    removeButton(): void {
        this.buttonElement.remove();
    }

    // ##################
    private buttonParent: HTMLElement;
    private screenParent: HTMLElement;

    private buttonElement: HTMLButtonElement;
    private screenElement: HTMLElement;

    private configtable: InputConfigTable;

    constructor(buttonParent: HTMLElement, screenParent: HTMLElement){
        this.buttonParent = buttonParent;
        this.screenParent = screenParent;
        this.configtable = new InputConfigTable(["Name", "Ping", "Domain"], configtablee);
    }

}

console.log(configBar, configscreen)
selectableManagers.set(ManagerTypes.Main, new ConfigConfigManager(configBar, configscreen));
selectableManagers.get(ManagerTypes.Main).makeScreen();

function makeConfigButtons(){

}

function saveConfigsToFiles(){

}

function changeToConfig(newConfig: ConfigManager){
    activeManager.removeScreen();
    activeManager = newConfig;
    newConfig.makeScreen();

}
