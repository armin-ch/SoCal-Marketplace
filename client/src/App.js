import { useState, useEffect } from 'react'
import io from 'socket.io-client'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Login from './pages/Login'
import User from './utils/UserAPI'
import Market from './pages/market'
import SellItem from './pages/SellItem'
import Profile from './pages/Profile'
import Chat from './pages/Chat'
import UserProfile from './pages/UserProfile'
import Listing from './pages/Listing'



const App = () => {
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


  return (
    <Router>
      <div>
        <Navbar />
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
          <Route exact path='/market'>
            <Market />
          </Route>
          <Route exact path='/sellItem'>
            <SellItem />
          </Route>
          <Route exact path='/Profile'>
            <Profile />
          </Route>
          <Route exact path='/chat'>
            <Chat />
          <Route exact path='/listing/:id'>
            <Listing />
          </Route>
        </Switch>
      </div>
    </Router>
  )
}

export default App