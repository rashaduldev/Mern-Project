import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Root from './Root/Root';
import HomePage from './Layout/PublicRoute/HomePage/HomePage';
import About from './Pages/About/About';
import LoginPage from './Pages/LoginPage';
import SignupPage from './Pages/SignupPage';
import AuthProvider from './Provider/AuthProvider';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root/>,
    children:[
      {
        path:"/",
        element:<HomePage/>
      },
      {
        path:"/about",
        element:<About/>
      },
      {
        path:"login",
        element:<LoginPage />
      },
      {
        path:"signup",
        element:<SignupPage/>
      },
    ]
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
       <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
)
