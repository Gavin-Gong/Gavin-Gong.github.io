# Subscription

偶然间在 `vue-rx` 的源码中看到 `Subscription` 的用法, 之前一直是什么操作符和 `Subject` `Observable` 好像这块没怎么见过.

`Subscription` 是一个 `Class`, 上面挂载了几个函数 处理我们可以猜到的 `unsubscribe`之外还有 `add` 和 `remove`, 另外在新建实例的时候可以传入 一个 `unsubscribe` 时调用的回调函数, 在取消所有订阅之后就会执行这个函数, 另外 `unsubscribe` 会对所有的 `add` 进来的包括自己所在的 `subscription` 起作用, 它会取消所有持有的订阅关系.

## 参考链接

- https://cn.rx.js.org/class/es6/Subscription.js~Subscription.html

---

time: 2018-07-26

tag: Rxjs

---
