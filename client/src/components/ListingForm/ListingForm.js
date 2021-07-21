import { makeStyles } from '@material-ui/core/styles'
import FormControl from '@material-ui/core/FormControl'
import OutlinedInput from '@material-ui/core/OutlinedInput'
import InputLabel from '@material-ui/core/InputLabel'
import Button from '@material-ui/core/Button'
import Checkbox from '@material-ui/core/Checkbox'
import { useEffect, useState } from 'react'
import Listing from '../../utils/ListingAPI'
import { storage } from '../../firebase/firebase'
import Map from '../../components/Map'



const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      display: 'flex'
    }
  }
}))

const ListingForm = props => {
  const classes = useStyles()
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
            const date = new Date().setDate(new Date().getDate() - 10)
            Listing.create({
              title: props.title,
              rent: rentState,
              sell: saleState,
              body: props.body,
              price: props.price,
              datePosted: date,
              imageURL: fireBaseUrl
            })
              .then(({ data: listing }) => {
                console.log('done')
              })
          })
      })
  }




  const [rentState, setRentState] = useState(false)
  const handleCheckboxR = () => {
    setRentState(!rentState)
  }
  const [saleState, setSaleState] = useState(false)
  const handleCheckboxS = () => {
    setSaleState(!saleState)
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
          <Map />
        </FormControl>
      <FormControl>
        <input
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