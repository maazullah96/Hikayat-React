import React from 'react'
import NavigationBar from './NavigationBar'
import Footer from './Footer'
import { Outlet } from 'react-router-dom'

const DashboardLayout = ({ children }) => {
  return (
    <>
      <NavigationBar />
      <Outlet />
      {/* <div>{children}</div> */}
      <Footer />
    </>
  )
}

export default DashboardLayout
