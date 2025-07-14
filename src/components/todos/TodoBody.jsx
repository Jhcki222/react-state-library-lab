import TodoItem from './TodoItem'

const TodoBody = ({ todos, onUpdate, onDelete }) => {

  return (
    <ul>
        {todos.map(todoItem => 
          <TodoItem 
            onUpdate={onUpdate}
            onDelete={onDelete}
            todo={todoItem} 
            key={todoItem.id}/>)}
    </ul>
  )
}

export default TodoBody