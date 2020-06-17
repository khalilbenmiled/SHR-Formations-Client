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
import EqualizerIcon from '@material-ui/icons/Equalizer';
import { useLocation } from 'react-router-dom'

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
    width: "30%",
    textAlign: "right",
    marginTop: "5px",
    marginRight: "2px",
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
    marginTop: "45px",
    height: "300px",
  },

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
  const rows = props.mesNotifications
  const nbrOpened = props.nbrOpened
  const [anchorEl, setAnchorEl] = React.useState(null);


  let location = useLocation();

  const openNotification = (event) => {
    setAnchorEl(event.currentTarget);
  }
  const closeNotification = () => {
    props.setNotifications()
    setAnchorEl(null);
  }

  const deleteNotifications = () => {
    props.deleteNotifications()
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





          <Menu
            id={id}
            anchorEl={anchorEl}
            keepMounted
            open={openNotif}
            onClose={closeNotification}
            className={classes.menu}
          >

            {rows.map((notif, index) => {
              return (
                <MenuItem style={{ backgroundColor: notif.opened ? "" : "rgba(243,170,93,0.8)" }} key={index} onClick={closeNotification}  >
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <div style={{ fontSize: "12px" }}>
                      <p>{notif.message}</p>
                    </div>
                    <div style={{ fontSize: "12px" }}>
                      {notif.date}
                    </div>
                  </div>
                </MenuItem>
              )
            })}

            <MenuItem onClick={deleteNotifications} style={{ paddingTop: " 20px", color: "#B51B10", fontSize: "11px", width: "200px", height: "5px" }} >
              <div className="row">
                <div className="col-lg-12 col-md-12">
                  Effacer tous
                </div>
              </div>
            </MenuItem>

          </Menu>



          <Typography variant="h6" noWrap className={classes.userInfos}>
            {props.user.email}
          </Typography>
          <IconButton aria-describedby={id} onClick={openNotification} aria-label="cart">
            <StyledBadge badgeContent={nbrOpened}  >
              <NotificationsIcon style={{ color: "#FED217", width: 25, height: 25 }} />
            </StyledBadge>
          </IconButton>
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
          <Link to="/dashboard" className="navlink"  >
            <ListItem button style={{ backgroundColor: location.pathname === "/dashboard" ? "rgba(238,134,24,0.7)" : "" }}>
              <ListItemIcon>
                < EqualizerIcon style={{ color: "#B51B10" }} />
              </ListItemIcon>
              <ListItemText primary="Dashboard" className={classes.itemText} />
            </ListItem>
          </Link>

          <Link to="/besoins" className="navlink">
            <ListItem button style={{ backgroundColor: location.pathname === "/besoins" ? "rgba(238,134,24,0.7)" : "" }}>
              <ListItemIcon>
                < HelpOutlineIcon style={{ color: "#B51B10" }} />
              </ListItemIcon>
              <ListItemText primary="Besoins" />
            </ListItem>
          </Link>


          <Link hidden={JSON.parse(localStorage.user).role !== "COLLABORATEUR" ? true : false} to="/collaborateurs" className="navlink">
            <ListItem button style={{ backgroundColor: location.pathname === "/collaborateurs" ? "rgba(238,134,24,0.7)" : "" }}>
              <ListItemIcon>

                < PersonIcon style={{ color: "#B51B10" }} />
              </ListItemIcon>
              <ListItemText primary="Collaborateurs" />
            </ListItem>
          </Link>

          <Link to="/formations" className="navlink">
            <ListItem button style={{ backgroundColor: location.pathname === "/formations" ? "rgba(238,134,24,0.7)" : "" }}>
              <ListItemIcon>

                < LocalLibraryIcon style={{ color: "#B51B10" }} />
              </ListItemIcon>
              <ListItemText primary="Formations" />
            </ListItem>
          </Link>

          <Link hidden={JSON.parse(localStorage.user).role === "COLLABORATEUR" ? true : false} to="/themes" className="navlink">
            <ListItem button style={{ backgroundColor: location.pathname === "/themes" ? "rgba(238,134,24,0.7)" : "" }}>
              <ListItemIcon>
                < GroupWorkIcon style={{ color: "#B51B10" }} />
              </ListItemIcon>
              <ListItemText primary="Themes/Modules" />
            </ListItem>
          </Link>

          <Link hidden={JSON.parse(localStorage.user).role !== "SERVICEFORMATIONS" ? true : false} to="/cabinetsFormateurs" className="navlink">
            <ListItem button style={{ backgroundColor: location.pathname === "/cabinetsFormateurs" ? "rgba(238,134,24,0.7)" : "" }}>
              <ListItemIcon>
                < AccountBalanceIcon style={{ color: "#B51B10" }} />
              </ListItemIcon>
              <ListItemText primary="Cabinets/Formateurs" />
            </ListItem>
          </Link>

          <Link to="/salles" className="navlink">
            <ListItem hidden={JSON.parse(localStorage.user).role !== "SERVICEFORMATIONS" ? true : false} button style={{ backgroundColor: location.pathname === "/salles" ? "rgba(238,134,24,0.7)" : "" }}>
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
            <ListItem style={{ backgroundColor: location.pathname === "/documents" ? "rgba(238,134,24,0.7)" : "" }} hidden={JSON.parse(localStorage.user).role !== "SERVICEFORMATIONS" ? true : false} button>
              <ListItemIcon>
                < DescriptionIcon style={{ color: "#B51B10" }} />
              </ListItemIcon>
              <ListItemText primary="Documents" />
            </ListItem>
          </Link>

          <Link to="/elearning" className="navlink">
            <ListItem style={{ backgroundColor: location.pathname === "/elearning" ? "rgba(238,134,24,0.7)" : "" }} hidden={JSON.parse(localStorage.user).role !== "SERVICEFORMATIONS" && JSON.parse(localStorage.user).role !== "COLLABORATEUR" ? true : false} button>
              <ListItemIcon >
                < CastForEducationIcon style={{ color: "#B51B10" }} />
              </ListItemIcon>
              <ListItemText primary="E-Learning" />
            </ListItem>
          </Link>

          <Divider hidden={JSON.parse(localStorage.user).role !== "SERVICEFORMATIONS" ? true : false} />
          <Divider hidden={JSON.parse(localStorage.user).role !== "SERVICEFORMATIONS" ? true : false} />

          <Link to="/utilisateurs" className="navlink">
            <ListItem style={{ backgroundColor: location.pathname === "/utilisateurs" ? "rgba(238,134,24,0.7)" : "" }} hidden={JSON.parse(localStorage.user).role !== "SERVICEFORMATIONS" ? true : false} button>
              <ListItemIcon >
                < SupervisorAccountIcon style={{ color: "#B51B10" }} />
              </ListItemIcon>
              <ListItemText primary="Utilisateurs" />
            </ListItem>
          </Link>

        </List>

      </Drawer>



    </div>
  );
}










