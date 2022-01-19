const dotenvLoad = require('dotenv-load');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE == 'true',
});
dotenvLoad();

module.exports = withBundleAnalyzer({
  webpack(config, { isServer, buildId }) {
    config.resolve.modules.push(__dirname);

    return config;
  },

  distDir: '_next',
  // generateBuildId: async () => {
  //   if (process.env.BUILD_ID) {
  //     return process.env.BUILD_ID;
  //   } else {
  //     return `${new Date().getTime()}`;
  //   }
  // },
  images: {
    domains: [
      'http://www.iwedding.co.kr',
      'http://www.ifamily.co.kr',
      'http://www.ibrandplus.co.kr',
      'https://www.iwedding.co.kr',
      'https://www.ifamily.co.kr',
      'https://www.ibrandplus.co.kr',
      'amyzon.co.kr',
      'www.iwedding.co.kr',
      'www.ifamily.co.kr',
      'www.ibrandplus.co.kr',
      'iwedding.co.kr',
      'ifamily.co.kr',
      'ibrandplus.co.kr',
    ],
  },
  // swcMinify: true,
});
