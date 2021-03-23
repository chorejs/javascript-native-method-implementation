/**
 * @description 当前环境是否存在 Symbol 类型
 * @export
 * @returns {boolean}
 */
export function hasSymbol () {
  return typeof Symbol === 'function' && typeof Symbol('foo') === 'symbol'
}
