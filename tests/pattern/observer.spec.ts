import { EventEmitter } from '@/pattern/observer';

describe('Observer Pattern', () => {
  describe('Class - EventEmitter', () => {
    const eventEmitter: EventEmitter = new EventEmitter();
    describe(`Method`, () => {
      describe('on()', () => {
        test('새로운 이벤트 등록 및 리스너 추가', () => {
          eventEmitter.on('test', () => 'test1');
          const sample = 'test1';
          expect(eventEmitter.listeners('test')[0]()).toBe(sample); // toBe() : 원시타입의 값, 객체의 참조값 비교
        });

        test('존재하는 이벤트에 리스너 추가', () => {
          eventEmitter.on('test', () => 'test2');
          const ReturnValuesByValues = eventEmitter.listeners('test').map((listener) => listener());
          const sample = ['test1', 'test2'];
          expect(ReturnValuesByValues).toEqual(sample); // toEqual() : 래퍼 타입, 객체 내부의 값 비교
        });
      });
    });
  });
});
