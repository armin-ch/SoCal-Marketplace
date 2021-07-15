import { makeStyles } from '@material-ui/core/styles'
import FormControl from '@material-ui/core/FormControl'
import OutlinedInput from '@material-ui/core/OutlinedInput'
import InputLabel from '@material-ui/core/InputLabel'
import Button from '@material-ui/core/Button'
import { Checkbox } from '@material-ui/core'

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

      <FormControl fullWidth variant='outlined'>
        <InputLabel htmlFor='title'>Title</InputLabel>
        <OutlinedInput
        id='title'
        labelWidth={50}
        name={props.title}
        onChange={props.handleInputChange}
        />
      </FormControl>

      <br />

      <Button
        id='rent'
        value={props.rent}
        name='rent'
        onClick={props.rent === true}
        variant='outlined'
        color='primary'>
        FOR RENT
      </Button>

      <Button
        id='sell'
        value={props.sell}
        name='sell'
        onClick={props.sell && true}
        variant='outlined'
        color='primary'>
          FOR SALE
      </Button>
      <FormControl fullWidth variant='outlined'>
        <InputLabel htmlFor='body'>Body</InputLabel>
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
          labelWidth={50}
          name={props.price}
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