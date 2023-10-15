import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Room from './Room.tsx'

const BrowserRouter = createBrowserRouter([
  {
    path: "/",
    action: () => {
      return <App />
    }
  },
  {
    path: "/:roomid",
    action: () => {
      return <Room/>
    }
  }
]);


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={BrowserRouter}/>
  </React.StrictMode>,
)
