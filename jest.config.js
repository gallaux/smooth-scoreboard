module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    moduleFileExtensions: ['js', 'ts', 'tsx'],
    "transform": {
        "^.+\\.ts?(x)?$": "ts-jest"
    },
    globals: {
        'ts-jest': {
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
        }
    },
    setupFilesAfterEnv: ["<rootDir>src/setupTests.js"],
    testMatch: ["**/__tests__/**/*.ts?(x)", "**/?(*.)+(spec|test).ts?(x)"],
    verbose: true
};