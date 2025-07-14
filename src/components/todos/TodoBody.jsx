import TodoItem from './TodoItem'

const TodoBody = ({ todos }) => {

  return (
    <ul>
        {todos.map(todoItem => 
          <TodoItem 
            todo={todoItem} 
            key={todoItem.id}/>)}
    </ul>
  )
}

export default TodoBody