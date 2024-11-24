import React from 'react'
import { Link } from 'react-router-dom'


export const Navbar = () => {
  return (
    <div>
      <div className='border border-b-2 p-4'>
        <ul className='flex gap-5 text-xl font-semibold'>
        <Link to="/">
            <li>Home</li>
          </Link>
          <Link to="/addlisting">
            <li>Add listings</li>
          </Link>
        </ul>
      </div>

    </div>
  )
}
