import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

// 1 - Instanciamos los providers que vamos a usar

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient({})

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* 2 - usamos un wrapper para proveer el queryClient */}
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>
)
