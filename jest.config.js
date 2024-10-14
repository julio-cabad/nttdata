module.exports = {
  preset: 'react-native',
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
  },
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|react-redux)/)', // Asegúrate de incluir react-redux
  ],
  moduleNameMapper: {
    '\\.(png|jpg|jpeg|gif|svg)$': '<rootDir>/__mocks__/fileMock.js', // Asegúrate de tener este archivo
  },
  setupFilesAfterEnv: [], // Si tienes configuraciones adicionales
};
