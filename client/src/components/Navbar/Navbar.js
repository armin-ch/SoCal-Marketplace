import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import { Link } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    background: '#ff9100'
  },
  title: {
    flexGrow: 1
  },
  link: {
    color: 'inherit',
    textDecoration: 'none'
  }
}))

const Navbar = props => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <AppBar position='static'>
        <Toolbar>
          <Typography variant='h6' className={classes.title}>
            SoCal Marketplace
          </Typography>
          <Link className={classes.link} to='/'>
            <Button color='inherit'>Home</Button>
          </Link>
          <Link className={classes.link} to='/market'>
            <Button color='inherit'>Market</Button>
          </Link>
          <Link className={classes.link} to={`/profile/${props.username}`}>
            <Button color='inherit'>Profile</Button>
          </Link>
          <Link className={classes.link} to='/login'>
            <Button color='inherit'>{props.isLoggedIn ? 'Logout' : 'Login'}</Button>
          </Link>
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default Navbar