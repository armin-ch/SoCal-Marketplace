import User from '../../utils/UserAPI'
import { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import ListingCard from '../../components/ListingCard'
import Listing from '../../utils/ListingAPI'
import ListingForm from '../../components/LoginForm'
import Dashboard from '../../components/DashBoard'
// import Accordion from '@material-ui/core/Accordion'
// import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
// import AccordionSummary from '@material-ui/core/AccordionSummary'
// import AccordionDetails from '@material-ui/core/AccordionDetails'

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
  root: {
    width: '100%'
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular
  }
}))

const Profile = () => {
  const classes = useStyles();
  const [listingState, setListingState] = useState({
    listings: []
  })
  const [userState, setUserState] = useState({
    user: {}
  })

  useEffect(() => {
    User.me()
      .then(res => {
        console.log(res.data)
        const user = res.data
        setUserState({ ...userState, user })
        axios.get(`/api/listings/getall/${user._id}`)
          .then(({ data: listings }) => {
            console.log(listings)
            setListingState({ ...listingState, listings })
          })
      })
  }, [])

  return (
    <div className={classes.root1}>
      <Dashboard />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
    <Container maxWidth='xl'>
      <Paper component='div' style={{ backgroundColor: '#cfe8fc', minHeight: '80vh', padding: '20px', marginTop: '5vh' }}>
        {userState.user ? (
            <>
          <Typography variant='h4'>
            {userState.user.name}
          </Typography>
          <Typography variant='p'>
            {userState.user.email}
          </Typography>
          <hr />
          <Typography variant='h6'>
            {userState.user.username}
          </Typography>
          </>
          ): null}
        {
          listingState.listings.map(listing => (
            <Paper
              key={listing._id}
              elevation={3}
              style={{ padding: '20px', marginBottom: '20px' }}
            >
              <ListingCard
                title={listing.title}
                imageURL={listing.imageURL}
                body={listing.body}
                seller={userState.user.username}
                date={listing.datePosted}
                id={listing._id}
                showSellerInfo={"no"}
              />
            </Paper>
          ))
        }
      </Paper>
    </Container>
   </main> 
   </div>
    
  )
}

export default Profile
