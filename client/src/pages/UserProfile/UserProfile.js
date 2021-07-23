import User from '../../utils/UserAPI'
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ListingCard from '../../components/ListingCard'

const UserProfile = props => {
  let { username } = useParams()
  const [emailState, setEmailState] = useState('')
  const [listingState, setListingState] = useState([])

  async function showEmail() {
    let { data } = await User.profile(username)
    console.log(data.listings)
    setListingState(data.listings)
    setEmailState(data.email)
  }

  useEffect(() => {
    showEmail()
  }, [])

  console.log("listingState", listingState)
  return (
    <div>
      <h1>Seller {username}</h1>
      <h2>Contact Information:</h2>
      <h3>{emailState}</h3>
      <h2>Seller Listings:</h2>
      {listingState.length ? (
        listingState.map((listing, index) => {
          return <ListingCard
            title={listing.title}
            imageURL={listing.imageURL}
            body={listing.body}
            seller={username}
            date={listing.datePosted}
            id={listing._id} 
            showSellerInfo={"no"}/>
        })

      ) : (
        <h3>No listing's found for the {username}!!</h3>
      )}
    </div>
  )
}

export default UserProfile