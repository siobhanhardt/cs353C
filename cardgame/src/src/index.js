import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'
import DrawCard from './page/DrawCard/Index'
import Dashboard from './page/Dashboard/Index'
import DeckManage from './page/DeckManage'
import Login from './page/Login'
import {
    createBrowserRouter,
    RouterProvider
} from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));


const router = createBrowserRouter([
    {
      path: "/",
      element: <Login/>
    },
    {
      path: "/dashboard",
      element: <Dashboard/>
    },
    {
      path: "/drawCard",
      element: <DrawCard/>
    },
    {
      path: "/deckManage",
      element: <DeckManage/>
    }
  ]);

root.render(
   <RouterProvider router={router}></RouterProvider>
);

