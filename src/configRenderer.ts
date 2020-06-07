
import { InputConfigTable } from "helpers/table";
//import {Config, ServerData} from "src/helpers/config"



let configtable = document.getElementById("config-table") as HTMLElement;

let tbl = new InputConfigTable(["a", "b"], configtable);
tbl.builTableDefaults();