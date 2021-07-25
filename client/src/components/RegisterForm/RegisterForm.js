import OutlinedInput from '@material-ui/core/OutlinedInput'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      display: 'flex'
    }
  }
}))

const RegisterForm = props => {
  const classes = useStyles()

  return (
    <form className={classes.root} noValidate autoComplete='off'>
      <FormControl fullWidth variant='outlined'>
        <InputLabel htmlFor='name'>Name</InputLabel>
        <OutlinedInput
          id='name'
          labelWidth={75}
          name='name'
          value={props.state.name}
          onChange={props.onChange}
        />
      </FormControl>
      <br />
      <FormControl fullWidth variant='outlined'>
        <InputLabel htmlFor='email'>Email</InputLabel>
        <OutlinedInput
          type='email'
          id='email'
          labelWidth={75}
          name='email'
          value={props.state.email}
          onChange={props.onChange}
        />
      </FormControl>
      <br />
      <FormControl fullWidth variant='outlined'>
        <InputLabel htmlFor='username'>Username</InputLabel>
        <OutlinedInput
          id='username'
          labelWidth={75}
          name='username'
          value={props.state.username}
          onChange={props.onChange}
        />
      </FormControl>
      <br />
      <FormControl fullWidth variant='outlined'>
        <InputLabel htmlFor='password'>Password</InputLabel>
        <OutlinedInput
          type='password'
          id='password'
          labelWidth={75}
          name='password'
          value={props.state.password}
          onChange={props.onChange}
        />
      </FormControl>
      <br />
      <Button onClick={props.onClick} variant='outlined' color='primary'>
        Register
      </Button>
    </form>
  )
}

export default RegisterForm
