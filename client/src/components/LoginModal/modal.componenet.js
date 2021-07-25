import { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import User from '../../utils/UserAPI'
import Modal from 'react-modal'
import './modal.css'
import { withStyles } from '@material-ui/core/styles';
import Login from '../../pages/Login'


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
              <Login />
<button id='close' onClick={openModal}>Close</button>
            </div>
          </Modal>
        </div>
      );
    

}

export default ModalComponent;