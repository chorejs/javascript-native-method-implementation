import { hasSymbol } from './utils/index'
import isCallable, { isES6ClassFunction } from './utils/is-callable'

// 判断 Symbol 是否存在当前环境中
const hasSymbols = hasSymbol()

/**
 * @description IsCallable 实现 for instanceof
 * @param {Object} obj
 * @returns
 */
function isCallableForInst (obj) {
  return isES6ClassFunction(obj) || isCallable(obj)
}

function isObject (obj) {
  return typeof obj === 'object' || typeof obj === 'function'
}

/**
 * @description instanceof 运算符：检测构造函数的 prototype 属性是否在指定实例对象的原型链上
 * @export
 * @param {any} O
 * @param {Object} C 构造函数
 * @reference es6 标准：http://www.ecma-international.org/ecma-262/6.0/#sec-instanceofoperator
 * @reference https://www.ibm.com/developerworks/cn/web/wa-ecma262/index.html 依赖于 ECMAScript-262 edition 3 标准
 */
export default function instanceOf (O, C) {
  // 1. If Type(C) is not Object, throw a TypeError exception.
  // 字面量值返回false：const a = 1; a instanceof Number; -> false
  if (!isObject(C)) {
    throw new TypeError('Right-hand side of \'instanceof\' is not an object')
  }

  if (!isObject(O)) {
    return false
  }

  if (hasSymbols) {
    // 2. Let instOfHandler be GetMethod(C,@@hasInstance).
    const instOfHandler = C[Symbol.hasInstance]

    if (instOfHandler) {
      // 4. If instOfHandler is not undefined, then
      //    Return ToBoolean(Call(instOfHandler, C, «O»)).
      return instOfHandler.call(C, O)
    }
  }

  // 兼容 es6 之前的版本
  // 5. If IsCallable(C) is false, throw a TypeError exception.
  if (!isCallableForInst(C)) {
    throw new TypeError('Right-hand side of \'instanceof\' is not callable')
  }

  // Let P be Get(C, "prototype").
  const P = C.prototype

  // Let O be O.[[GetPrototypeOf]]().
  O = Object.getPrototypeOf(O)

  if (!isObject(P)) {
    throw new TypeError('Right-hand side of \'instanceof\' is not callable')
  }

  // weird: 因为 typeof null === 'object' -> true
  // e.g.
  // function Test () {}
  // const test = new Test()
  // Test.prototype = null
  // test instanceof Test -> 报下面的错
  if (P === null) {
    throw new TypeError('Function has non-object prototype \'null\' in instanceof check')
  }

  // 沿着目标实例对象的原型链向上找，如果找到和 P 相等的则返回 true
  while (true) {
    if (O === null) {
      return false
    }
    if (O === P) {
      return true
    }
    O = Object.getPrototypeOf(O)
  }
}
