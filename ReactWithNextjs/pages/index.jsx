
// 使用next.js搭建react 页面
import { useState } from 'react';

// const app = document.getElementById("app")

function Header({ title }) {
  return <h1>{title ? title : "Default title"}</h1>
}

export default  function HomePage() {
  const names = ["Ada Lovelace", "Grace Hopper", "Margaret Hamilton"]

  const [likes, setLikes] = useState(0);

  function handleClick() {
    setLikes(likes + 1)
  }

  return (
    <div>
      <Header title="Develop. Preview. Ship. 🚀" />
      <ul>
        {names.map((name) => (
          <li key={name}>{name}</li>
        ))}
      </ul>

      <button onClick={handleClick}>Like ({likes})</button>
    </div>
  )
}

// ReactDOM.render(<HomePage />, app) // ReactDOM.render 在18 被废弃了
// 在18 中, 使用如下写法
// const root = ReactDOM.createRoot(getElementById('root'))
// root.render(<HomePage />)
