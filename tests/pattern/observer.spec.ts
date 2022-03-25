import { EventEmitter } from '@/pattern/observer';
import type { Listeners } from '@/pattern/observer';

describe('Observer Pattern', () => {
  const eventEmitter: EventEmitter = new EventEmitter();

  describe('EventEmitter의 이벤트 "test"', () => {
    describe(`리스너 () => 'test1' 추가 `, () => {
      test('첫번째 리스너가 "test1"을 리턴한다.', () => {
        eventEmitter.on('test', () => 'test1');
        expect(eventEmitter.listeners('test')[0]()).toBe('test1');
      });
    });
  });
});
