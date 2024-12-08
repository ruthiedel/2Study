
const nextConfig = {
const nextConfig = {
  webpack(config) {
    // דחוף את קבצי ה-CSS שלך אחרי כל השאר
    config.module.rules.push({
      test: /\.css$/,
      use: ['style-loader', 'css-loader'],
    });

    return config;
  },
};

module.exports = nextConfig;

};

  module.exports = nextConfig;
