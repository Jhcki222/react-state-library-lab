// rafce
import React from 'react'
import TodoItem from './TodoItem'

// 함수형 컴포넌트 TodoBody
const TodoBody = ({ todos }) => {

  return (
    <ul>
      {/* props로 내려받은 todos 배열로 map 연산 */}
        {todos.map(todoItem => 
          <TodoItem 
            todo={todoItem} 
            key={todoItem.id}/>)}
    </ul>
  )
}

export default TodoBody