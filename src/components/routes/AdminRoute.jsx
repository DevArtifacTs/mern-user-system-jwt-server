import React, {useState, useEffect} from 'react'
import { useSelector } from 'react-redux'
import LoadingToRedirect from './LoadingToRedirect'
import { currentAdmin} from '../functions/auth'


function UserRoute({children}) {

  const {username, token} = useSelector(state => state.auth);
  const [isAdmin, setIsAdmin] = useState(false);
  
  useEffect(()=>{
    if(username && token){

      currentAdmin(token)
      .then(res=>{

        console.log(res);
        setIsAdmin(true);
      }).catch(err => {
        
        console.log(err);
        setIsAdmin(false);

      })
    }
  }, [username, token])

  return (
    <>
      {isAdmin 
      ? children
      : <LoadingToRedirect />
      }
    </>
  )
}

export default UserRoute