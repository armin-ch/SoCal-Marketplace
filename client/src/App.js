import SearchResults from './pages/SearchResults'
import UserProfile from './pages/UserProfile'
import { useState, useEffect } from 'react'
import Category from './pages/Category'
import SellItem from './pages/SellItem'
import History from './pages/History'
import Listing from './pages/Listing'
import Profile from './pages/Profile'
import Home from './pages/Home'
import User from './utils/UserAPI'
import Login from './pages/Login'
import io from 'socket.io-client'
import Chat from './pages/Chat'
import Chat2 from './pages/chat2'
import './App.css'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom'




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
            <Chat2 />
          </Route>
          <Route exact path='/listing/:id'>
            <Listing />
          </Route>
          <Route exact path='/History'>
            <History />
          </Route>
          <Route exact path='/category/:category'>
            <Category />
          </Route>
          <Route exact path='/category/pets'>
            <Category />
          </Route>
          <Route exact path='/search/:search'>
            <SearchResults />
          </Route>

        </Switch>
      </div>
    </Router>
  )
}

export default App