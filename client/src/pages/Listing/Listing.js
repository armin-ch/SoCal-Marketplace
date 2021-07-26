import { makeStyles } from '@material-ui/core/styles'
import Dashboard from '../../components/DashBoard'
import { getOrCreateChat } from 'react-chat-engine'
import CheckIcon from '@material-ui/icons/Check'
import ClearIcon from '@material-ui/icons/Clear'
import React, { useState, useEffect } from 'react'
import Button from '@material-ui/core/Button'
import { Container } from '@material-ui/core'
import { useParams } from 'react-router-dom'
import Paper from '@material-ui/core/Paper'
import axios from 'axios'
import './style.css'
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
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 30, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
}));


const Listing = props => {
  const classes = useStyles();
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
  const [date, setDate] = useState('')


  useEffect(() => {
    axios.get(`/api/listings/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(listing => {
        console.log(listing.data)
        setListingState(listing.data)
        setUsername(listing.data.seller)
        setDate(listing.data.datePosted)
      })
  }, [])

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
        <div className={classes.root}>
   <Dashboard />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth='xl' className='grid-bg ba-grid anim'>
 <Paper component='div' style={{ backgroundColor: '#cfe8fc', minHeight: '80vh', padding: '20px', marginTop: '5vh', marginLeft: '6vh', marginRight: '6vh' }}>
        {/* <h1>listing page</h1> */}
        {listingState.isSold ? <h2>This item is marked as sold by the seller</h2> : null}
        <h1>{listingState.title} </h1>
        <hr />
        <h2>Price: $ {listingState.price}</h2>
        <hr />
        <h2>Listing Description:</h2>
        <h3>{listingState.body}</h3>
        <h5><span>Posted on {date.slice(0,10)}</span></h5>
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
        <h2>Seller Info</h2>
        <h4>Username:
           {username.username}
           <br/>
           Email: 
           {username.email}
           </h4>
        
        <div style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}>
        <Button variant="contained" color="primary" onClick={CreateDMChat}>message seller</Button>
        </div>
      </Paper>
        </Container>
      </main>
    </div>
  )
}

export default Listing