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
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';
import Button from '@material-ui/core/Button'
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { Link } from "react-router-dom";
import './navbar.css'
import wallpaper from "../../images/wallpaper.jpg"

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    backgroundImage : `url(${wallpaper})`,
    backgroundPosition : "20% 90%"
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
  tabulation : {
    marginLeft : '0px',
    border : '1px solid #E0E0E0',
    backgroundColor : '#F5F5F5',
  },
  toolbar: theme.mixins.toolbar,
  Typography : {
    width : '80%'
  },
  userInfos : {
    fontSize : "14px",
    width : "15%"
  },
  logout : {
    cursor : 'pointer',
    color : 'white',
    width : '35px',
    height : '35px',
    "&:focus" : {
      outline : "none"
    }
  }
}));

export default function NavBar(props) {

  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          <Typography variant="h6" noWrap className={classes.Typography}>
            SHR-Formations
          </Typography>
          <Typography variant="h6" noWrap className={classes.userInfos}>
            {props.user.email}
          </Typography>
          <Button onClick={props.onLogOut}>< ExitToAppIcon className={classes.logout}/></Button>
            
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
       
        
        <List >
            <Link to="/dashboard" className="navlink">
            <ListItem button>
                <ListItemIcon>
                  < DashboardIcon  style={{color: "#B51B10"}}/>
                </ListItemIcon>
                <ListItemText primary="Dashboard" className={classes.itemText}/>
             </ListItem>
            </Link>
            <Link to="/besoins" className="navlink">
             <ListItem button >
                <ListItemIcon>
                  < HelpOutlineIcon style={{color: "#B51B10"}}/>
                </ListItemIcon>
                <ListItemText primary="Besoins" />
             </ListItem>
            </Link>
          
              <ListItem  button onClick={handleClick}>
                  <ListItemIcon>
                    <SupervisorAccountIcon style={{color: "#B51B10"}}/>
                  </ListItemIcon>
                  <ListItemText primary="Collaborateur" />
                  {open ? <ExpandLess /> : <ExpandMore />}
             </ListItem>
            
             <Collapse in={open} timeout="auto" unmountOnExit>
                    <List component="div"  className={classes.tabulation}>
                      <ListItem button className={classes.nested}>
                        <ListItemIcon />
                        <ListItemText primary="Profile" />
                      </ListItem>
                      <ListItem button className={classes.nested}>
                        <ListItemIcon />
                        <ListItemText primary="Cursus" />
                      </ListItem>
                    </List>
              </Collapse>
             <Link to="/formations" className="navlink">
              <ListItem button>
                  <ListItemIcon>
                    
                    < LocalLibraryIcon style={{color: "#B51B10"}}/>
                  </ListItemIcon>
                  <ListItemText primary="Formations" />
              </ListItem>
             </Link>
             <Link to="/cabinets" className="navlink">
              <ListItem button>
                  <ListItemIcon>
                    < AccountBalanceIcon style={{color: "#B51B10"}} />
                  </ListItemIcon>
                  <ListItemText primary="Cabinets/Formateurs" />
              </ListItem>
             </Link>
             <Link to="/salles" className="navlink">
              <ListItem button>
                  <ListItemIcon>
                    < MeetingRoomIcon style={{color: "#B51B10"}}/>
                  </ListItemIcon>
                  <ListItemText primary="Salles" />
              </ListItem>
             </Link>

        </List>
        <Divider />
        <List>
          <Link to="/documents" className="navlink">
            <ListItem button>
                <ListItemIcon>
                  < DescriptionIcon style={{color: "#B51B10"}}/>
                </ListItemIcon>
                <ListItemText primary="Documents" />
             </ListItem>
          </Link>
          <Link to="/eLearning" className="navlink">
             <ListItem button>
                <ListItemIcon >
                  < CastForEducationIcon style={{color: "#B51B10"}}/>
                </ListItemIcon>
                <ListItemText primary="E-Learning" />
             </ListItem>
          </Link>
          
        </List>
      </Drawer>

      
   }
    </div>
  );
}










