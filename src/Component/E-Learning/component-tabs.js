import React from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import ListAltIcon from '@material-ui/icons/ListAlt';
import SettingsIcon from '@material-ui/icons/Settings';
import ComponentListQuiz from "./component-list-quiz"
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, DialogContentText } from '@material-ui/core';
import ComponentModalQuiz from "./component-modal-quiz"

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
    const [openQuiz, setOpenQuiz] = React.useState(false);
    const [quizToDelete, setQuizToDelete] = React.useState("");
    const [openModalDelete, setOpenModalDelete] = React.useState(false);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleChangeIndex = index => {
        setValue(index);
    };

    const closeQuiz = () => {
        setOpenQuiz(false)
    }

    const openModalQuiz = () => {
        setOpenQuiz(true)
    }

    const openModalDeleteQuiz = (quiz) => {
        setQuizToDelete(quiz)
        setOpenModalDelete(true)
    }

    const closeModalDelete = () => {
        setOpenModalDelete(false)
    }

    const deleteQuiz = () => {
        props.deleteQuiz(quizToDelete)
        closeModalDelete(true)
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
                    <Tab style={{ outline: "none" }} label="Gerer QUIZ" icon={<SettingsIcon />} />
                    <Tab style={{ outline: "none" }} label="Resultats Quiz" icon={<ListAltIcon />} />
                </Tabs>
            </AppBar>
            <SwipeableViews
                axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                index={value}
                onChangeIndex={handleChangeIndex}
            >

                <TabPanel value={value} index={0} dir={theme.direction} >
                    <ComponentListQuiz
                        listQuiz={props.listQuiz}
                        formations={props.formations}
                        openModalDeleteQuiz={openModalDeleteQuiz}
                        addQTF={props.addQTF}
                    />
                    <Button onClick={openModalQuiz} className={classes.buttonStyles} size="small" variant="outlined" >
                        Ajouter un QUIZ
                    </Button>
                </TabPanel>

                <TabPanel value={value} index={1} dir={theme.direction}>

                </TabPanel>

            </SwipeableViews>
            <ComponentModalQuiz ajouterQuiz={props.ajouterQuiz} open={openQuiz} handleClose={closeQuiz} formations={props.formations} />

            <Dialog
                open={openModalDelete}
                onClose={closeModalDelete}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle className="titleDialog">Supprimer BESOIN</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Voulez-vous vraiment supprimer ce quiz ?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button className="annulerBtn" onClick={closeModalDelete} style={{ backgroundColor: "#E67A0A", color: "white" }}>
                        Retour
                    </Button>
                    <Button className="supprimerBtn" onClick={deleteQuiz} style={{ backgroundColor: "#B51B10", color: "white" }} >
                        Supprimer
                    </Button>
                </DialogActions>
            </Dialog>
        </div>


    );
}
