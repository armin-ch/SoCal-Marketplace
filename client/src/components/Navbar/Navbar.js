import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import User from '../../utils/UserAPI';
import Auth from '../Auth'

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
  const [meState, setMeState] = useState({
    me: {},
    isLoggedIn: true
  })

  const getMe = () => {
    User.me()
      .then(({ data: me }) => {
        if (me) {
          setMeState({ me, isLoggedIn: true })
        } else {
          getMe()
        }
      })
      .catch(err => {
        console.error(err)
        setMeState({ ...meState, isLoggedIn: false })
      })
  }

  const handleLogOut = () => {
    localStorage.removeItem('token')
    setMeState({ me: {}, isLoggedIn: false })
    window.location = '/login'
  }

  useEffect(() => {
    getMe()
  }, [])

  const updateMe = () => {
    User.me()
      .then(({ data: me }) => {
        console.log(me)
        setMeState({ me, isLoggedIn: true })
      })
      .catch(err => {
        console.error(err)
        setMeState({ ...meState, isLoggedIn: false })
      })
  }
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
          <Link className={classes.link} to='/SellItem'>
            <Button color='inherit'>Sell Item</Button>
          </Link>
          <Link className={classes.link} to='/DashBoard'>
            <Button color='inherit'>DashBoard</Button>
          </Link>
          <Link className={classes.link} to={`/profile/${props.username}`}>
            <Button color='inherit'>Profile</Button>
          </Link>
          <Link className={classes.link} to='/login'>
            <Button color='inherit'>{props.isLoggedIn ? 'Logout' : 'Login'}</Button>
          </Link>
          <Auth />
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default Navbar