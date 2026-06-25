module.exports = {
  testEnvironment: 'node',
  moduleFileExtensions: ['js', 'ts', 'tsx'],
  transform: {
    "^.+\\.tsx?$": ["ts-jest", {
      tsconfig: {
        lib: [
          "dom",
          "es2015",
          "es2015.promise",
          "es2017.object"
        ],
        "target": "es2017",
        "module": "commonjs",
        "moduleResolution": "node",
        "importHelpers": true,
        "experimentalDecorators": true,
        "emitDecoratorMetadata": true,
        "declaration": false,
        "inlineSourceMap": true,
        "skipLibCheck": true
        //"strictNullChecks": true
        //"isolatedModules": true
      }
    }]
  },
  setupFilesAfterEnv: ["<rootDir>src/setupTests.js"],
  testMatch: ["**/test/**/*.ts?(x)", "**/?(*.)+(spec|test).ts?(x)"],
  verbose: true
};