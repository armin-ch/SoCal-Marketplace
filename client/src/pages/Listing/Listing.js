import User from '../../utils/UserAPI'
import axios from 'axios'
import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { ChatEngine, getOrCreateChat } from 'react-chat-engine'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams
} from "react-router-dom";

const Listing = props => {
  const [username, setUsername] = useState('')
  const chatAuth = {
    'projectID':'8dd8b8ef-62c5-4332-8643-dbc0c92cf501',
    'userName':localStorage.getItem('username'),
    'userSecret':'pass1234'
  }
  const CreateDMChat = () => {
    let chat = { 'usernames': [listingState.seller.username ]}
    const callback = (chat) => console.log(chat)

    getOrCreateChat(chatAuth, chat, callback)
    window.location = '/chat'
  }

  let { id } = useParams()
  const [listingState, setListingState] = useState('')


  useEffect(() => {
  axios.get(`/api/listings/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  })
  .then(listing=>{
    console.log(listing.data)
    setListingState(listing.data)
  })
  }, [])

  return (
    <div>
      <h1>listing page</h1>
      <h1>{listingState.title} $ {listingState.price}</h1>
      <h3>{listingState.body}</h3>
      <img src={listingState.imageURL} alt={listingState.title}/>
      <br/>
      <button onClick={CreateDMChat}>message seller</button>
    </div>
  )
}

export default Listing