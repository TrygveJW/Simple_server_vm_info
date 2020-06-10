import "./WoldsethUtils/EventWatcher";
import { EventWatcher } from './WoldsethUtils/EventWatcher';
const Watcher = new EventWatcher();
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
export class InputConfigTable{
    private tableHeaders : string[];
    private _tableDefaultValues: string[][] = [];

    private rootElement: HTMLElement;
    private tableElement : HTMLTableElement;
    private _tableRows : HTMLInputElement[][] = [];


    constructor(headers: string[], parent: HTMLElement, defaults?: string[][]){
        this.tableHeaders = headers;
        this.rootElement = parent;
        this._tableDefaultValues = defaults || [];
    }

    public get tableCurrentValues(): string[][] {
        let ret: string[][] = [];
        this._tableRows.forEach(row => {
            // if every input feald is empty skip the column
            if (row.every((v) => v.value != "")){
                ret.push([...row].map((v) => v.value));
            }    
        });
        console.log(ret)
        return ret;
    }

    public get tableDefaultValues(): string[][] {
        return this._tableDefaultValues;
    }


    buildTable(){
        if (this.tableElement == null){
            this.tableElement = document.createElement("table") as HTMLTableElement;
            this.tableElement.id = "config-table";
            this.makeHeadRow();
            this.tableDefaultValues.forEach(row => {
                if (row.every((v) => v != "")){
                    this.makeNewInputRow(row);
                }
            });
            this.updateNumerOfRows();
        }

        this.rootElement.appendChild(this.tableElement);
    }

    removeTable(){
        this.tableElement.remove();
    }
    

    private updateNumerOfRows(){
        // if a row is empty remove it
        for (let index = this._tableRows.length - 2; index >= 0; index--) {
            if (this._tableRows[index].every((v) => v.value == "")){
                this._tableRows[index][0].parentElement.parentElement.remove();
                this._tableRows[index].forEach((elm) => {
                    Watcher.removeFromWatcher(elm);
                });
                let a = this._tableRows.splice(index, 1);
            }
            
        }
        
        if (this._tableRows.length == 0){
            // if there are none make one
            this.makeNewInputRow(null);
  
        } else if (this._tableRows[this._tableRows.length - 1 ].every((v) => v.value != "")){
            // if the last row is full add another
            this.makeNewInputRow(null);
        }

       
    }

    private makeHeadRow(){
        let hRow = document.createElement("tr") as HTMLTableRowElement
        this.tableHeaders.forEach(header => {
            let tableDtext = document.createElement("h2") as HTMLHeadingElement;
            tableDtext.innerHTML = header;

            let tableD = document.createElement("td") as HTMLTableDataCellElement;
            tableD.appendChild(tableDtext);
            hRow.appendChild(tableD);
        })
        this.tableElement.appendChild(hRow);
        
    }

    

    makeNewInputRow(rowValues?: string[]){
        let hRow = document.createElement("tr") as HTMLTableRowElement
        let newRowIndex = this._tableRows.length;
        this._tableRows[newRowIndex] = [];
        
        for (let n = 0; n < this.tableHeaders.length; n++) {
            let value : string = rowValues?.[n] || "";

            let tableDInput = document.createElement("input") as HTMLInputElement;
            tableDInput.value = value;
            this._tableRows[newRowIndex].push(tableDInput);
            
            Watcher.addToWatcher(tableDInput, "change", (ev) => {
                this.updateNumerOfRows();
            });

            let tableD = document.createElement("td") as HTMLTableDataCellElement;
            tableD.appendChild(tableDInput);
            hRow.appendChild(tableD);
        }
        this.tableElement.appendChild(hRow);
    }
}


