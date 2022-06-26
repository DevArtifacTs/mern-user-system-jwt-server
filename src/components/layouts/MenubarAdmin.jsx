import React from 'react'
import { Link } from 'react-router-dom' 



const MenubarAdmin = () => {
  return (
    <nav>
        <ul className='nav flex-column' >
            <li className="nav-item">
                <Link  to='/admin/home' >
                    Dashboard 
                </Link>
            </li>

            <li className="nav-item"> 
                <Link to ='/admin/manage-admin'>
                    User Management 
                </Link>    
            </li>
        </ul>
    </nav>
  )
}

export default MenubarAdmin