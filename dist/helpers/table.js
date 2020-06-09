"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InputConfigTable = void 0;
require("./WoldsethUtils/EventWatcher");
const EventWatcher_1 = require("./WoldsethUtils/EventWatcher");
const Watcher = new EventWatcher_1.EventWatcher();
//
//  Husk alert når man forlate siden om man ønsker og lagre
//
// let configBar = document.getElementById("config-bar") as HTMLElement;
// let mainConfigButtton = document.createElement("button") as HTMLButtonElement;
// configBar.appendChild(mainConfigButtton);
/**
 * A quick way to have an expandable table that can accsept user input
 * that can be saved
 *
 * @class HtmlInputConfigTable
 */
class InputConfigTable {
    constructor(headers, parent, defaults) {
        this._tableCurrentValues = [];
        this._tableDefaultValues = [];
        this.hasChanged = false;
        this.tableRows = [];
        this.tableHeaders = headers;
        this.rootElement = parent;
        this._tableDefaultValues = defaults || [];
    }
    get tableCurrentValues() {
        return this._tableCurrentValues;
    }
    get tableDefaultValues() {
        return this._tableDefaultValues;
    }
    buildTable() {
        this.makeHeadRow();
        this.tableCurrentValues.forEach(row => {
            if (row.every((v) => v != "")) {
                this.makeNewInputRow(row);
            }
        });
        // if there are no values make an aditional column
        let currVLength = this.tableCurrentValues.length;
        if (currVLength == 0) {
            this.makeNewInputRow(null);
        }
        else {
            this.AddRowIfFullTable();
        }
    }
    AddRowIfFullTable() {
        if (this.tableCurrentValues[this.tableCurrentValues.length - 1].every((v) => v != "")) {
            console.log(this.tableCurrentValues[this.tableCurrentValues.length - 1]);
            this.makeNewInputRow(null);
        }
    }
    makeHeadRow() {
        let hRow = document.createElement("tr");
        this.tableHeaders.forEach(header => {
            let tableDtext = document.createElement("h2");
            tableDtext.innerHTML = header;
            let tableD = document.createElement("td");
            tableD.appendChild(tableDtext);
            hRow.appendChild(tableD);
        });
        this.rootElement.appendChild(hRow);
    }
    makeNewInputRow(rowValues) {
        let hRow = document.createElement("tr");
        let currRow = this.rootElement.children.length;
        console.log(this.rootElement.children.length);
        //let rowData: HTMLInputElement[] = [];
        this._tableCurrentValues[currRow] = [];
        let aa = (ev) => {
            console.log(ev.target);
            console.log(this._tableCurrentValues);
            console.log("aaaa");
        };
        for (let n = 0; n < this.tableHeaders.length; n++) {
            let value = (rowValues === null || rowValues === void 0 ? void 0 : rowValues[n]) || "";
            let tableDInput = document.createElement("input");
            //this.lookup.set(tableDInput, [currRow, n])
            tableDInput.value = value;
            //rowData.push(tableDInput);
            Watcher.AddToWatcher(tableDInput, "change", (ev) => {
                this.tableCurrentValues[currRow][n] = tableDInput.value;
                this.hasChanged = true;
                this.AddRowIfFullTable();
            });
            tableDInput.addEventListener("change", (ev) => {
                this.tableCurrentValues[currRow][n] = tableDInput.value;
                this.hasChanged = true;
                this.AddRowIfFullTable();
            });
            this.tableCurrentValues[currRow][n] = tableDInput.value;
            let tableD = document.createElement("td");
            tableD.appendChild(tableDInput);
            hRow.appendChild(tableD);
        }
        //this.tableRows.push(rowData);
        this.rootElement.appendChild(hRow);
    }
}
exports.InputConfigTable = InputConfigTable;
//# sourceMappingURL=table.js.map