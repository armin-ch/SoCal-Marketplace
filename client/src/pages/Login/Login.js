import RegisterForm from '../../components/RegisterForm'
import CssBaseline from '@material-ui/core/CssBaseline'
import Typography from '@material-ui/core/Typography'
import LoginForm from '../../components/LoginForm'
import Container from '@material-ui/core/Container'
import AppBar from '@material-ui/core/AppBar'
import Paper from '@material-ui/core/Paper'
import Tabs from '@material-ui/core/Tabs'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import Tab from '@material-ui/core/Tab'
import User from '../../utils/UserAPI'
import PropTypes from 'prop-types'
import { useState } from 'react'
import axios from 'axios'

function TabPanel(props) {
  const { children, value, index, ...other } = props

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  )
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
}

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`
  }
}

const Login = props => {
  const [registerState, setRegisterState] = useState({
    name: '',
    email: '',
    username: '',
    password: ''
  })

  const handleRegisterInputChange = ({ target }) => {
    setRegisterState({ ...registerState, [target.name]: target.value })
  }

  const handleRegisterUser = event => {
    event.preventDefault()
    User.register(registerState)
      .then(() => {
        handleChangeIndex({}, 0)
        axios.post('https://api.chatengine.io/users/', {
          username: registerState.username,
          secret: 'pass1234',
          email: registerState.email
        }, {
          headers: {
            'PRIVATE-KEY': '7d89f76d-2d18-487c-b98c-301eb61c29db'
          }
        })
          .then(({ data: token }) => {
            localStorage.setItem('token', token)
            localStorage.setItem('username', registerState.username)
            window.location = '/'
          })
      })
}
const [index, setIndex] = useState(0)

const handleChangeIndex = (event, newIndex) => {
  setIndex(newIndex)
}

return (
  <>
    <CssBaseline />
    <Container maxWidth='md'>
      <Paper component='div' style={{ backgroundColor: '#cfe8fc', height: '55vh', marginTop: '5vh' }}>
        <AppBar position='static'>
          <Tabs
            aria-label='simple tabs example'
            variant='fullWidth'
            value={index}
            onChange={handleChangeIndex}
          >
            <Tab label='Login' {...a11yProps(0)} />
            <Tab label='Register' {...a11yProps(1)} />
          </Tabs>
        </AppBar>
        <TabPanel value={index} index={0}>
          <LoginForm updateMe={props.updateMe} />
        </TabPanel>
        <TabPanel value={index} index={1}>
          <RegisterForm
            state={registerState}
            onChange={handleRegisterInputChange}
            onClick={handleRegisterUser}
          />
        </TabPanel>
      </Paper>
    </Container>
  </>
)
}

export default Login