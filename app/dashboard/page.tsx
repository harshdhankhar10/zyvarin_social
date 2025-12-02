import React from 'react'
import { currentLoggedInUserInfo } from '@/utils/currentLogegdInUserInfo'

const page = async () => {
    const user = await currentLoggedInUserInfo();

    
  return (
    <>
    {user ? (
      <div>
        <h1>Welcome, {user.fullName}!</h1>
      </div>
    ) : (
      <div>
        <h1>Please sign in to access the dashboard.</h1>
      </div>
    )}
    </>
  )
}

export default page