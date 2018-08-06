# eventloop & Rxjs Scheduler

本文将简单介绍 event loop 在 RxJS 中运用. 偏重于 RxJS Scheduler 而不是 event loop

## event loop

event loop 是一种任务调度机制, 用来处理异步任务, 每个 eventloop 由三个阶段构成：执行一个 task，执行 microtask 队列，可选的 ui render 阶段. 在 JavaScript 单线程语言中, 在同一时间内只能只能处理一件事, 当我们遇到需要处理异步的情况, 不能让异步操作阻塞线程, 我们可以让异步任务先搁置, 先执行同步任务, 等异步时间来临再来执行异步任务, 这就是 event loop.

JavaScript 在执行过程中, 变量与对象会存入对中, 另外还会维护一个任务队列(包括宏任务队列, 微任务队列), 执行函数会被推入栈中, 一旦函数执行完毕就会从函数中推出, 一旦整个执行栈被清空, 就开始处理任务队列, 按照一定逻辑将任务推入执行栈中执行, 执行过程中可能会往任务队列中添加其他任务,微任务具有高优先级, 在单个宏任务的切换中间会检查执行整个微任务队列, 再去执行下一个宏任务

宏任务包括以下情形

- I/O
- UI rendering
- timer(setTimeout, setInterval) 等
- ajax
- events (绑定的事件)
- requestAnimationFrame

微任务包括以下情形

- then (Promise)
- nextTick (node)
- messageChannel
- MutationObersve
- Object.observe

## Scheduler

Scheduler 是什么?
Scheduler 就是调度器的意思, RxJS 中的 Scheduler 就是从细微角度控制数据流的推送时机的. 为什么说从细微角度控制推送时机? 先来看看 RXJS 中的四种 Scheduler 类型

- queue
- asap (Micro Task)
- async (Macro Task)
- animationFrame (Micro Task)

### queue

以同步的形式按照顺序执行, 上一个任务结束才会执行下一个任务. 优先于 event loop 执行

### asap

asap 是 As soon as possible 的缩写, 顾名思义是个优先级很高的 Scheduler. 其实是基于 Micro Task 的调度, 所以优先级很高, 更加深入一点, 代码内部其实是用 Promise 实现的.

### async

async Scheduler 其实是基于 Macro Task 的调度器, 代码内部其实是基于 setInterval 实现的, 所以它的优先级比前两个都低

### animationFrame

animationFrame Scheduler 是基于 requestAnimationFrame API, 也是异步的, 一般认为是基于宏任务

## Scheduler 操作符分类

默认使用 queue

- of
- from
- range

默认使用 async

- timer
- interval

默认使用 asap

### 使用

```js
import {
  asapScheduler,
  asyncScheduler,
  animationFrameScheduler,
  queueScheduler
} from "rxjs";

import { observeOn } from "rxjs/operators";
```

#### queueScheduler

#### asapScheduler

#### asyncScheduler

#### animationFrameScheduler

### subscribeOn

- 改变源的执行
- 只执行一次

### observeOn

- 改变通知执行(next, error, complete)
- 可以用于每个操作符之前

### ref

- https://www.youtube.com/watch?v=X_RnO7KSR-4
- https://www.youtube.com/watch?v=AL8dG1tuH40
- https://jakearchibald.com/2015/tasks-microtasks-queues-and-schedules/
- https://www.404forest.com/2017/07/18/how-javascript-actually-works-eventloop-and-uirendering/#4-requestAnimationFrame-callback-%E7%9A%84%E6%89%A7%E8%A1%8C%E6%97%B6%E6%9C%BA
