import MonetizationOnIcon from '@material-ui/icons/MonetizationOn'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import DashboardIcon from '@material-ui/icons/Dashboard'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import CategoryComponent from '../CategoryComponent'
import ViewListIcon from '@material-ui/icons/ViewList'
import ListItem from '@material-ui/core/ListItem'
import ChatIcon from '@material-ui/icons/Chat'
import { Link } from 'react-router-dom'
import React from 'react'

export const ListItems = props => {
  return (
    <div>
      <Link to='/' style={{ textDecoration: 'none', color: 'black' }}>
        <ListItem button>
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
      </Link>
      <ListItem>
        <ListItemIcon>
          <ViewListIcon />
        </ListItemIcon>
        {/* <ListItemText primary="Categories" /> */}
      <CategoryComponent />
      </ListItem>
      <Link to='/SellItem' style={{ textDecoration: 'none', color: 'black' }}>
        <ListItem button>
          <ListItemIcon>
            <MonetizationOnIcon />
          </ListItemIcon>
          <ListItemText primary="Sell" />
        </ListItem>
      </Link>
      <Link to='/chat' style={{ textDecoration: 'none', color: 'black' }}>
        <ListItem button>
          <ListItemIcon>
            <ChatIcon />
          </ListItemIcon>
          <ListItemText primary="Chat" />
        </ListItem>
      </Link>
      <Link to='/Profile' style={{ textDecoration: 'none', color: 'black' }}>
        <ListItem button>
          <ListItemIcon>
            <AccountCircleIcon />
          </ListItemIcon>
          <ListItemText primary="My Profile" />
        </ListItem>
      </Link>
      <Link to='/History' style={{ textDecoration: 'none', color: 'black' }}>
        <ListItem button>
          <ListItemIcon>
            <HistoryIcon />
          </ListItemIcon>
          <ListItemText primary="History" />
        </ListItem>
      </Link>

    </div>
  )
}

export default ListItems

