### 最近遇到的坑

> 2018-06-01 更新

### 移动端 iOS 下使用 scroll 导致滚动卡顿

```
overflow: scroll;
-webkit-overflow-scrolling: touch;
```

### inline 元素无法被 trnsdform


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
