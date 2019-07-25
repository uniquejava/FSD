## fontawesome

```sh
yarn add @fortawesome/fontawesome-svg-core
yarn add @fortawesome/free-brands-svg-icons
yarn add @fortawesome/free-solid-svg-icons
yarn add @fortawesome/free-regular-svg-icons
yarn add @fortawesome/react-fontawesome
```

## bootstrap

```sh
yarn add react-bootstrap bootstrap
```

## scss

```sh
yarn add node-sass
```

Then we can `import './xxxx.scss'`

## react-router

```sh
yarn add react-router-dom
```

## 坑

ngClass

```js
 <ul role="menubar" className={`menu ${this.props.hide ? 'hide' : ''}`}>
```

`ref.current.disabled=false` 在外观上让按钮可用， 但是绑定的 onClick 依然不可用， 正确的方式是使用 state

错误的写法 (会导致 vote 立即被调用一次)

```js
<button id="btnUnlike" className="btn float-right" onClick={this.vote('down')} >
```

正确的写法

```js
<button id="btnUnlike" className="btn float-right" onClick={() => {this.vote('down'); }} >
```

## References

1. https://react-bootstrap.github.io/
2. https://github.com/FortAwesome/react-fontawesome
3. [How to reference a DOM element in React](https://flaviocopes.com/react-ref-element/)
