type EventName = string | symbol;
export type Listener = { once?: boolean; listener: Function };
export type Listeners = Record<string, Listener[]>;
interface IEventEmitter {
  on: (eventName: EventName, listener: Function) => EventEmitter; // 리스너 등록
  once: (eventName: EventName, listener: Function) => EventEmitter; // 리스너 한번만 실행되게 등록
  emit: (eventName: EventName, ...args: any) => boolean; // 등록되어 있는 리스너 호출
  listeners: (eventName: EventName) => Array<Listener['listener']>;
}

// https://github.com/nodejs/node/blob/v18.x/lib/events.js 참고
export class EventEmitter implements IEventEmitter {
  private _events: Record<EventName, Listener[]> = {};

  public on(eventName: EventName, listener: Function) {
    this._events[eventName] ??= [];
    this._events[eventName].push({ listener });
    return this;
  }

  public addListener(eventName: EventName, listener: Function) {
    return this.on(eventName, listener);
  }

  public once(eventName: EventName, listener: Function) {
    this._events[eventName] ??= [];
    this._events[eventName].push({ once: true, listener });
    return this;
  }

  public emit(eventName: EventName, ...args: any) {
    if (this._events[eventName] === undefined) return false;

    this.executeListeners(eventName, args);
    this._events[eventName] = this.filterOnceListner(eventName);

    return true;
  }

  public listeners(eventName: EventName) {
    try {
      return this._events[eventName].map(({ listener }) => listener);
    } catch (error: any) {
      throw new Error(error);
    }
  }

  private executeListeners(eventName: EventName, ...args: any[]) {
    this._events[eventName].forEach(({ listener }) => listener(...args));
  }

  private filterOnceListner(eventName: EventName) {
    return this._events[eventName].filter(({ once }) => !once);
  }
}
