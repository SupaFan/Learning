import * as echarts from 'echarts';
/**
 * 线性渐变
 * @param {*} colors 颜色设置
 */
export const linearGradient = (...colors) => {
  const args = [...colors];
  const base = 1 / args.length;
  const _colors = args.map((set, index) => {
    const _isSet = Object.prototype.toString.call(set) === '[object Object]';
    return {
      offset: _isSet ? set.offset : (index >= args.length / 2 ? index + 1 : index) * base,
      color: _isSet ? set.color : set
    };
  });
  // 颜色渐变函数 前四个参数分别表示四个位置依次为左、下、右、上
  return new echarts.graphic.LinearGradient(0, 0, 0, 1, [..._colors], false);
};

// 横向渐变
export const linearGradientHorizontal = (...colors) => {
  const args = [...colors];
  const base = 1 / args.length;
  const _colors = args.map((set, index) => {
    const _isSet = Object.prototype.toString.call(set) === '[object Object]';
    return {
      offset: _isSet ? set.offset : (index >= args.length / 2 ? index + 1 : index) * base,
      color: _isSet ? set.color : set
    };
  });
  // 颜色渐变函数 前四个参数分别表示四个位置依次为左、下、右、上
  return new echarts.graphic.LinearGradient(0, 0, 1, 0, [..._colors], false);
};
