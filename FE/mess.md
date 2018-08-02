### 最近开发的流水账

> 2018-06-01 更新

### 移动端 iOS 下使用 scroll 导致滚动卡顿

```
overflow: scroll;
-webkit-overflow-scrolling: touch;
```

### inline 元素无法被 transform

### line-height 在 Android 无法垂直居中, 往上偏移

> 2018-06-02 更新

字体小于 12px 才会出现这种奇怪的问题

1.  scale, 让字体放大两倍, 然后缩放一半

```css
.content {
  display: inline-block;
  height: 40px;
  line-height: 40px;
  font-size: 20px;
  transform: scale(0.5);
  transform-origin: 0% 0%;
}
```

2.  table 布局

```css
.container {
  display: table;
}
.content {
  font-size: 10px;
  display: table-cell;
  vertical-align: middle;
}
```

3.  让字体不小于`12px` 然而这得设计师小姐姐说了算.

### vue 自动化注册全局组件

注册目录下所有的组件, 不包含子目录.

```js
import Vue from "vue";

const ctx = require.context("./", false, /\.vue$/);
ctx.keys().forEach(path => {
  let component = ctx(path).default;
  if (component.name) {
    Vue.component(component.name, component);
  } else {
    console.error("请为组件提供 name 选项");
  }
});
```

> [webpack](https://webpack.docschina.org/guides/dependency-management/)

### iOS 下日期格式化与 Android 不一致

iOS 下 `Date.parse("2018-10-10 10:10:10")` 会报错, 其他平台正常, 可以用以下方法保持兼容, chrome 对于 `-` 和 `/` 分割日期的形式都是支持的, Safrai 只支持 `/`

```
new Date(timeStr.replace(/\-/g, '/')) // 本质上还是调用的 parse
Date.parse(timeStr.replace(/\-/g, '/'))
```

### 箭头函数 无法使用 arguments

### Linux 进入后台

```bash
nohup ./geth &
```

执行该命令之后会在当前目录生成 nohup.out 文件, 使用下面命令可以查看动态生成的日志

```bash
tail -f nohup.out
```

### 禁用单页应用 HTML 缓存

以下代码可以禁用 html 文件缓存，

```html
<meta http-equiv="Expires" content="-1">
<meta http-equiv="Pragma" content="no-cache">
<meta http-equiv="Cache-control" content="no-cache">
<meta http-equiv="Cache" content="no-cache">
```

但是在某些浏览器还是没用，刷新缓存依赖于在请求页面加时间戳, 例如

```js
`www.foo.com?ts=${Date.now()}`;
```

### 多重三元表达式

```js
var func1 = function( .. ) {
  if (condition1) { return value1 }
  else if (condition2) { return value2 }
  else if (condition3) { return value3 }
  else { return value4 }
}

var func2 = function( .. ) {
  return condition1 ? value1
       : condition2 ? value2
       : condition3 ? value3
       :              value4
}
```
