import React from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { Button } from '@material-ui/core';
import SettingsIcon from '@material-ui/icons/Settings';
import ComponentListThemes from "./component-list-themes"
import ComponentModalTheme from "./component-modal-theme"
import ComponentListModules from "./component-list-modules"
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import ComponentModalModules from "./component-modal-module"

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
    const [openTheme, setOpenTheme] = React.useState(false);
    const [openModule, setOpenModule] = React.useState(false);



    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleChangeIndex = index => {
        setValue(index);
    };

    const openModalTheme = () => {
        setOpenTheme(true)
    }

    const closeModalTheme = () => {
        setOpenTheme(false)
    }

    const onChangeTheme = (e, value) => {   
        props.onChangeTheme(value)
    }

    const openModalModule = () => {
        setOpenModule(true)
    }

    const closeModalModule = () => {
        setOpenModule(false)
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
                    <Tab style={{ outline: "none" }} label="Gerer themes" icon={<SettingsIcon />} />
                    <Tab hidden style={{ outline: "none" }} label="Gerer modules" icon={<SettingsIcon />} />
                </Tabs>
            </AppBar>
            <SwipeableViews
                axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                index={value}
                onChangeIndex={handleChangeIndex}
            >

                <TabPanel value={value} index={0} dir={theme.direction} >
                    <ComponentListThemes themes={props.themes} deleteTheme={props.deleteTheme} modifierTheme={props.modifierTheme}/>
                    <Button className={classes.buttonStyles} size="small" variant="outlined" onClick={openModalTheme} >
                        Ajouter un theme
                    </Button>
                </TabPanel>

                <TabPanel hidden value={value} index={1} dir={theme.direction}>
                    <div className="row">
                        <div className="col-lg-12 col-md-12">
                            <Autocomplete
                                id="combo-box-demo"
                                size="small"
                                options={props.themes}
                                getOptionLabel={(option) => option.nom + " - " + option.type}
                                onChange={onChangeTheme}
                                style={{ marginLeft: "320px", width: 300 }}
                                renderInput={(params) => <TextField {...params} label="Theme" variant="outlined" />}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-12 col-md-12">
                            <ComponentListModules modules={props.modules} deleteModule={props.deleteModule} />
                            <Button className={classes.buttonStyles} size="small" variant="outlined" onClick={openModalModule}>
                                Ajouter un module
                            </Button>
                        </div>
                    </div>


                </TabPanel>

            </SwipeableViews>


            <ComponentModalTheme open={openTheme} handleClose={closeModalTheme} addAction={props.addAction} />
            <ComponentModalModules open={openModule} handleClose={closeModalModule} themes={props.themes} addModule={props.addModule} />
        </div>


    );
}
