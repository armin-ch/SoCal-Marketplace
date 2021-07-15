import { useState, useEffect } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'
import Navbar from './components/Navbar'
import User from './utils/UserAPI'



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


  return (
    <Router>
      <div>
        <Navbar />
        <Switch>
          <Route exact path='/'>
            <h1>Home page</h1>
          </Route>
          <Route exact path='profile/:username'>
            <h1> Profile page</h1>
          </Route>
          <Route exact path='/login'>
            <h1>Login Page</h1>
          </Route>
        </Switch>
      </div>
    </Router>
  )
}

export default App