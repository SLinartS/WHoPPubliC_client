const path = require('path');
module.exports = {
  webpack: {
    alias: {
      '@assets': path.resolve(__dirname, 'src/assets'),
      '@styles': path.resolve(__dirname, 'src/styles/global'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@hooks': path.resolve(__dirname, 'src/hooks'),
      '@store': path.resolve(__dirname, 'src/store'),
      '@helpers': path.resolve(__dirname, 'src/helpers'),
      '@utils': path.resolve(__dirname, 'src/utils'),
      '@tests': path.resolve(__dirname, 'src/tests'),
      '@gtypes': path.resolve(__dirname, 'src/types'),
    },
  },
};