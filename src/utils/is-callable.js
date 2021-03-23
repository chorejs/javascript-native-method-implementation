/**
 * @reference https://github.com/inspect-js/is-callable/blob/master/index.js
 * 由于该库将class排除，所以并不能用于判断 instanceof 方法
 */

'use strict'

const fnToStr = Function.prototype.toString

const constructorRegex = /^\s*class\b/

export function isES6ClassFunction (value) {
  try {
    const fnStr = fnToStr.call(value)
    return constructorRegex.test(fnStr)
  } catch (e) {
    return false // not a function
  }
};

const tryFunctionObject = function tryFunctionToStr (value) {
  try {
    if (isES6ClassFunction(value)) { return false }
    fnToStr.call(value)
    return true
  } catch (e) {
    return false
  }
}
const toStr = Object.prototype.toString
const fnClass = '[object Function]'
const genClass = '[object GeneratorFunction]'
const hasToStringTag = typeof Symbol === 'function' && typeof Symbol.toStringTag === 'symbol'

export default function isCallable (value) {
  if (!value) { return false }
  if (typeof value !== 'function' && typeof value !== 'object') { return false }
  if (typeof value === 'function' && !value.prototype) { return true }
  if (hasToStringTag) { return tryFunctionObject(value) }
  if (isES6ClassFunction(value)) { return false }
  const strClass = toStr.call(value)
  return strClass === fnClass || strClass === genClass
}
