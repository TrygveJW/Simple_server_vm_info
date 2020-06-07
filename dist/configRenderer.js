"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
console.log(process.cwd())
const path = require('path');
console.log(path.resolve("./dist/helpers/table.js"))

const table_1 = require(path.resolve("./dist/helpers/table.js"));
//import {Config, ServerData} from "src/helpers/config"
let configtable = document.getElementById("config-table");
let tbl = new table_1.InputConfigTable(["a", "b"], configtable);
tbl.builTableDefaults();
//# sourceMappingURL=configRenderer.js.map