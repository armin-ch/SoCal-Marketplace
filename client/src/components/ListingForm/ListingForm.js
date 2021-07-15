import { makeStyles } from '@material-ui/core/styles'
import FormControl from '@material-ui/core/FormControl'
import OutlinedInput from '@material-ui/core/OutlinedInput'
import InputLabel from '@material-ui/core/InputLabel'
import Button from '@material-ui/core/Button'
import Checkbox from '@material-ui/core/Checkbox'
import { useEffect, useState } from 'react'


const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      display: 'flex'
    }
  }
}))

const ListingForm = props => {
  const classes = useStyles()

  const [rentState, setRentState] = useState(true)
  const handleCheckboxR = () => {
    setRentState(!rentState)
    console.log('rent' + rentState)
  }
  const [saleState, setSaleState] = useState(true)
  const handleCheckboxS = () => {
    setSaleState(!saleState)
    console.log('sell' + saleState)
  }
  return(
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
        <span style={{marginTop:"13px"}}>For Rent</span>
      
      <Checkbox
        id='rent'
        value={props.rent}
        name='rent'
        onChange={handleCheckboxR}
        variant='outlined'
        color='primary'/>
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
      <br/>
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
      <Button onClick={props.handleCreatePost} variant='outlined' color='primary'>
        Create Listing
      </Button>
    </form>
  )
}

export default ListingForm