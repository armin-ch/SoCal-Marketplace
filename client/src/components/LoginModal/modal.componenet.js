import { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import FormControl from '@material-ui/core/FormControl'
import OutlinedInput from '@material-ui/core/OutlinedInput'
import InputLabel from '@material-ui/core/InputLabel'
import Button from '@material-ui/core/Button'
import User from '../../utils/UserAPI'
import { useLocation, useHistory } from 'react-router-dom'
import Modal from 'react-modal'
import './modal.css'
import { withStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      display: 'flex'
    }
  }
}))
const StyledButton = withStyles({
  root: {
    background: 'linear-gradient(180deg, #38b2f4 10%, #383838 92%)',
    borderRadius: 6,
    border: 0,
    color: 'black',
    height: 48,
    width: 24,
    padding: '0 30px',
    boxShadow: '2px 5px 5px 2px rgba(255, 255, 255, .3)',
  },
  label: {
    textTransform: 'capitalize',
  },
})(Button);


const ModalComponent = props => {
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
  
  
  const [isOpen, setIsOpen] = useState(false);
  
  function openModal() {
    setIsOpen(!isOpen);
  }
  
  return (
    <div>
          
      {
        !props.isLoggedIn
          ? (
            
            <StyledButton onClick={openModal}>Login</StyledButton>
            
          )
          : (
            <StyledButton onClick={props.handleLogOut}>Logout</StyledButton>
          )
      }

          <Modal
            className="custom_modal"
            overlayClassName="custom_overlay"                
            onRequestClose={openModal}
            contentLabel="Tiny nomadic modal popover"
            isOpen={isOpen}>
            <div>
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
            </div>
            <button onClick={openModal}>X </button>
          </Modal>
        </div>
      );
    

}

export default ModalComponent;