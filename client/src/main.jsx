import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Route,createBrowserRouter,createRoutesFromElements,RouterProvider } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import { Dashboard } from './Components/Dashboard.jsx'
import { Items } from './Components/Items.jsx'

const Main = ()=>{
  const route = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<App/>}>
        <Route path='/' element={<Dashboard />} />
        <Route path='/:id' element={<Items />} />
      </Route>
    )
  )
  return <RouterProvider router={route} />
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Main />
  </StrictMode>,
)
