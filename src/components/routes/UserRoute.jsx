import React from 'react'
import { useSelector } from 'react-redux'
import LoadingToRedirect from './LoadingToRedirect'

function UserRoute({children}) {

  const {username, token} = useSelector(state => state.auth);
  
  return (
    <>
      {username && token 
      ? children
      : <LoadingToRedirect />
      }
    </>
  )
}

export default UserRoute