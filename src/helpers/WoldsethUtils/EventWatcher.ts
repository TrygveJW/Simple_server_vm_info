

export class EventWatcher{
    private objectEventPair: Map<HTMLElement, Map<EventListenerOrEventListenerObject, string>> = new Map<any, Map<EventListenerOrEventListenerObject, string>>();


    AddToWatcher<K extends keyof HTMLElementEventMap>(obj: HTMLElement, eventType: K, handler: EventListenerOrEventListenerObject):void{
        if (this.objectEventPair.has(obj)){
            this.objectEventPair.get(obj).set(handler, eventType)
        } else {
            this.objectEventPair.set(obj, new Map<EventListenerOrEventListenerObject, string>()) 
            this.objectEventPair.get(obj).set(handler, eventType)
        }
        obj.addEventListener(eventType, handler)
    }


    removeFromWatcher(obj: HTMLElement){
        if (this.objectEventPair.has(obj)){
            for (let eventL of this.objectEventPair.get(obj).keys()) {
                obj.removeEventListener(this.objectEventPair.get(obj).get(eventL), eventL)
            }
            this.objectEventPair.delete(obj);
        }

    }

    removeAll(){
        for (const elm of this.objectEventPair.keys()) {
            this.removeFromWatcher(elm);
        }
    }
}


