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
    private _tableCurrentValues: string[][] = [];
    private _tableDefaultValues: string[][] = [];
    

    private hasChanged : boolean = false;

    private rootElement: HTMLElement;
    private tableElement : HTMLTableElement;
    private tableRows : Array<Array<HTMLInputElement>> = [];
    //lookup : Map<HTMLInputElement, Number[]> = new Map<HTMLInputElement, Number[]>();


    constructor(headers: string[], parent: HTMLElement)
    constructor(headers: string[], parent: HTMLElement, defaults?: [string[]]){
        this.tableHeaders = headers;
        this.rootElement = parent;
        this._tableDefaultValues = defaults || [];
    }

    public get tableCurrentValues(): string[][] {
        return this._tableCurrentValues;
    }

    public get tableDefaultValues(): string[][] {
        return this._tableDefaultValues;
    }


    buildTable(){
        Watcher.removeAll(); // this is not ideal but it wil hinder a memory leak
        this.makeHeadRow();
        this.tableCurrentValues.forEach(row => {
            if (row.every((v) => v != "")){
                this.makeNewInputRow(row);
            }
            
        });

        // if there are no values make an aditional column
        let currVLength = this.tableCurrentValues.length;
        if (currVLength == 0){
            this.makeNewInputRow(null);
        } else {
            this.AddRowIfFullTable();
        }
        
    }

    private AddRowIfFullTable(){
        if (this.tableCurrentValues[this.tableCurrentValues.length - 1 ].every((v) => v != "")){
            console.log(this.tableCurrentValues[this.tableCurrentValues.length - 1 ])
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
        this.rootElement.appendChild(hRow);
        
    }

    

    makeNewInputRow(rowValues?: string[]){
        let hRow = document.createElement("tr") as HTMLTableRowElement
        let currRow = this.rootElement.children.length;
        
        console.log(this.rootElement.children.length)

        //let rowData: HTMLInputElement[] = [];
        this._tableCurrentValues[currRow] = [];

        let aa = (ev:Event) =>{
            console.log(ev.target);
            console.log(this._tableCurrentValues);
            console.log("aaaa");
        }
        
        for (let n = 0; n < this.tableHeaders.length; n++) {
            let value : string = rowValues?.[n] || "";

            let tableDInput = document.createElement("input") as HTMLInputElement;
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
            })

            this.tableCurrentValues[currRow][n] = tableDInput.value;
            let tableD = document.createElement("td") as HTMLTableDataCellElement;
            tableD.appendChild(tableDInput);
            hRow.appendChild(tableD);
        }
        //this.tableRows.push(rowData);
        this.rootElement.appendChild(hRow);
    }
}


