module.exports = {
  plugins: {
    autoprefixer: {},
    'postcss-import': {},
    'postcss-nested': {},
    'postcss-size': {},
    'postcss-pxtorem': { rootValue: 75, propList: ["*"], selectorBlackList: ['.van-'], unitPrecision: 5, },
  },
};
