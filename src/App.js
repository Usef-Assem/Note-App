import React from 'react'
import { createBrowserRouter, createHashRouter, RouterProvider } from 'react-router-dom'
import Register from './components/register/Register'
import Layout from './components/register/layout/Layout'
import Login from './components/register/login/Login'
import Home from './components/register/home/Home'
import ProtectedRoute from './components/register/ProtectedRoute/ProtectedRoute'
import InverseProtectedRoute from './components/register/InverseProtectedRoute/InverseProtectedRoute'

export default function App() {
  let routes = createHashRouter([{
    path: "" , element: <Layout/>, children:[
      {index: true , element: <InverseProtectedRoute><Register/></InverseProtectedRoute>},
      {path: "home" , element: <ProtectedRoute><Home/></ProtectedRoute>},
      {path: "login" , element: <InverseProtectedRoute><Login/></InverseProtectedRoute>}
    ]
  }])
  return <>
  <RouterProvider router={routes}></RouterProvider>
  </>
}
