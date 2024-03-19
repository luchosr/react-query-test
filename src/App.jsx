// 3 - importamos usequery para hacer el data fetching
import { useQuery } from '@tanstack/react-query'

function App() {
  // 4 - generamos un objecto que utiliza usequery para manejar el resultado del data fetching
  const {} = useQuery({
    queryKey: ['todo'],
    queryFn: () => fetch('https://jsonplaceholder.typicode.com/todos/'),
  })
  return <>Hello World</>
}

export default App

//'https://jsonplaceholder.typicode.com/todos/'
