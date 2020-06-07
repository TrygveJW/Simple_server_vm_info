
//
//  Husk alert når man forlate siden om man ønsker og lagre
//
let configBar = document.getElementById("config-bar") as HTMLElement;

let mainConfigButtton = document.createElement("button") as HTMLButtonElement;
configBar.appendChild(mainConfigButtton);


/**
 * A quick way to have an expandable table that can accsept user input
 * that can be saved 
 *
 * @class HtmlInputConfigTable
 */
class HtmlInputConfigTable{
    private tableHeaders : string[];
    private tableCurrentValues : [string[]] = [[]];
    private tableDefaultValues : [string[]] = [[]];
    private hasChanged : boolean = false;

    private rootElement: HTMLElement;
    private tableElement : HTMLTableElement;
    private tableRows : [HTMLInputElement[]];
    private lookup = new Map<HTMLInputElement, Number[]>()


    constructor(headers: string[], parent: HTMLElement)
    constructor(headers: string[], parent: HTMLElement, defaults?: [string[]]){
        this.tableHeaders = headers;
        this.rootElement = parent;
        this.tableDefaultValues = defaults || [[]];
    }

    builTableDefaults(){
        this.makeHeadRow();

    }

    private parseTableValues() : [string[]]{
        let ret : [string[]] = [[]]
        this.tableRows.forEach(row => {
            let rowData : string[] = [];
            
            row.forEach(inputElm => {
                rowData.push(inputElm.value)
            })
            ret.push(rowData);
        })
        return ret;
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
        this.tableElement?.appendChild(hRow);
        
    }

    private makeNewInputRow(): void
    private makeNewInputRow(rowValues?: string[]){
        //let  = defaults || Array.apply(null,Array(this.tableHeaders.length).map(_ => ""));
        let hRow = document.createElement("tr") as HTMLTableRowElement
        let rowData: HTMLInputElement[] = [];
        let currCol = this.tableRows.length;
        for (let n = 0; n < rowValues.length; n++) {
            let value : string = rowValues?.[n] || "";

            let tableDInput = document.createElement("input") as HTMLInputElement;
            this.lookup.set(tableDInput, [currCol, n])
            tableDInput.value = value;
            tableDInput.onchange = this.handleChange;
            rowData.push(tableDInput);

            let tableD = document.createElement("td") as HTMLTableDataCellElement;
            tableD.appendChild(tableDInput);
            hRow.appendChild(tableD);
        }
        this.tableRows.push(rowData);
    }

    handleChange(e: Event){
        let newValue = e.returnValue;
        let elm = e.target as HTMLInputElement;
        console.log(elm);
        console.log(this.lookup.get(elm));
        console.log(newValue)

    }


    
}


