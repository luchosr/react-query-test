// 3 - importamos usequery para hacer el data fetching
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
// 7 - Usamos el query useMutation para mutar estados

function App() {
  const queryClient = useQueryClient()
  // 4 - generamos un objecto que utiliza usequery para manejar el resultado del data fetching

  // 5 - desestructuramos el resultado del fetching como por ejemplo usando "data"
  const { data, error, isLoading } = useQuery({
    queryKey: ['posts'],
    queryFn: () =>
      fetch('https://jsonplaceholder.typicode.com/posts/').then((res) =>
        res.json()
      ),

    // 11 - para poner un intervalo de fetching usamos refetchInterval
    refetchInterval: 6000,
    refetchOnWindowFocus: false,
    retry: 3,
  })

  // 8- definimos la funcion para mutar el estado desde el servidor
  const { mutate, isPending, isError, isSuccess } = useMutation({
    mutationFn: (newPost) =>
      fetch('https://jsonplaceholder.typicode.com/posts/', {
        method: 'POST',
        body: JSON.stringify(newPost),
        headers: { 'Content-type': 'application/json; charset=UTF-8' },
      }).then((res) => res.json()),

    // 9 - manejamos el éxito de la mutación con onSucces, necesitando importar el hook useQueryClient, ahora invalidamos las queryes de las keys que queramos, esto sirve para re fetchear la data que ya ha cambiado
    // onSuccess: () => {
    //   queryClient.invalidateQueries({ queryKey: ['posts'] })
    // },

    // 10 - en este caso en vez de invalidar, vamos a refrescar la cache para que la data se pueda renderizar:

    onSuccess: (newPost) => {
      queryClient.setQueryData(['posts'], (oldPosts) => [...oldPosts, newPost])
    },
  })

  // 6 - desestructurando el error y el estado de carga podemos hacer lo siguiente:
  if (error || isError) return <div>There was an error</div>

  if (isLoading) return <div>Now loading</div>
  return (
    <div>
      <button
        onClick={() =>
          mutate({ userId: 1000, id: 1001, title: 'Hola soy un título' })
        }
      >
        Add Post
      </button>
      {data?.map((todo) => (
        <div key={todo.id}>
          <p>ID:{todo.id}</p>
          <p>Title{todo.title}</p>
          <p>{todo.body}</p>
        </div>
      ))}
    </div>
  )
}

export default App

//'https://jsonplaceholder.typicode.com/todos/'
