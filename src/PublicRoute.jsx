import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom'

const PublicRoute = () => {

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return isAuthenticated ? <Navigate to="/" replace/> :  <Outlet/>
      
}

export default PublicRoute
