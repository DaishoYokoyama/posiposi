module.exports = async ({ config, mode }) => {
  config.resolve.extensions.push(
    '.vue',
    '.css',
    '.less',
    '.scss',
    '.sass',
  );

  config.module.rules.push({
    test: /\.scss$/,
    loaders: ['style-loader', 'css-loader', 'sass-loader']
  });

  config.module.rules.push({
    test: /\.svg$/,
    loaders: ['babel-loader', 'vue-svg-loader'],
  });

  return config;
};