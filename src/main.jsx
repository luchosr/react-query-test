import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

// 1 - Instanciamos los providers que vamos a usar

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

// 12 - usamos parámetros por default para manejar el tiempo de fetching de toda la app, staleTime es para manejar el tiempo de fetching y gcTime es para limpiar la cache
const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: 6000, gcTime: 10 * (60 * 1000) } },
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* 2 - usamos un wrapper para proveer el queryClient */}
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>
)
