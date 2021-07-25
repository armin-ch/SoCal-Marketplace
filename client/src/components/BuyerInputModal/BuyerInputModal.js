import React, { useEffect, useState } from 'react'
import User from '../../utils/UserAPI'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function FormDialog(props) {
  const classes = useStyles();
  const [username, setUsername] = useState('')
  const [snackopen, setsnackOpen] = React.useState(false);

  const handleSnackClick = () => {
    setOpen(true);
  };

  const handleSnackClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setsnackOpen(false);
  };

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const markSold = id => {
    console.log(props.id)
    const date = new Date().setDate(new Date().getDate())
    axios.put(`/api/listings/${id}`, { isSold: true, buyer: username, selldate: date }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(({ data: listing }) => {
        console.log(listing)
        axios.put(`/api/users/${listing.buyer}/listing`, { history: listing.id }, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })
        .then(() => {
          handleClose()
          console.log('listing marked as sold')
          alert('Listing marked as Sold!')
        })
      })
      .catch(err => console.log(err))
  }

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen} size="small">
        Mark as Sold
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Buyer's Username</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please Enter the buyer's username.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="username"
            label="Username"
            type="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={() => markSold(props.id)} color="primary">
            Complete Sale
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}