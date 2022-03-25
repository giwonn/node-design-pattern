import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  verbose: true,
  preset: 'ts-jest', //trypeScript파일은 ts-jest에서 CommonJS구문으로 변환
  transform: {
    '^.+\\.ts': 'ts-jest',
  },
  testEnvironment: 'node', //테스트 환경
  testMatch: ['<rootDir>/tests/**/*.spec.ts'], //테스트 파일 위치
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
};
export default config;
