"use strict";
//
//  Husk alert når man forlate siden om man ønsker og lagre
//
let configBar = document.getElementById("config-bar");
let mainConfigButtton = document.createElement("button");
configBar.appendChild(mainConfigButtton);
/**
 * A quick way to have an expandable table that can accsept user input
 * that can be saved
 *
 * @class HtmlInputConfigTable
 */
class HtmlInputConfigTable {
    constructor(headers, parent, defaults) {
        this.tableCurrentValues = [[]];
        this.tableDefaultValues = [[]];
        this.hasChanged = false;
        this.lookup = new Map();
        this.tableHeaders = headers;
        this.rootElement = parent;
        this.tableDefaultValues = defaults || [[]];
    }
    builTableDefaults() {
        this.makeHeadRow();
    }
    parseTableValues() {
        let ret = [[]];
        this.tableRows.forEach(row => {
            let rowData = [];
            row.forEach(inputElm => {
                rowData.push(inputElm.value);
            });
            ret.push(rowData);
        });
        return ret;
    }
    makeHeadRow() {
        var _a;
        let hRow = document.createElement("tr");
        this.tableHeaders.forEach(header => {
            let tableDtext = document.createElement("h2");
            tableDtext.innerHTML = header;
            let tableD = document.createElement("td");
            tableD.appendChild(tableDtext);
            hRow.appendChild(tableD);
        });
        (_a = this.tableElement) === null || _a === void 0 ? void 0 : _a.appendChild(hRow);
    }
    makeNewInputRow(rowValues) {
        //let  = defaults || Array.apply(null,Array(this.tableHeaders.length).map(_ => ""));
        let hRow = document.createElement("tr");
        let rowData = [];
        let currCol = this.tableRows.length;
        for (let n = 0; n < rowValues.length; n++) {
            let value = (rowValues === null || rowValues === void 0 ? void 0 : rowValues[n]) || "";
            let tableDInput = document.createElement("input");
            this.lookup.set(tableDInput, [currCol, n]);
            tableDInput.value = value;
            tableDInput.onchange = this.handleChange;
            rowData.push(tableDInput);
            let tableD = document.createElement("td");
            tableD.appendChild(tableDInput);
            hRow.appendChild(tableD);
        }
        this.tableRows.push(rowData);
    }
    handleChange(e) {
        let newValue = e.returnValue;
        let elm = e.target;
        console.log(elm);
        console.log(this.lookup.get(elm));
        console.log(newValue);
    }
}
//# sourceMappingURL=main.js.map