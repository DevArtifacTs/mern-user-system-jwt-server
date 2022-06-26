import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'


function LoadingToRedirect() {

    const [count, setCount] = useState(3);
    const navigate = useNavigate();

    useEffect(() => {
        const interval = setInterval(() => {
            setCount(prevCount => prevCount - 1);
        }, 1000);
        //redirect
  
        return () => clearInterval(interval);
    }, [])

    count === 0 && navigate('/') ;

  return (
    <div>
       <h1>
            No Permission, redirect in {count}
        </h1> 
    </div>
  )
}

export default LoadingToRedirect