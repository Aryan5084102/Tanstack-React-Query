import React from 'react'
import './TodoForm.css'
import { useForm } from 'react-hook-form'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'

const TodoForm = () => {
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const postData = async (newTodo) =>{
    const postTodo = await axios.post('https://dummyjson.com/todos/add', {
      id: newTodo.id,
      todo: newTodo.todo,
      completed: newTodo.status === 'Completed',
      userId: 2,
    }, {
      headers: {'Content-Type': 'application/json'}
    }
    )
    return postTodo;
  }
  const mutation = useMutation({
    mutationFn: postData,
    onSuccess: (data) =>{
      queryClient.invalidateQueries({queryKey: ['Todos']})
      console.log("Success", data)
      alert("Task Added Successfully!")
    },
    onError: (error) =>{
      console.log("Error", error)
    }
  
  })
 
  const onSubmit = (data) =>{
    mutation.mutate(data)
  }
 
  return (
    <div className="form-container">
      <form onSubmit={handleSubmit(onSubmit)}  className="jewelry-form">
        <h3>Add New Task</h3>
        
        <div className="input-group">
          <label>ID</label>
          <input 
            type="number" 
            name="id" 
            placeholder="e.g. 101"
            {...register('id')}
          />
        </div>

        <div className="input-group">
          <label>Task Description</label>
          <input 
            type="text" 
            name="todo" 
            placeholder="e.g. Update Gold Rate"
            {...register('todo')}
          />
        </div>

        <div className="input-group">
          <label>Status</label>
          <select name="status" {...register('status')} >
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        <button type="submit" className="submit-btn">Add to List</button>
      </form>
    </div>
  )
}

export default TodoForm