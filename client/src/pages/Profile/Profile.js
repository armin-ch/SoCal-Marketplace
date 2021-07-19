import User from '../../utils/UserAPI'
import { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import ListingCard from '../../components/ListingCard'
// import Accordion from '@material-ui/core/Accordion'
// import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
// import AccordionSummary from '@material-ui/core/AccordionSummary'
// import AccordionDetails from '@material-ui/core/AccordionDetails'




const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%'
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular
  }
}))

const Profile = () => {
  



  const classes = useStyles()
  const [userState, setUserState] = useState({
    user: {}
  })

  useEffect(() => {
    User.me()
      .then(res => {
        console.log(res.data)
        const user = res.data
        setUserState({ ...userState, user })
      })
    }, [])

  return (
    <Container maxWidth='xl'>
      <Paper component='div' style={{ backgroundColor: '#cfe8fc', minHeight: '80vh', padding: '20px', marginTop: '5vh' }}>
        <Paper
          elevation={3}
          style={{ padding: '20px', marginBottom: '20px' }}
        >
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
           
          {/* {
            userState.user.listings.map(listing => (
              <Paper
                key={listing._id}
                elevation={3}
                style={{ padding: '20px', marginBottom: '20px' }}
              >
                <Typography variant='h4'>
                  {listing.title}
                </Typography>
                <Typography variant='p'>
                  {listing.rent}
                </Typography>
                <hr />
                <Typography variant='h6'>
                  {listing.sell}
                </Typography>
                <Typography variant='h6'>
                  {listing.body}
                </Typography>
                <Typography variant='h6'>
                  {listing.price}
                </Typography>
                <Typography variant='h6'>
                  {listing.datePosted}
                </Typography>
                <Typography variant='h6'>
                  Created by {listing.seller.username}
                </Typography>
                <img src={listing.imageURL} alt={listing.title} />
              </Paper>
            ))
          } */}

        </Paper>
      </Paper>
    </Container>
  )
}

export default Profile