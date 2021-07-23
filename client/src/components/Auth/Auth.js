import { makeStyles } from '@material-ui/core/styles'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'
import { Link } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },
  title: {
    flexGrow: 1
  },
  link: {
    color: 'inherit',
    textDecoration: 'none'
  }
}))

const StyledButton = withStyles({
  root: {
    background: 'linear-gradient(180deg, #38b2f4 10%, #383838 92%)',
    borderRadius: 6,
    border: 0,
    color: 'black',
    height: 48,
    padding: '0 30px',
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
  },
  label: {
    textTransform: 'capitalize',
  },
})(Button);


<StyledButton>classes shorthand</StyledButton>;


const Auth = props => {
  const classes = useStyles()

  return (
    <div className='test' id='test1'>
        <Toolbar>
          {
            !props.isLoggedIn
            ? (
              <Link className='btn' to='/login'>
                  <StyledButton className='btn2'>Login</StyledButton>
                </Link>
              )
              : (
                <StyledButton onClick={props.handleLogOut}>Logout</StyledButton>
                )
              }
              
        </Toolbar>
    </div>
  )
}

export default Auth
