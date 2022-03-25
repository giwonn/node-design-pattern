module.exports = {
  preset: 'ts-jest', //trypeScript파일은 ts-jest에서 CommonJS구문으로 변환
  transform: {
    '^.+\\.ts': 'babel-jest',
  },
  testEnvironment: 'node', //테스트 환경
  testMatch: ['<rootDir>/tests/**/*.spec.ts'], //테스트 파일 위치
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
};
