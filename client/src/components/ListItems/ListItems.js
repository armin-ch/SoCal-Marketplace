import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import { Link } from 'react-router-dom';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';
import SearchInput from '../../components/searchInput';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import ChatIcon from '@material-ui/icons/Chat';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import HistoryIcon from '@material-ui/icons/History';

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
      <ListItem button>
        <ListItemIcon>
          <ShoppingCartIcon />
        </ListItemIcon>
        <ListItemText primary="Buy" />
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

