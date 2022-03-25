type EventName = string | symbol;
type Listener = { once?: boolean; callback: Function };
interface IEventEmitter {
  on: (eventName: EventName, listener: Function) => EventEmitter; // 리스너 등록
  once: (eventName: EventName, listener: Function) => EventEmitter; // 리스너 한번만 실행되게 등록
  emit: (eventName: EventName, ...args: any) => boolean; // 등록되어 있는 리스너 호출
}

// https://github.com/nodejs/node/blob/v18.x/lib/events.js 참고
class EventEmitter implements IEventEmitter {
  private _events: Record<EventName, Listener[]> = {};

  public on(eventName: EventName, callback: Function) {
    this._events[eventName] ??= [];
    this._events[eventName].push({ callback });
    return this;
  }

  public addListener(eventName: EventName, callback: Function) {
    return this.on(eventName, callback);
  }

  public once(eventName: EventName, callback: Function) {
    this._events[eventName] ??= [];
    this._events[eventName].push({ once: true, callback });
    return this;
  }

  public emit(eventName: EventName, ...args: any) {
    if (this._events[eventName] === undefined) return false;

    this.executeListeners(eventName, args);
    this._events[eventName] = this.filterOnceListner(eventName);

    return true;
  }

  private executeListeners(eventName: EventName, ...args: any[]) {
    this._events[eventName].forEach(({ callback }) => callback(...args));
  }

  private filterOnceListner(eventName: EventName) {
    return this._events[eventName].filter(({ once }) => !once);
  }
}
