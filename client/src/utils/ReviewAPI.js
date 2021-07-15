import axios from 'axios'
const localStorage = window.localStorage

const Review = {
  create: comment => axios.post('/api/reviews', comment, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  })
}

export default Review
