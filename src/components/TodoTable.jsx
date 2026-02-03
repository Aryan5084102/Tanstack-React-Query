import React from 'react'
import './TodoTable.css'

const TodoTable = ({todos}) => {
  return (
    <div className="table-container">
      <table className="custom-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Todo</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {todos.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td className="todo-text">{item.todo}</td>
              <td>
                <span className={`status-badge ${item.completed ? 'completed' : 'pending'}`}>
                  {item.completed ? 'Done' : 'In Progress'}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default TodoTable