

export function genPingScreen() : void{
    let gridC : HTMLElement = document.getElementById("grid-container");

    let toClone : ChildNode = document.getElementById("ping-server-1");

    for (let index = 2; index <= 6; index++) {
        console.log("AAAAAAAAAA");
        let aaa :Node = toClone.cloneNode(true)
        //aaa.getRootNode. .id = "ping-server-{index}";
        let r = gridC.appendChild(aaa);
        
        
        
        console.log(r);
    }
}



