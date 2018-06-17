## JavsScript 函数式学习手记

### 目标 高阶函数
- map
- filter
- some
- every
- reduce
- unary
- once
- pluck
- pick
- zip
- flatten
- merge
- takeLast
- uniq
- omit
- memoized
- compose
- pipe
- debounce
- throttle

### tap
一个没什么用但是调试很有用的函数, 获取函数参数后输出， 与此同时不影响 业务函数的执行
``` js
const tap = (v) => fn => {
  console.log(v)
  typeof fn === 'function' && fn(v)
}
```
### unary
unary === 一元的, 可以将多元函数转化为一元函数
``` js
const unary = fn => {
  return fn.length === 1 ? fn : arg => fn(arg)
}
```
有意思的一个点 函数存在一个`length`属性来获取它的参数个数， 当然可变参数是会被忽略的存在。以前见过的一道题

```js
['1','2','3'].map(parseInt) // => [1, NaN, NaN]
```
其实相当于
```js
['1','2','3'].map((v, i) => parseInt(v, i)) // => [1, NaN, NaN]
```
当 parseInt 解析失败就会返回一个 NaN，但是i 不传值一般会默认10进制， 详情见
链接[parseInt](http://devdocs.io/javascript/global_objects/parseint)
我们可以用 unary 转化一下让 parseint 只接受一个参数
```
['1', '2', '3'].map(unary(parseInt))
```

### once
只运行一次的函数， 我们需要用到闭包的特性来保存函数是否已经运行过的状态

``` js
const once = (fn) => {
  let done = false
  return () => {
    if (done) return
    done = true
    fn(arguments)
  }
}
```
使用
``` js
once(say)() // 我只说一次。。。
```


### memoized
当需要进行大量重复计算的时候可以缓存计算结果
```
const memoized = fn => {
  const cacheMap = {}
  return (arg) => cacheMap[arg] || (cacheMap[arg] = fn(arg))
}
```

### 链式调用

### 禁咒
- Monad
- Functors
- curry
- partial
- pointfree




[函数式术语](https://github.com/gnipbao/iblog/issues/13)
