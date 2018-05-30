### 基础类型

#### 命名

在go语言中一切函数, 变量, 常量的命名, 都要以字母或者下滑线开头, 后面跟字母, 下划线, 数字 并且区分大小写

另外 在命名的时候要避开以下关键字

- break
- default
- func
- interface
- select
- case
- defer
- go
- map
- struct
- chan
- else
- goto
- package
- switch
- const
- fallthrought
- if
- range
- type
- coutinue
- for
- import
- return
- var

以及一些预定关键字

- 内置常量 `true`, `false`, `iota`, `nil`
- 内置int类型 `int`,`int8`, `int16`,`int32`,`int64`
- 内置unit类型`unit`,`unit8`,`unit16`,`unit32`, `unit64`, `unitptr`
- 内置浮点 `float32`, `float64`
- 内置复数 `complex64`, `complex128`
- 其他常用类型`bool`,`byte`,`rune`,`string`,`error`
- 内置函数`make`,`len`,`cap`,`new`,`append`,`copy`,`close`,`delete`,`recover`,`complex`,`real`,`imag`



#### 变量声明

golang 中可以通过`var`和`const`对变量进行声明, 例如

```go
var a int
```

我们也可以一次声明多个变量, 也可以声明函数参数时候使用

```go
var a, b int

func(a, b int) {
}
```

或者使用小括号(可以考虑把相关代码放组织到一个小括号, 方便阅读)

``` go
var (
	a int
	b string
)
```

#### 变量初始化

有时候我们需要对变量进行初始化操作, 尽管在声明完变量之后 变量是存在一个默认零值, 不同类型不一致,

```
var a int = 1

var b = 1 // 编译器可以自动推导b的类型
```

我们也可以用`:=` 来进行变量初始化, 但是值得注意的一点它只能在**函数**中使用,  且改变量不能在之前被`var`或者`const`声明过.

```
a := 1 // 编译器会进行自动类型推导
```

#### 变量赋值

在声明完变量之后我们可以对变量进行赋值或者在这基础上进行重新赋值, 因为golang是静态强类型, 对于指定相应类型的变量需要赋予相应的类型值

``` go
var foo string
foo = "xxx" // 不是字符串类型会报错
```

我们也可以多重赋值

``` go
var (
	a int
	b string
)
a, b = 1, "string"
```

甚至我们可以交换变量赋值

``` go
a := 1
b := 2
a, b = b, c
```

#### 匿名变量

golang 存在一个特殊变量`_`  可以说是变量中的弃婴, 因为它生来就是被丢弃的,

golang中存在一个函数有两个返回值的情况, 但是当我们只需要其中一个变量时, 我们需要用`_`来 表示不需要的变量

``` go
func foo()(int, string) {
  return 24, "years"
}
age, _ := foo()
```

另外我们可能需要引用一个匿名包(只会运行包中的init函数), 我们需要这样写,

``` go
package _ "path/to/pkg"

```

#### 类型零值

golang中在变量被申明之后, 会有一个**默认零值** , 整型一般对应`0`, 浮点数对应`0.0`, bool对应`false`, `byte`其实就是`int8`对应`0` , `rune`(其实就是int32)对应`0`, string对应`""`



#### 类型转化 TODO 类型兼容

golang不允许隐式类型转化, 要进行类型转化需要进行显示声明, 而且两种类型之间必须要兼容,

``` go
var ch byte = 97
var a int = int(ch)
```

