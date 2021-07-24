import { useState, useEffect } from 'react'
import io from 'socket.io-client'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Login from './pages/Login'
import User from './utils/UserAPI'
import SellItem from './pages/SellItem'
import Profile from './pages/Profile'
import Chat from './pages/Chat'
import UserProfile from './pages/UserProfile'
import Listing from './pages/Listing'
import './App.css'
import Category from './pages/Category'




const App = () => {
  // const history = useHistory()
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

  const PrivateRoute = ({ children, ...rest }) => {
    return (
      <Route
        {...rest}
        render={({ location }) => meState.isLoggedIn
          ? (
            children
          )
          : (
            <Redirect to={{
              pathname: '/login',
              state: { from: location }
            }}
            />
          )}
      />
    )
  }

  return (
    <Router>
      <div>
        <Navbar 
          me={meState.me}
          isLoggedIn={meState.isLoggedIn}
          handleLogOut={handleLogOut}
        />
        <Switch>
          <Route exact path='/'>
            <Home />
          </Route>
          <Route exact path='/profile/:username'>
            <UserProfile />
          </Route>
          <Route exact path='/login'>
            <Login updateMe={updateMe} />
          </Route>
          <Route exact path='/sellItem'>
            <SellItem />
          </Route>
          <Route exact path='/Profile'>
            <Profile />
          </Route>
          <Route exact path='/chat'>
            <Chat />
          </Route>
          <Route exact path='/listing/:id'>
            <Listing />
          </Route>
          <Route exact path='/category/:category'>
            <Category />
          </Route>
        </Switch>
      </div>
    </Router>
  )
}

export default App