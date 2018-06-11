### 最近开发的流水账

> 2018-06-01 更新

### 移动端 iOS 下使用 scroll 导致滚动卡顿

```
overflow: scroll;
-webkit-overflow-scrolling: touch;
```

### inline 元素无法被 transform


### line-height 在Android 无法垂直居中, 往上偏移
> 2018-06-02 更新

字体小于 12px 才会出现这种奇怪的问题
1. scale, 让字体放大两倍, 然后缩放一半
``` css
.content {
    display: inline-block;
    height: 40px;
    line-height: 40px;
    font-size: 20px;
    transform: scale(0.5);
    transform-origin: 0% 0%;
}
```
2. table 布局
``` css
.container {
  display: table
}
.content {
  font-size: 10px;
  display: table-cell;
  vertical-align: middle
}
```
3. 让字体不小于`12px` 然而这得设计师小姐姐说了算.

### vue 自动化注册全局组件
注册目录下所有的组件, 不包含子目录.
``` js
import Vue from 'vue'

const ctx = require.context('./', false, /\.vue$/)
ctx.keys().forEach(path => {
  let component = ctx(path).default
  if (component.name) {
    Vue.component(component.name, component)
  } else {
    console.error('请为组件提供 name 选项')
  }
})
```
> [webpack](https://webpack.docschina.org/guides/dependency-management/)


### iOS 下日期格式化与 Android 不一致
iOS下 `Date.parse("2018-10-10 10:10:10")` 会报错, 其他平台正常, 可以用以下方法保持兼容, chrome对于 `-` 和 `/` 分割日期的形式都是支持的, Safrai 只支持 `/`
```
new Date(timeStr.replace(/\-/g, '/')) // 本质上还是调用的 parse
Date.parse(timeStr.replace(/\-/g, '/'))
```
