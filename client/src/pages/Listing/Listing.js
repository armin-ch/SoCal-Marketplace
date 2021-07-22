import User from '../../utils/UserAPI'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import axios from 'axios'
import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { ChatEngine, getOrCreateChat } from 'react-chat-engine'
import CheckIcon from '@material-ui/icons/Check'
import ClearIcon from '@material-ui/icons/Clear'
import FiberManualRecordOutlinedIcon from '@material-ui/icons/FiberManualRecordOutlined';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams
} from "react-router-dom";
import {
  GoogleMap,
  useLoadScript,
  Marker
} from "@react-google-maps/api";

const libraries = ["places"];
const mapContainerStyle = {
  height: "40vh",
  width: "100%",
};

const AnyReactComponent = ({ icon }) => <div>{icon}</div>;

const Listing = props => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: 'AIzaSyCzfVue49sMcwHHa1FXAYDiSrpE1CTJ6IE',
    libraries,
  });
  const [username, setUsername] = useState('')
  const chatAuth = {
    'projectID': '8dd8b8ef-62c5-4332-8643-dbc0c92cf501',
    'userName': localStorage.getItem('username'),
    'userSecret': 'pass1234'
  }
  const CreateDMChat = () => {
    let chat = { 'usernames': [listingState.seller.username] }
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
      .then(listing => {
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

  const image = {
    url: "https://img.icons8.com/ios/200/000000/circled.png",
  }
  return (
    <div>
      <Paper component='div' style={{ backgroundColor: '#cfe8fc', minHeight: '80vh', padding: '20px', marginTop: '5vh', marginLeft: '6vh', marginRight: '6vh' }}>
        {/* <h1>listing page</h1> */}
        {listingState.isSold ? <h2>This item is marked as sold by the seller</h2> : null}
        <h1>{listingState.title} </h1>
        <hr />
        <h2>Price: $ {listingState.price}</h2>
        <hr />
        <h2>Listing Description:</h2>
        <h3>{listingState.body}</h3>
        <hr />
        <h4>For Sale:
        {listingState.sell ? <CheckIcon /> : <ClearIcon />}
        </h4>
        <h4>For rent:
        {listingState.rent ? <CheckIcon /> : <ClearIcon />}
        </h4>
        <hr/>
        <h1>Listing Images</h1>
        <div style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}>
          <img src={listingState.imageURL} alt={listingState.title} style={{ height: 250, width: 250 }} />
        </div>
        <br />
        <hr/>
        <GoogleMap
          id="map"
          mapContainerStyle={mapContainerStyle}
          zoom={12}
          center={{
            lat: listingState.lat,
            lng: listingState.lng
          }}
          onLoad={onMapLoad}
        >
        <Marker
          key={`${listingState.lat}-${listingState.lng}`}
          position={{ lat: listingState.lat - 0.0123, lng: listingState.lng }}
          style={{ background: 'transparent' }}
          icon={image}
        />
        </GoogleMap>
        <hr/>
        <div style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}>
        <Button variant="contained" color="primary" onClick={CreateDMChat}>message seller</Button>
        </div>
      </Paper>
    </div>
  )
}

export default Listing