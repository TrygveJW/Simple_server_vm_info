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
        this._tableDefaultValues = [];
        this._tableRows = [];
        this.tableHeaders = headers;
        this.rootElement = parent;
        this._tableDefaultValues = defaults || [];
    }
    get tableCurrentValues() {
        let ret = [];
        this._tableRows.forEach(row => {
            // if every input feald is empty skip the column
            if (row.every((v) => v.value != "")) {
                ret.push([...row].map((v) => v.value));
            }
        });
        console.log(ret);
        return ret;
    }
    get tableDefaultValues() {
        return this._tableDefaultValues;
    }
    buildTable() {
        if (this.tableElement == null) {
            this.tableElement = document.createElement("table");
            this.tableElement.id = "config-table";
            this.makeHeadRow();
            this.tableDefaultValues.forEach(row => {
                if (row.every((v) => v != "")) {
                    this.makeNewInputRow(row);
                }
            });
            this.updateNumerOfRows();
        }
        this.rootElement.appendChild(this.tableElement);
    }
    removeTable() {
        this.tableElement.remove();
    }
    updateNumerOfRows() {
        // if a row is empty remove it
        for (let index = this._tableRows.length - 2; index >= 0; index--) {
            if (this._tableRows[index].every((v) => v.value == "")) {
                this._tableRows[index][0].parentElement.parentElement.remove();
                this._tableRows[index].forEach((elm) => {
                    Watcher.removeFromWatcher(elm);
                });
                let a = this._tableRows.splice(index, 1);
            }
        }
        if (this._tableRows.length == 0) {
            // if there are none make one
            this.makeNewInputRow(null);
        }
        else if (this._tableRows[this._tableRows.length - 1].every((v) => v.value != "")) {
            // if the last row is full add another
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
        this.tableElement.appendChild(hRow);
    }
    makeNewInputRow(rowValues) {
        let hRow = document.createElement("tr");
        let newRowIndex = this._tableRows.length;
        this._tableRows[newRowIndex] = [];
        for (let n = 0; n < this.tableHeaders.length; n++) {
            let value = (rowValues === null || rowValues === void 0 ? void 0 : rowValues[n]) || "";
            let tableDInput = document.createElement("input");
            tableDInput.value = value;
            this._tableRows[newRowIndex].push(tableDInput);
            Watcher.addToWatcher(tableDInput, "change", (ev) => {
                this.updateNumerOfRows();
            });
            let tableD = document.createElement("td");
            tableD.appendChild(tableDInput);
            hRow.appendChild(tableD);
        }
        this.tableElement.appendChild(hRow);
    }
}
exports.InputConfigTable = InputConfigTable;
//# sourceMappingURL=table.js.map