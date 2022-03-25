type EventName = string | symbol;
export type Listener = { once?: boolean; listener: Function };
export type Listeners = Record<string, Listener[]>;
interface IEventEmitter {
  addListener: (eventName: EventName, callback: Function) => EventEmitter;
  on: (eventName: EventName, callback: Function) => EventEmitter; // 리스너 등록
  once: (eventName: EventName, callback: Function) => EventEmitter; // 리스너 한번만 실행되게 등록
  emit: (eventName: EventName, ...args: any) => boolean; // 등록되어 있는 리스너 호출
  listeners: (eventName: EventName) => Array<Listener['listener']>;
}

// https://github.com/nodejs/node/blob/v18.x/lib/events.js 참고
// TODO : 이벤트명이 'newListener'인 이벤트 => 모든 이벤트는 등록될 때 newListener 이벤트를 호출한다. 즉, 이걸 이용해서 이벤트에 추가적인 행동을 취할 수 있게 해줌
// TODO : 이벤트명이 'removeListner'인 이벤트 => 어떤 이벤트든 제거된 후에 removeListner가 호출됨. 마찬가지로 추가적인 행동 가능

export class EventEmitter implements IEventEmitter {
  private _events: Record<EventName, Listener[]> = {};

  public addListener(eventName: EventName, callback: Function) {
    this._events[eventName] ??= [];
    this._events[eventName].push({ listener: callback });
    return this;
  }

  public on(eventName: EventName, callback: Function) {
    this._events[eventName] ??= [];
    this._events[eventName].push({ listener: callback });
    return this;
  }

  public once(eventName: EventName, callback: Function) {
    this._events[eventName] ??= [];
    this._events[eventName].push({ once: true, listener: callback });
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
