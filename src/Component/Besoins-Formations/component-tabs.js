import React from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import ComponentStepper from "./component-stepper"
import ListAltIcon from '@material-ui/icons/ListAlt';
import CreateIcon from '@material-ui/icons/Create';
import ComponentListBesoins from "./component-list-besoins"
import DescriptionIcon from '@material-ui/icons/Description';
import ComponentFilterRapports from "./component-filter-rapport"

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};



const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: '100%',
    
  },
}));

export default function FullWidthTabs(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = index => {
    setValue(index);
  };

  return (
    <div className={classes.root} >
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          inkbarstyle={{background: '#B51B10'}}
          style = {{color : "#B51B10" }}
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab style={{outline : "none"}} label="Saisis des besoins" icon = {<CreateIcon />}/>
          <Tab style={{outline : "none"}}  label="Consulter les besoins"  icon = {<ListAltIcon />} />
          <Tab style={{outline : "none"}}label="Rapports" icon = {<DescriptionIcon />} />
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >

        <TabPanel value={value} index={0} dir={theme.direction} >
            <ComponentStepper 
                 themes={props.themes} 
                 onChangeTheme={props.onChangeTheme}
                 actionSelected={props.actionSelected}
                 modules = {props.modules}
                 projets = {props.projets}
                 radioSelected = {props.radioSelected}
                 stepper = {props.stepper}
                 moduleSelected = {props.moduleSelected}
                 getModules = {props.getModules}
                 getNbrPrevus = {props.getNbrPrevus}
                 getPriorite = {props.getPriorite}
                 getProjet = {props.getProjet}
                 addBesoin = {props.addBesoin}
                 addAction = {props.addAction}
                 addModule = {props.addModule}
                 addProjet = {props.addProjet}
                 onChangeTrimeter = {props.onChangeTrimeter}
              
            />
        </TabPanel>

        <TabPanel value={value} index={1} dir={theme.direction}>
            <ComponentListBesoins 
                listBesoins = {props.listBesoins}
                projets = {props.projets}
                onValiderBesoin = {props.onValiderBesoin}
                openAlertRemoveBesoin = {props.openAlertRemoveBesoin}
                openAlertAnnulerBesoin = {props.openAlertAnnulerBesoin}
            />
        </TabPanel>

        <TabPanel value={value} index={2} dir={theme.direction}>
          <ComponentFilterRapports />
        </TabPanel>

      </SwipeableViews>
    </div>
  );
}
