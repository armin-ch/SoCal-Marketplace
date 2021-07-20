import User from '../../utils/UserAPI'
import React, { useState } from "react";
import ReactDOM from "react-dom";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams
} from "react-router-dom";

const UserProfile = props => {
  let { username } = useParams()
  const [emailState, setEmailState] = useState('')

  async function showEmail() {
    let {data} = await User.profile(username)
    setEmailState(data.email)
  }
  let email = showEmail()
  return (
    <div>
      <h1>Seller {username}</h1>
      <h2>Contact Information:</h2>
      <h3>{emailState}</h3>
    </div>
  )
}

export default UserProfile