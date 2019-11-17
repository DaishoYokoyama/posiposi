module.exports = {
  chainWebpack: config => {
    const svgRule = config.module.rule('svg');

    svgRule.uses.clear();

    svgRule
      .use('babel-loader')
      .loader('babel-loader')
      .end()
      .use('vue-svg-loader')
      .loader('vue-svg-loader');
  },
  css: {
    loaderOptions: {
      scss: {
        prependData: `
          @import "~@/styles/_reset.scss";
          @import "~@/styles/_typo.scss";
          @import "~@/styles/_constants.scss";
          @import "~@/styles/_vue-transitions.scss";
        `,
      },
    },
  },
};
