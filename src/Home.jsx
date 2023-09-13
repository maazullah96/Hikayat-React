import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { useAuthContext } from './context/AuthContext'
import { Outlet } from 'react-router-dom'
const Home = () => {
  const { user } = useAuthContext()
  return (
    <>
      <Outlet />
      {/* {user ? (
        <p>
          You are logged - <Link to='/dashboard'>View Dashboard</Link>
        </p>
      ) : (
        <p>
          <Link to='/login'>Log In</Link> or <Link to='/signup'>Sign Up</Link>
        </p>
      )} */}
    </>
  )
}

export default Home
