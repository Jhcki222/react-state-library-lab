import { useState } from "react"
import TodoBody from "./components/todos/TodoBody"
import TodoHeader from "./components/todos/TodoHeader"
import DefaultLayout from "./layouts/DefaultLayout"

// 외부 서버로부터 받은 데이터라고 가정(ex. fetch('url'))
const dummyTodos = [
  {
    id: 1,
    title: 'React 공부',
    summary: 'React를 공부한다.',
    category: 'TODO',
  },
  {
    id: 2,
    title: '점심 먹기',
    summary: '점심을 먹는다.',
    category: 'PROGRESS',
  },
  {
    id: 3,
    title: '커피 마시기',
    summary: '커피를 마신다.',
    category: 'DONE',
  }
]

function App() {

  // dummyTodos를 App.jsx가 관리하는 하나의 상태로 등록
  const [todos, setTodos] = useState(dummyTodos); // 초기값은 dummyTodos
  console.log(todos);

  // 1. 할일 등록 기능
  // TodoForm으로부터 전달받은 할일 객체를 가지고 todos 배열의 뒤쪽에 추가하는 로직
  const addTodoHandler = (todo) => {
    const newTodo = {
      id: self.crypto.randomUUID(), // ID 식별용 값
      ...todo
    }

    // 새롭게 업데이트할 할일 목록 데이터 생성
    const updatedTodos = [...todos, newTodo]; // ... JS Spread 문법
    // [{밥먹기}, {음료수}, {물}, {새로운 할일}]; 처럼 추가됨

    // 할일 상태값 갱신
    setTodos(updatedTodos);
  }

  return (
        <DefaultLayout>
          <header>
                <h1 className='pt-8 mx-auto text-red-200 max-w-max text-7xl'>
                  <img className='ml-4' src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Thought%20Balloon.png" alt="Thought Balloon" width="75" height="75" />
                  <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Animals/Seal.png" alt="Seal" width="75" height="75" />
                  </h1>
          </header>
          <section className='max-w-xl m-4 mx-auto'>
            <TodoHeader onAdd={addTodoHandler}/>
            <TodoBody todos={todos}/>
          </section>
        </DefaultLayout>
  )
}

export default App
