import { EventEmitter } from '@/pattern/observer';
import type { Listeners } from '@/pattern/observer';

describe('Observer Pattern', () => {
  const eventEmitter: EventEmitter = new EventEmitter();

  describe('Class - EventEmitter', () => {
    describe(`Method`, () => {
      test('on() - 새로운 이벤트 등록 및 리스너 추가', () => {
        eventEmitter.on('test', () => 'test1');
        expect(eventEmitter.listeners('test')[0]()).toBe('test1'); // toBe() : 원시타입의 값, 객체의 참조값 비교
      });
      test('on() - 존재하는 이벤트에 리스너 추가', () => {
        eventEmitter.on('test', () => 'test2');
        const list = eventEmitter.listeners('test').map((listener) => listener());
        expect(list).toEqual(['test1', 'test2']); // toEqual() : // toBe() : 래퍼 타입, 객체 내부의 값 비교
      });
    });
  });
});
