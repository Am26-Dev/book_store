import React from 'react'
import { Link } from 'react-router-dom'
import { useFirebase } from '../context/Firebase'

export const Navbar = () => {

  const firebase = useFirebase()

  return (
    <div>
      <div className='border border-b-2 p-4 flex justify-evenly'>
        <ul className='flex gap-5 text-xl font-semibold'>
        <Link to="/">
            <li>Home</li>
          </Link>
          <Link to="/addlisting">
            <li>Add listings</li>
          </Link>
        </ul>
        {
        firebase.isLoggedIn ? <button
        onClick={() => firebase.signOutUser()}
        className="border border-purple-500 w-fit p-2 rounded-full"
      >
        Logout
      </button> : <Link to="/signup">
        <button className="border border-purple-500 w-fit p-2 rounded-full">Sign up</button>
      </Link>
      }

      </div>

    </div>
  )
}
