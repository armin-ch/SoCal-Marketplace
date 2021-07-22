import User from '../../utils/UserAPI'
import Button from '@material-ui/core/Button'
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
import {
  GoogleMap,
  useLoadScript
} from "@react-google-maps/api";

const libraries = ["places"];
const mapContainerStyle = {
  height: "40vh",
  width: "100%",
};

const Listing = props => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: 'AIzaSyCzfVue49sMcwHHa1FXAYDiSrpE1CTJ6IE',
    libraries,
  });
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
  console.log(listingState.isSold)

  const mapRef = React.useRef();
  const onMapLoad = React.useCallback((map) => {
    mapRef.current = map;
  }, []);

  if (loadError) return "Error";
  if (!isLoaded) return "Loading...";

  return (
    <div>
      <h1>listing page</h1>
      {listingState.isSold ? <h2>This item is marked as sold by the seller</h2> : null }
      <h1>{listingState.title} $ {listingState.price}</h1>
      <h3>{listingState.body}</h3>
      <div style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}>
      <img src={listingState.imageURL} alt={listingState.title} style={{height: 250, width: 250}}/>
      </div>
      <br/>
      <GoogleMap
        id="map"
        mapContainerStyle={mapContainerStyle}
        zoom={14}
        center={{
          lat: listingState.lat,
          lng: listingState.lng
        }}
        onLoad={onMapLoad}
      />
      <Button variant="contained" color="primary" onClick={CreateDMChat}>message seller</Button>
    </div>
  )
}

export default Listing