import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import LocalLibraryIcon from '@material-ui/icons/LocalLibrary';
import EventNoteIcon from '@material-ui/icons/EventNote';
import ComponentStepper from "./component-stepper"
import ComponentCalendrier from "./component-calendrier"
import SettingsIcon from '@material-ui/icons/Settings';
import ComponentListFormations from "./component-list-formations"
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
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



const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function ScrollableTabsButtonAuto(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          inkbarstyle={{ background: '#B51B10' }}
          style={{ color: "#B51B10" }}
          variant="fullWidth"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example"

        >
          <Tab style={{ outline: "none" }} label="Planifier" icon={< EventNoteIcon style={{ color: "#B51B10" }} />} />
          <Tab style={{ outline: "none" }} label="Consulter les formations" icon={< LocalLibraryIcon style={{ color: "#B51B10" }} />} />
          <Tab style={{ outline: "none" }} label="Gérer formations" icon={< SettingsIcon style={{ color: "#B51B10" }} />} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <ComponentStepper
          listBesoins={props.listBesoins}
          besoinSelected={props.besoinSelected}
          quarterSelected={props.quarterSelected}
          listBesoinsSelected={props.listBesoinsSelected}
          nbrParticipants={props.nbrParticipants}
          besoinUnselected={props.besoinUnselected}
          dateDebutSelected={props.dateDebutSelected}
          dateFinSelected={props.dateFinSelected}
          ajouterSession={props.ajouterSession}
          sessions={props.sessions}
          sessionSelected={props.sessionSelected}
          onChangeDuree={props.onChangeDuree}
          ajouterSessionFormation={props.ajouterSessionFormation}
          participantsSelected={props.participantsSelected}
          formateurSelected={props.formateurSelected}
          cabinetSelected={props.cabinetSelected}
          deleteBesoin={props.deleteBesoin}
          closePanel={props.closePanel}
        />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <ComponentCalendrier events={props.formations} />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <ComponentListFormations
          formations={props.listFormations}
          sessions={props.sessions}
          quarterSelected={props.quarterSelected}
          ajouterSession={props.ajouterSession}
          refreshCalendrier={props.refreshCalendrier}
        />
      </TabPanel>
    </div>
  );
}
