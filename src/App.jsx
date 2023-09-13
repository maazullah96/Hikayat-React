import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  createRoutesFromElements,
  createBrowserRouter
} from 'react-router-dom'
import Home from './Home'
import Dashboard from './Dashboard'
import Login from './Login'
import Signup from './Signup'
import { AuthProvider } from './context/AuthContext'

import { RouterProvider } from 'react-router-dom'

import Authors from './Authors'

import Books from './Books'

import Keywords from './Keywords'
import Categories from './Categories'
import Stories from './Stories'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Home />}>
      <Route path='dashboard' element={<Dashboard />}>
        <Route path='authors' element={<Authors />} />
        <Route path='books' element={<Books />} />
        <Route path='categories' element={<Categories />} />
        <Route path='keywords' element={<Keywords />} />
        <Route path='stories' element={<Stories />} />
      </Route>
      <Route path='login' element={<Login />} />
      <Route path='signup' element={<Signup />} />
    </Route>
  )
)

const App = () => {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  )
}

export default App
