import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import Applicants from './Applicants.jsx'
import Form from './Form.jsx'
import Instructions from './Instructions.jsx'
import ErrorPage from './ErrorPage.jsx'

const router = createBrowserRouter([
  {
    path:"/",
    element:<Applicants/>,
    errorElement:<ErrorPage/>
  },
  {
    path:"/form",
    element:<Form/>,
    errorElement:<ErrorPage/>
  },
  {
    path:"/Instructions",
    element:<Instructions/>,
    errorElement:<ErrorPage/>
  }
])

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={router}/>)
