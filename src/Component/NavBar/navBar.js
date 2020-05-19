import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import LocalLibraryIcon from '@material-ui/icons/LocalLibrary';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import DescriptionIcon from '@material-ui/icons/Description';
import CastForEducationIcon from '@material-ui/icons/CastForEducation';
import Button from '@material-ui/core/Button'
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { Link } from "react-router-dom";
import './navbar.css'
import wallpaper from "../../images/wallpaper.jpg"
import { IconButton, Menu, MenuItem } from '@material-ui/core';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Badge from '@material-ui/core/Badge';
import { withStyles } from '@material-ui/core/styles';
import Logo from "../../images/logo.png"
import GroupWorkIcon from '@material-ui/icons/GroupWork';
import PersonIcon from '@material-ui/icons/Person';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    backgroundImage: `url(${wallpaper})`,
    backgroundPosition: "20% 90%"
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,

  },
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  tabulation: {
    marginLeft: '0px',
    border: '1px solid #E0E0E0',
    backgroundColor: '#F5F5F5',
  },
  toolbar: theme.mixins.toolbar,
  Typography: {
    width: '80%'
  },
  userInfos: {
    fontSize: "14px",
    width: "15%"
  },
  logout: {
    cursor: 'pointer',
    color: 'white',
    width: '35px',
    height: '35px',
    "&:focus": {
      outline: "none"
    }
  },
  menu: {
    marginTop: "30px"
  }
}));

const StyledBadge = withStyles((theme) => ({
  badge: {
    right: -3,
    top: 0,
    border: `2px solid #FED217`,
    padding: '0 4px',
    color: "#B51B10",
    backgroundColor: "#FED217"
  },
}))(Badge);

export default function NavBar(props) {

  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState(null);

  const openNotification = (event) => {
    setAnchorEl(event.currentTarget);
  }
  const closeNotification = () => {
    setAnchorEl(null);
  }

  const openNotif = Boolean(anchorEl);
  const id = openNotif ? 'simple-popover' : undefined;

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          <Typography variant="h6" noWrap className={classes.Typography}>
            SHR-Formation
          </Typography>

          <IconButton hidden aria-describedby={id} onClick={openNotification} aria-label="cart">
            <StyledBadge badgeContent={4}  >
              <NotificationsIcon style={{ color: "#FED217", width: 25, height: 25 }} />
            </StyledBadge>
          </IconButton>



          <Menu
            id={id}
            anchorEl={anchorEl}
            keepMounted
            open={openNotif}
            onClose={closeNotification}
            className={classes.menu}
          >
            <MenuItem onClick={closeNotification}>Profile</MenuItem>
            <MenuItem onClick={closeNotification}>My account</MenuItem>
            <MenuItem onClick={closeNotification}>Logout</MenuItem>
          </Menu>



          <Typography variant="h6" noWrap className={classes.userInfos}>
            {props.user.email}
          </Typography>
          <Button onClick={props.onLogOut}>< ExitToAppIcon className={classes.logout} /></Button>

        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >

        <div className={classes.toolbar} />

        <img src={Logo} alt="logo" style={{ height: "70px", width: "200px", }} />
        <Divider />

        <List >
          <Link to="/dashboard" className="navlink">
            <ListItem button>
              <ListItemIcon>
                < DashboardIcon style={{ color: "#B51B10" }} />
              </ListItemIcon>
              <ListItemText primary="Dashboard" className={classes.itemText} />
            </ListItem>
          </Link>

          <Link to="/besoins" className="navlink">
            <ListItem button >
              <ListItemIcon>
                < HelpOutlineIcon style={{ color: "#B51B10" }} />
              </ListItemIcon>
              <ListItemText primary="Besoins" />
            </ListItem>
          </Link>


          <Link to="/collaborateurs" className="navlink">
            <ListItem button>
              <ListItemIcon>

                < PersonIcon style={{ color: "#B51B10" }} />
              </ListItemIcon>
              <ListItemText primary="Collaborateurs" />
            </ListItem>
          </Link>

          <Link  to="/formations" className="navlink">
            <ListItem button>
              <ListItemIcon>

                < LocalLibraryIcon style={{ color: "#B51B10" }} />
              </ListItemIcon>
              <ListItemText primary="Formations" />
            </ListItem>
          </Link>

          <Link hidden={JSON.parse(localStorage.user).role === "COLLABORATEUR" ? true : false} to="/themes" className="navlink">
            <ListItem button>
              <ListItemIcon>

                < GroupWorkIcon style={{ color: "#B51B10" }} />
              </ListItemIcon>
              <ListItemText primary="Themes/Modules" />
            </ListItem>
          </Link>

          <Link hidden={JSON.parse(localStorage.user).role !== "SERVICEFORMATIONS" ? true : false}  to="/cabinetsFormateurs" className="navlink">
            <ListItem button>
              <ListItemIcon>
                < AccountBalanceIcon style={{ color: "#B51B10" }} />
              </ListItemIcon>
              <ListItemText primary="Cabinets/Formateurs" />
            </ListItem>
          </Link>

          <Link hidden={JSON.parse(localStorage.user).role === "COLLABORATEUR" ? true : false}  to="/salles" className="navlink">
            <ListItem button>
              <ListItemIcon>
                < MeetingRoomIcon style={{ color: "#B51B10" }} />
              </ListItemIcon>
              <ListItemText primary="Salles" />
            </ListItem>
          </Link>

        </List>
        <Divider />
        <List>

          <Link to="/documents" className="navlink">
            <ListItem hidden={JSON.parse(localStorage.user).role !== "SERVICEFORMATIONS"  ? true : false} button>
              <ListItemIcon>
                < DescriptionIcon style={{ color: "#B51B10" }} />
              </ListItemIcon>
              <ListItemText primary="Documents" />
            </ListItem>
          </Link>

          <Link to="/elearning" className="navlink">
            <ListItem hidden={JSON.parse(localStorage.user).role !== "SERVICEFORMATIONS" && JSON.parse(localStorage.user).role !== "COLLABORATEUR" ? true : false} button>
              <ListItemIcon >
                < CastForEducationIcon style={{ color: "#B51B10" }} />
              </ListItemIcon>
              <ListItemText primary="E-Learning" />
            </ListItem>
          </Link>

          <Divider hidden={JSON.parse(localStorage.user).role !== "SERVICEFORMATIONS" ? true : false} />
          <Divider hidden={JSON.parse(localStorage.user).role !== "SERVICEFORMATIONS" ? true : false}/>

          <Link to="/utilisateurs" className="navlink">
            <ListItem hidden={JSON.parse(localStorage.user).role !== "SERVICEFORMATIONS" ? true : false} button>
              <ListItemIcon >
                < SupervisorAccountIcon style={{ color: "#B51B10" }} />
              </ListItemIcon>
              <ListItemText primary="Utilisateurs" />
            </ListItem>
          </Link>

        </List>

      </Drawer>


   }
    </div>
  );
}










