import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { createBrowserRouter, RouterProvider} from "react-router-dom";
import { io, Socket } from 'socket.io-client';
import Room from './Room.tsx'

const socket : Socket = io('http://localhost:5000');

const BrowserRouter = createBrowserRouter([
  {
    path: "/",
    element: <App socket={socket}/>
  },
  {
    path: "/:roomId",
    element: <Room socket={socket}/>
  }
]);


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={BrowserRouter}/>
  </React.StrictMode>,
)
