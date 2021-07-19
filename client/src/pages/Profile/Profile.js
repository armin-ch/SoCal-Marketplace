import { useEffect, useState } from 'react'
import User from '../../utils/UserAPI'

const Profile = () => {
  const [userState, setUserState] = useState('')
  return (
    <div>
      <h1>User {User.me}</h1>
    </div>
  )
}
export default Profile