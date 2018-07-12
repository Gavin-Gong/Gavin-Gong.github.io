# 设计 React 组件 API

多年来，我注意到处理组件 api 和构建应用程序和库方面的模式。以下是定义组件 api 的想法、观点和建议的集合，这些组件 api 应该更灵活、更具有组合性、更容易理解。这些规则都不是硬性的，但它们帮助我想明白了组织和创建组件。

## 提供最少的 API

正如 React 库本身的目标是最小化 API 一样，我建议在定义组件 API 时采用类似的态度。需要学习的新内容越少，其他人就越容易知道如何使用您创建的组件，从而使它们更可容易被重用。如果有人不理解您的组件 API，那么他们重复你的工作的可能性就会增加。这是我如何创建组件的核心理念，我发现在我工作的时候牢记它很有帮助。

## 让你的代码更容易被找到

从扁平目录结构开始，不要过早地组织代码库。人类喜欢整理东西，但我们在这方面也很糟糕。命名已经足够困难了，为组件库创建目录结构，您可能会做更多的工作，使其他人更难找到你所写的代码。

一个单独存放组件的目录在变得难以管理之前会变得相当大。如果所有的组件都在一个文件夹中，在大多数文件系统工具中会被自动按照字母排序，这有助于为其他人提供更完整的代码库概览。

## 避免 renderXXX 方法

如果您在组件中定义了以“render”开头的自定义方法，那么它很可能是自有组件。正如克里斯•比斯卡迪所言，“(它)有效地意味着，有足够的复杂性值得分解”。对于何时呈现或不呈现组件，React 能明智地决定是否渲染的时机，因此，通过将这些组件拆分为它们自己的组件，可以帮助 React 更好地运行。

```jsx
// 不要这样写
class Items extends React.Component {
  renderItems ({ items }) {
    return items.map(item => (
      <li key={item.id}>
        {renderItem(item)}
      </li>
    ))
  }

  renderItem (item) {
    return (
      <div>
        {item.name}
      </div>
    )
  }

  render () {
    return (
      <ul>
        {renderItems(this.props)
      </ul>
    )
  }
}
```

```jsx
// 这样写
const ItemList = ({ items }) =>
  <ul>
    {items.map(item => (
      <li key={item.id}>
        <Item {...item} />
      </li>
    )}
  </ul>

const Item = ({ name }) =>
  <div>{item.name}</div>

class Items extends React.Component {
  render () {
    const { items } = this.props
    return <ItemList items={items} />
  }
}
```

## 在数据界限上分割组件

通常，组件应该由数据的形状来定义

> Since you’re often displaying a JSON data model to a user, you’ll find that if your model was built correctly, your UI (and therefore your component structure) will map nicely.
