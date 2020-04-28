import React from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import ComponentListFormateurs from "./component-list-formateurs"
import ComponentListCabinets from "./component-list-cabinets"
import { Button } from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person';
import ApartmentIcon from '@material-ui/icons/Apartment';
import ComponentModalCabinet from "./component-modal-cabinet"
import ComponentModalFormateur from "./component-modal-formateur"


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
    const [openCabinet, setOpenCabinet] = React.useState(false);
    const [openFormateur, setOpenFormateur] = React.useState(false);


    const openModalCabinet = () => {
        setOpenCabinet(true)
    }

    const openModalFormateur = () => {
        setOpenFormateur(true)
    }

    const handleCloseCabinet = () => {
        setOpenCabinet(false)
    }

    const handleCloseFormateur = () => {
        setOpenFormateur(false)
    }

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
                    inkbarstyle={{ background: '#B51B10' }}
                    style={{ color: "#B51B10" }}
                    variant="fullWidth"
                    aria-label="full width tabs example"
                >
                    <Tab style={{ outline: "none" }} label="Cabinets" icon={<ApartmentIcon />} />
                    <Tab style={{ outline: "none" }} label="Formateurs" icon={<PersonIcon />} />
                </Tabs>
            </AppBar>
            <SwipeableViews
                axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                index={value}
                onChangeIndex={handleChangeIndex}
            >

                <TabPanel value={value} index={0} dir={theme.direction} >
                    <ComponentListCabinets cabinets={props.cabinets} deleteCabinet={props.deleteCabinet} />
                    <Button className={classes.buttonStyles} size="small" variant="outlined" onClick={openModalCabinet} >
                        Ajouter un cabinet
                    </Button>
                </TabPanel>

                <TabPanel value={value} index={1} dir={theme.direction}>
                    <ComponentListFormateurs formateurs={props.formateurs} deleteFormateur={props.deleteFormateur} updateFormateur={props.updateFormateur}/>
                    <Button className={classes.buttonStyles} size="small" variant="outlined" onClick={openModalFormateur}>
                        Ajouter un formateur
                    </Button>
                </TabPanel>

            </SwipeableViews>

            <ComponentModalCabinet
                open={openCabinet}
                handleClose={handleCloseCabinet}
                addDomaine={props.addDomaine}
                addCabinet={props.addCabinet}
                domaines={props.domaines}
            />
            <ComponentModalFormateur
                open={openFormateur}
                handleClose={handleCloseFormateur}
                addFormateur={props.addFormateur}
            />
        </div>


    );
}
