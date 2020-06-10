"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventWatcher = void 0;
class EventWatcher {
    constructor() {
        this.objectEventPair = new Map();
    }
    addToWatcher(obj, eventType, handler) {
        if (this.objectEventPair.has(obj)) {
            this.objectEventPair.get(obj).set(handler, eventType);
        }
        else {
            this.objectEventPair.set(obj, new Map());
            this.objectEventPair.get(obj).set(handler, eventType);
        }
        obj.addEventListener(eventType, handler);
    }
    removeFromWatcher(obj) {
        if (this.objectEventPair.has(obj)) {
            for (let eventL of this.objectEventPair.get(obj).keys()) {
                obj.removeEventListener(this.objectEventPair.get(obj).get(eventL), eventL);
            }
            this.objectEventPair.delete(obj);
        }
    }
    removeAll() {
        for (const elm of this.objectEventPair.keys()) {
            this.removeFromWatcher(elm);
        }
    }
}
exports.EventWatcher = EventWatcher;
//# sourceMappingURL=EventWatcher.js.map