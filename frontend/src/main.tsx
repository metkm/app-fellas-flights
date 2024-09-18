import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Toaster } from '@/components/ui/sonner'
import './assets/index.css'

import Home from './pages/Home'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/flights',
    lazy: async () => {
      return {
        Component: (await import('./pages/Flights')).default
      }
    }
  }
])

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <main className='flex flex-col min-h-screen p-4'>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>

      <Toaster />
    </main>
  </StrictMode>,
)
