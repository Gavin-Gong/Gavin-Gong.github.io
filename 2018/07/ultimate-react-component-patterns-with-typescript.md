# TypeScript 终极指南

## 类型

- keyof
- Partial
- Readonly
- Record
- Pick
- Omit
- ?

## 声明文件安装

TS 声明文件置于 @types 包下

> yarn add -D @types/{react,react-dom}

## 取到函数返回的类型

```ts
function foo(x: number): Array<number> {
  return [x];
}
type fn = ReturnType<typeof foo>;
```

## 根据类取到实例类型

```ts
type T = InstanceType<typeof App>;
```

## 提取 Promise 类型返回的数据

```

```

## 参考链接

- https://github.com/Microsoft/TypeScript/pull/21847
- https://stackoverflow.com/questions/36015691/obtaining-the-return-type-of-a-function
