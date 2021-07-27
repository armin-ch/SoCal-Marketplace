import Typography from '@material-ui/core/Typography'
import ListingCard from '../../components/ListingCard'
import { makeStyles } from '@material-ui/core/styles'
import Dashboard from '../../components/DashBoard'
import Container from '@material-ui/core/Container'
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Rating from '@material-ui/lab/Rating'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import User from '../../utils/UserAPI'
import axios from 'axios'
import Footer from '../../components/Footer'

const drawerWidth = 240;


const useStyles = makeStyles((theme) => ({
  root1: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
}))

const UserProfile = props => {
  const classes = useStyles()
  let { username } = useParams()

  const [emailState, setEmailState] = useState('')
  const [ratingState, setRatingState] = useState('')
  const [listingState, setListingState] = useState({
    listings: []
  })

  async function showUser() {
    let { data } = await User.profile(username)
    console.log(data.listings)
    setRatingState(data.rating)
    setEmailState(data.email)
    setListingState(data.listings)
    console.log(data.rating)
  }

  useEffect(() => {
    showUser()
  }, [])

  const [userState, setUserState] = useState({
    user: {}
  })

  // useEffect(() => {
  //   User.profile()
  //     .then(res => {
  //       const user = res.data
  //       console.log(user)
  //       setUserState({ ...userState, user })
  //       axios.get(`/api/user/${username}`)
  //         .then(({ data: listings }) => {
  //           console.log(listings)
  //           setListingState({ ...listingState, listings })
  //         })
  //     })
  // }, [])

  console.log("listingState", listingState)
  return (
    <div className={classes.root1} >
      <Dashboard />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth='xl' style={{ padding: '0px' }}>
          <Container maxWidth='xl' className='grid-bg ba-grid anim'>
          <Paper component='div' style={{ backgroundColor: '#cfe8fc', minHeight: '89vh', padding: '20px', marginTop: '5vh' }}>
            <h1>{username}</h1>
            <Typography component="legend">Seller Rating</Typography>
            <Rating
              name="seller-rating"
              value={parseInt(ratingState)}
              precision={0.5}
              readOnly
            />
            <h2>Contact Information: {emailState}</h2>
            <Grid container xs={12} sm={12} md={12} lg={12} spacing={2}>
            {listingState.length ? (
              listingState.map((listing, index) => {
                if (!listing.isSold) {
                return (
                  <Grid item xs={12} sm={12} md={4}>
                <ListingCard
                  title={listing.title}
                  imageURL={listing.imageURL}
                  body={listing.body}
                  seller={username}
                  date={listing.datePosted}
                  id={listing._id}
                  />
                  </Grid>
                )
                }
              })
            

            ) : (
              <h3>No listing's found for the {username}!!</h3>
            )}
            </Grid>
          </Paper>
        <Footer />
        </Container>
        </Container>
      </main>
      </div>


  )
}

export default UserProfile