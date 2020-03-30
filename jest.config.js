module.exports = {
    coverageDirectory: 'coverage',
    globals: {
        'ts-jest': {
            tsConfig: {
                inlineSourceMap: true,
                module: 'commonjs',
                paths: {
                    '@apestaartje/json2ts/*': [
                        'src/json2ts/*',
                    ],
                },
                sourceMap: false,
            },
        },
    },
    moduleNameMapper: {
        '^@apestaartje/json2ts/(.*)$': '<rootDir>/src/json2ts/$1',
    },
    preset: 'ts-jest',
    transform: {
        '^.+\\.tsx?$': 'ts-jest',
        '^.+\\.jsx?$': 'babel-jest',
    },
    transformIgnorePatterns: [
        '/node_modules/(?!@apestaartje).+(js|jsx)$',
    ],
};
