import axios from 'axios'
const localStorage = window.localStorage

const Listing = {
  getAll: () => axios.get('/api/listings', {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  }),
  create: listing => axios.post('/api/listings', listing, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  })
}

export default Listing
