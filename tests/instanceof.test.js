import instanceOf from '../src/instanceof'

function TestClass () {}

const testClass = new TestClass()

test('normal compare', () => {
  const result = instanceOf(testClass, TestClass)
  expect(result).toBeTruthy()
})

test('left-hand side value is literal of Number', () => {
  expect(instanceOf(1, TestClass)).toBeFalsy()
})

test('left-hand side value is null', () => {
  expect(instanceOf(null, Object)).toBeFalsy()
})

test('left-hand side value is ES6 Class instance', () => {
  class ESClass {}
  expect(instanceOf(new ESClass(), ESClass)).toBeTruthy()
  expect(instanceOf(new ESClass(), Object)).toBeTruthy()
})
