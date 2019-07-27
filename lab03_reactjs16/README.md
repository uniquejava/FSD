# Smart Player (React 16)

## Tech stacks

1. react
2. react-router
3. redux
4. redux-thunk
5. react-bootstrap
6. axios

## Setup

```sh
https://github.com/uniquejava/FSD.git
cd FSD
json-server -p 3001 -w json-server/db.json

cd lab03_reactjs16/smart-player
npm start

```

open http://localhost:3000

## Add fontawesome

```sh
yarn add @fortawesome/fontawesome-svg-core
yarn add @fortawesome/free-brands-svg-icons
yarn add @fortawesome/free-solid-svg-icons
yarn add @fortawesome/free-regular-svg-icons
yarn add @fortawesome/react-fontawesome
```

## Add bootstrap

```sh
yarn add react-bootstrap bootstrap
```

## Add scss

```sh
yarn add node-sass
```

Then we can `import './xxxx.scss'`

## Add react-router

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
4. https://jscomplete.com/learn/complete-intro-react
