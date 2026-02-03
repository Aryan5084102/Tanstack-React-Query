import axios from 'axios'
import './App.css'
import { useQuery } from '@tanstack/react-query';
import TodoTable from './components/TodoTable'

function App() {
  const fetchData = async() =>{
    const res = await axios.get('https://dummyjson.com/todos')
    return res?.data?.todos;
  }

  const {data, isLoading, isError, error} = useQuery({
    queryKey: ['todos'],
    queryFn: fetchData,
    staleTime: 5 * 1000,
  })

  console.log(data, "data")
  
  if(isLoading){
    return <div>Loading...</div>
  }
  
  if(isError){
    return <div>Error: {error?.message}</div>
  }

  return (
    <div>
      <h6>Tanstack / React Query</h6>
      <TodoTable todos={data} />
    </div>
  )
}

export default App;
