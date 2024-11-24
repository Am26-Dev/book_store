import React from 'react'
import { useFirebase } from '../context/Firebase'

export const Home = () => {

  const firebase = useFirebase()

  return (
    <div>This is the home page

      <button 
        onClick={()=>firebase.signOutUser()}
      className='border border-purple-500'>Logout</button>
    </div>
  )
}
