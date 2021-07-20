import User from '../../utils/UserAPI'
import axios from 'axios'
import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams
} from "react-router-dom";

const Listing = props => {
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
      <button>message seller</button>
    </div>
  )
}

export default Listing