import { makeStyles } from '@material-ui/core/styles'
import FormControl from '@material-ui/core/FormControl'
import OutlinedInput from '@material-ui/core/OutlinedInput'
import InputLabel from '@material-ui/core/InputLabel'
import Button from '@material-ui/core/Button'
import Checkbox from '@material-ui/core/Checkbox'
import { useState } from 'react'
import Listing from '../../utils/ListingAPI'
import { storage } from '../../firebase/firebase'
import React from 'react';
import {
  GoogleMap,
  useLoadScript,
} from "@react-google-maps/api";
import "@reach/combobox/styles.css";
import MyLocationIcon from '@material-ui/icons/MyLocation';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import Tooltip from '@material-ui/core/Tooltip'
import LinearProgress from '@material-ui/core/LinearProgress';

let lat = 0, lng = 0

const libraries = ["places"];
const mapContainerStyle = {
  height: "40vh",
  width: "100%",
};

const center = { lat: 33.8919157, lng: -118.13325100000002 }

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      display: 'flex'
    }
  },
  fab: {
    margin: theme.spacing(2),
  },
  absolute: {
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(3),
  },
  bar: {
    width: '100%',
  }
}))

const ListingForm = props => {
  const classes = useStyles()
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: 'AIzaSyCzfVue49sMcwHHa1FXAYDiSrpE1CTJ6IE',
    libraries,
  });

  // category
  const [category, setCategory] = useState('')
  const [open, setOpen] = React.useState(false);

  const handleChange = (event) => {
    setCategory(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  // firebase stuff
  const allInputs = { imgUrl: '' }
  const [imageAsFile, setImageAsFile] = useState('')
  const [imageAsUrl, setImageAsUrl] = useState(allInputs)
  console.log(imageAsFile)
  const handleImageAsFile = (e) => {
    const image = e.target.files[0]
    setImageAsFile(imageFile => (image))
  }


  const handleCreatePost = event => {
    event.preventDefault()
    // more firebase stuff
    const uploadTask = storage.ref(`/images/${imageAsFile.name}`).put(imageAsFile)
    uploadTask.on('state_changed',
      (snapShot) => {
        //takes a snap shot of the process as it is happening
        console.log(snapShot)
      }, (err) => {
        //catches the errors
        console.log(err)
      }, () => {
        // gets the functions from storage refences the image storage in firebase by the children
        // gets the download url then sets the image from firebase as the value for the imgUrl key:
        storage.ref('images').child(imageAsFile.name).getDownloadURL()
          .then(fireBaseUrl => {
            setImageAsUrl(prevObject => ({ ...prevObject, imgUrl: fireBaseUrl }))

            console.log(fireBaseUrl)
            const date = new Date().setDate(new Date().getDate())
            Listing.create({
              title: props.title,
              rent: rentState,
              sell: saleState,
              body: props.body,
              price: props.price,
              lat: lat,
              lng: lng,
              datePosted: date,
              imageURL: fireBaseUrl,
              category: category
            })
              .then(({ data: listing }) => {
                console.log('done')
                console.log(listing)
                window.location=`/listing/${listing._id}`
              })
          })
      })
  }

  const [ coordsState, setCoordsState ] = useState('')
  const handleMap = ( ) => {
    setCoordsState(coordsState)
  }

  const mapRef = React.useRef();
  const onMapLoad = React.useCallback((map) => {
    mapRef.current = map
    if (mapRef.current.zoom < 14) {
        setProgress(0)
    }
  }, []);

  const [progress, setProgress] = React.useState()

  const panTo = React.useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(14)
    console.log(mapRef.current)
    if (mapRef.current.zoom === 14 ) {
      
      const timer = setInterval(() => {
        setProgress(100)
      }, 500)
      return () => {
        clearInterval(timer);
      };
    }
  }, []);



  const [rentState, setRentState] = useState(false)
  const handleCheckboxR = () => {
    setRentState(!rentState)
  }
  const [saleState, setSaleState] = useState(false)
  const handleCheckboxS = () => {
    setSaleState(!saleState)
  }

  if (loadError) return "Error";
  if (!isLoaded) return "Loading...";

  function Locate({ panTo }) {
    return (
      <div
        id='Compass'
        className="locate"
        onClick={() => { 
          const timer = setInterval(() => {
            setProgress((oldProgress) => {
              const diff = Math.random() * 15;
              return Math.min(oldProgress + diff, 100);
            });
          }, 700)
          navigator.geolocation.getCurrentPosition(
            (position) => {
              panTo({
                lat: position.coords.latitude,
                lng: position.coords.longitude,
              });
              lat = position.coords.latitude
              lng = position.coords.longitude
              console.log(position.coords.latitude)
              console.log(position.coords.longitude)
            },
            () => null
          );

        }
      }
      >
        <Tooltip title="Add Location" aria-label="add">
          <Fab color="primary" className={classes.fab}>
            <AddIcon />
          </Fab>
        </Tooltip>
        <p>Add Location  </p>
      </div>
    );
  }


  return (
    <form className={classes.root} noValidate autoComplete='off'>

      <FormControl fullWidth variant='outlined'>
        <InputLabel htmlFor='title'>Title</InputLabel>
        <OutlinedInput
          value={props.title}
          labelWidth={50}
          name='title'
          onChange={props.handleInputChange}
        />
      </FormControl>
      {/* category */}
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-controlled-open-select-label">Category</InputLabel>
        <Select
          labelId="demo-controlled-open-select-label"
          id="demo-controlled-open-select"
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          value={category}
          onChange={handleChange}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={process.env.REACT_APP_PET_ID}>Pets</MenuItem>
          <MenuItem value={process.env.REACT_APP_EL_ID}>Electronics</MenuItem>
          <MenuItem value={process.env.REACT_APP_HG_ID}>Home Goods</MenuItem>
          <MenuItem value={process.env.REACT_APP_VEHICLES_ID}>Vehicles</MenuItem>
          <MenuItem value={process.env.REACT_APP_CLOTHES_ID}>Clothes</MenuItem>

        </Select>
      </FormControl>

      <br />
      <p>
        <span style={{ marginTop: "13px" }}>For Rent</span>

        <Checkbox
          id='rent'
          value={props.rent}
          name='rent'
          onChange={handleCheckboxR}
          variant='outlined'
          color='primary' />
      </p>
      <p>
        <span style={{ marginTop: "13px" }}>For Sale</span>

        <Checkbox
          value={props.sell}
          name='sell'
          onChange={handleCheckboxS}
          variant='outlined'
          color='primary'
        />
      </p>
      <FormControl fullWidth variant='outlined'>
        <InputLabel htmlFor='body'>Description</InputLabel>
        <OutlinedInput
          id='body'
          labelWidth={50}
          multiline
          rows={4}
          name='body'
          value={props.body}
          onChange={props.handleInputChange}
        />
      </FormControl>
      <br />
      <FormControl fullWidth variant='outlined'>
        <InputLabel htmlFor='price'>Price</InputLabel>
        <OutlinedInput
          labelWidth={10}
          name='price'
          value={props.price}
          onChange={props.handleInputChange}
        />
      </FormControl>
      <br />
        <FormControl>

        <Locate 
          panTo={panTo}
          />
        <div className={classes.root}>
          <LinearProgress variant="determinate" value={progress}/>
        </div>
          <GoogleMap
            id="map"
            mapContainerStyle={mapContainerStyle}
            zoom={8}
            center={center}
            onLoad={onMapLoad}
            onChange={handleMap}
          >
          </GoogleMap>
        
        </FormControl>
      <FormControl>
        <OutlinedInput
          type="file"
          onChange={handleImageAsFile}
        />

      </FormControl>

      <Button onClick={handleCreatePost} variant='outlined' color='primary'>
        Create Listing
      </Button>
    </form>
  )
}


export default ListingForm