import OutlinedInput from '@material-ui/core/OutlinedInput'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import User from '../../utils/UserAPI'
import { useState } from 'react'

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      display: 'flex'
    }
  }
}))

const LoginForm = props => {
  const [loginState, setLoginState] = useState({
    username: '',
    password: ''
  })

  const handleInputChange = ({ target }) => {
    setLoginState({ ...loginState, [target.name]: target.value })
  }

  const handleLoginUser = event => {
    event.preventDefault()
    User.login(loginState)
      .then(({ data: token }) => {
        localStorage.setItem('token', token)
        localStorage.setItem('username', loginState.username)
        window.location = '/'
      })
  }
  const classes = useStyles()

  return (
    <form className={classes.root} noValidate autoComplete='off'>
      <FormControl fullWidth variant='outlined'>
        <InputLabel htmlFor='username'>Username</InputLabel>
        <OutlinedInput
          id='username'
          labelWidth={75}
          name='username'
          value={loginState.username}
          onChange={handleInputChange}
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
          value={loginState.password}
          onChange={handleInputChange}
        />
      </FormControl>
      <br />
      <Button onClick={handleLoginUser} variant='outlined' color='primary'>
        Login
      </Button>
    </form>
  )
}

export default LoginForm
