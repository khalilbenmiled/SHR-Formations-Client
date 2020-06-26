import React from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import ComponentListUtilisateurs from "./component-list-utilisateurs"
import { Button } from '@material-ui/core';
import ComponentModalUtilisateur from "./component-modal-utilisateur"
import ExcelReader from './ExcelReader';

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
    buttonStyles: {
        border: "1px solid #B51B10",
        marginLeft: "0px",
        marginTop: "5px",
        color: "#B51B10",
        "&:focus": {
            outline: "none"
        }
    },

}));

export default function FullWidthTabs(props) {
    const classes = useStyles();
    const theme = useTheme();
    const [value, setValue] = React.useState(0);
    const [openUtilisateur, setOpenUtilisateur] = React.useState(false);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleChangeIndex = index => {
        setValue(index);
    };

    const openModalUtilisateur = () => {
        setOpenUtilisateur(true)
    }

    const closeModalUtilisateur = () => {
        setOpenUtilisateur(false)
    }




    return (
        <div className={classes.root} >
            <AppBar position="static" color="default">
                <Tabs
                    value={value}
                    onChange={handleChange}
                    inkbarstyle={{ background: '#B51B10' }}
                    style={{ color: "#B51B10" }}
                    variant="fullWidth"
                    aria-label="full width tabs example"
                >
                    <Tab style={{ outline: "none" }} label="Gerer Utilisateurs" icon={<SupervisorAccountIcon />} />

                </Tabs>
            </AppBar>
            <SwipeableViews
                axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                index={value}
                onChangeIndex={handleChangeIndex}
            >

                <TabPanel value={value} index={0} dir={theme.direction} >
                    <ComponentListUtilisateurs
                        users={props.users}
                        deleteUser={props.deleteUser}
                        listManager={props.listManager}
                        listTeamLead={props.listTeamLead}
                        teamleadSelected={props.teamleadSelected}
                        updateManagerTeamLead={props.updateManagerTeamLead}
                        updateTeamLeadManager={props.updateTeamLeadManager}
                        updateCollaborateur={props.updateCollaborateur}
                        activateUser={props.activateUser}
                    />
                    <Button className={classes.buttonStyles} size="small" variant="outlined" onClick={openModalUtilisateur}>
                        Ajouter un utilisateur
                    </Button>

                    <div>
                        <ExcelReader />
                    </div>
                </TabPanel>


            </SwipeableViews>

            <ComponentModalUtilisateur open={openUtilisateur}
                handleClose={closeModalUtilisateur}
                addUtilisateur={props.addUtilisateur}
                listTeamLead={props.listTeamLead}
                listManager={props.listManager}
                teamleadSelected={props.teamleadSelected}
                listFreeTeamLead={props.listFreeTeamLead}
            />

        </div>


    );
}
