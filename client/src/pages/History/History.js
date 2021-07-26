import Typography from '@material-ui/core/Typography'
import ListingCard from '../../components/ListingCard'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import Dashboard from '../../components/DashBoard'
import { useParams } from 'react-router-dom'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import { useEffect, useState } from 'react'
import Listing from '../../utils/ListingAPI'
import User from '../../utils/UserAPI'
import axios from 'axios'



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
  }
}))

const History = () => {
  const classes = useStyles();
  const [historyState, sethistoryState] = useState({
    history: []
  })
  const [userState, setUserState] = useState({
    user: {}
  })

  useEffect(() => {
    const username = localStorage.getItem('username')
    axios.get(`/api/users/history/${username}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(({data: history}) => {
        console.log(history)
        sethistoryState({ ...historyState, history })
      })
  }, [])

  return (
    <div className={classes.root1}>
      <Dashboard />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth='xl'>
          <h1>Purchase History</h1>
          <Paper component='div' style={{ backgroundColor: '#cfe8fc', minHeight: '80vh', padding: '20px', marginTop: '5vh' }}>
            <Typography variant='h4'>
              {(historyState.history.length > 0) ? 'Your Purchase History: ' : 'You Have No Recorded Purchases, Please Contact The Seller If A Purchased Item Is Not Showing Here'}
            </Typography>
            <Grid container xs={12} sm={12} md={12} lg={12} spacing={2}>
            {
              historyState.history.map(listing => (
                <Grid item xs={12} sm={12} md={6}>
                  <ListingCard
                    title={listing.title}
                    imageURL={listing.imageURL}
                    body={listing.body}
                    seller={listing.seller.username}
                    date={listing.datePosted}
                    id={listing._id}
                    buyer={listing.buyer}
                    showSellerInfo={false}
                    showRating={true}
                    updateRating={true}
                    isSold={listing.isSold}
                    datesold={listing.selldate}
                    rating={listing.rating}
                  />
                </Grid>
              ))
            }
            </Grid>
          </Paper>
        </Container>
      </main>
    </div>

  )
}

export default History
