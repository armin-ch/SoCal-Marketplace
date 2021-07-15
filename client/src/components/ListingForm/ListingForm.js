import { makeStyles } from '@material-ui/core/styles'
import FormControl from '@material-ui/core/FormControl'
import OutlinedInput from '@material-ui/core/OutlinedInput'
import InputLabel from '@material-ui/core/InputLabel'
import Button from '@material-ui/core/Button'
import Checkbox from '@material-ui/core/Checkbox';


const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      display: 'flex'
    }
  }
}))

const ListingForm = props => {
  const classes = useStyles()

  return(
    <form className={classes.root} noValidate autoComplete='off'>

      <FormControl fullWidth variant='outloned'>
        <InputLabel htmlFor='title'>Post Title</InputLabel>
        <OutlinedInput
        id='title'
        labelWidth={50}
        name={props.title}
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
        onClick={props.rent === true}
        variant='outlined'
        color='primary'
        />
      </p>
      <p>
        <span style={{ marginTop: "13px" }}>For Sale</span>

        <Checkbox
          id='rent'
          value={props.rent}
          name='rent'
          onClick={props.rent === true}
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
      <FormControl fullWidth variant='outlined'>
        <InputLabel htmlFor='price'>Price</InputLabel>
        <OutlinedInput
          id='price'
          labelWidth={10}
          name={props.price}
          onChange={props.handleInputChange}
        />
      </FormControl>
    </form>
  )
}

export default ListingForm