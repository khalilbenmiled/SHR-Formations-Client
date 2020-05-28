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
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, DialogContentText, TextField } from '@material-ui/core';
import ComponentModalQuiz from "./component-modal-quiz"
import StarsIcon from '@material-ui/icons/Stars';
import ComponentQuiz from "./component-quiz"
import ComponentListScores from "./component-list-scores"
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import ComponentListRessources from "./component-list-ressources"
import LinearProgress from '@material-ui/core/LinearProgress';

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
    const [value, setValue] = React.useState(JSON.parse(localStorage.user).role !== "SERVICEFORMATIONS" ? 1 : 0);
    const [openQuiz, setOpenQuiz] = React.useState(false);
    const [quizToDelete, setQuizToDelete] = React.useState("");
    const [openModalDelete, setOpenModalDelete] = React.useState(false);
    const [files, setFiles] = React.useState([]);
    const [nomFile, setNomFile] = React.useState("");
    const [descriptionFile, setDescriptionFile] = React.useState("");

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

    const upload = () => {

        const formData = new FormData();
        formData.append('file', files)
        formData.append('nom', nomFile)
        formData.append('description', descriptionFile)
        props.upload(formData)
        setNomFile("")
        setDescriptionFile("")
        setFiles([])
    }

    const fileChangeHandler = (e) => {
        setFiles(e.target.files[0])
    }

    const onChangeNomFile = (e) => {
        setNomFile(e.target.value)
    }

    const onChangeDescriptionFile = (e) => {
        setDescriptionFile(e.target.value)
    }

    const disableUpload = () => {
        if (nomFile === "" || descriptionFile === "" ) {
            return 1
        } else {
            return 0
        }
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
                    <Tab hidden={JSON.parse(localStorage.user).role !== "SERVICEFORMATIONS" ? true : false} style={{ outline: "none" }} label="Gerer QUIZ" icon={<SettingsIcon />} />
                    <Tab style={{ outline: "none" }} label="Resultats Quiz" icon={<ListAltIcon />} />
                    <Tab hidden={JSON.parse(localStorage.user).role !== "COLLABORATEUR" ? true : false} style={{ outline: "none" }} label="Quiz" icon={<StarsIcon />} />
                    <Tab style={{ outline: "none" }} label="Ressources" icon={<LibraryBooksIcon />} />
                </Tabs>
            </AppBar>
            <SwipeableViews
                axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                index={value}
                onChangeIndex={handleChangeIndex}
            >

                <TabPanel hidden={JSON.parse(localStorage.user).role !== "SERVICEFORMATIONS" ? true : false} value={value} index={0} dir={theme.direction} >
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
                    <ComponentListScores scores={props.scores} formations={props.formations} />
                </TabPanel>

                <TabPanel hidden={JSON.parse(localStorage.user).role !== "COLLABORATEUR" ? true : false} value={value} index={2} dir={theme.direction}>
                    <ComponentQuiz
                        quizCollaborateurs={props.quizCollaborateurs}
                        passerQuiz={props.passerQuiz}
                        rateFormation={props.rateFormation}
                        formations={props.formations}
                    />
                </TabPanel>

                <TabPanel value={value} index={3} dir={theme.direction}>
                    <div className="row">
                        <div className="col-lg-12 col-md-12">
                            <ComponentListRessources listDocs={props.listDocs} />
                        </div>
                    </div>
                    <LinearProgress style={{marginTop : "-17px" , marginBottom : "15px" }} hidden={!props.loadingList} variant="query"  />
                    
                    <div hidden={JSON.parse(localStorage.user).role !== "SERVICEFORMATIONS" ? true : false} className="row" style={{ marginTop: "10px", padding: "20px 20px", backgroundColor: "#F5F5F5", boxShadow: "0px 0px 2px" }} >

                        <div className="col-lg-12 col-md-12">
                            <div className="row">
                                <div className="col-lg-4 col-md-4" style={{ marginTop: "7px" }}>
                                    <input type="file" className={classes.upload} name="file" onChange={fileChangeHandler} />
                                </div>
                                <div className="col-lg-4 col-md-4">
                                    <TextField value={nomFile} onChange={onChangeNomFile} type="text" size="small" label="Nom" variant="outlined" style={{ backgroundColor: "white" }}  > </TextField>
                                </div>
                                <div className="col-lg-4 col-md-4">
                                    <TextField value={descriptionFile} onChange={onChangeDescriptionFile} type="text" size="small" label="Description" variant="outlined" style={{ backgroundColor: "white" }}  > </TextField>
                                </div>
                            </div>

                            <div className="row" style={{ marginTop: "20px", paddingLeft: "400px" }}>
                                <div className="col-lg-4 col-md-4 offset-lg-8 offset-md-4">
                                    <Button disabled={disableUpload() === 1 ? true : false} onClick={upload} className={classes.buttonStyles} size="small" variant="outlined" >
                                        Upload
                                    </Button>
                                </div>
                            </div>
                        </div>

                    </div>
                    <LinearProgress hidden={!props.loadingUpload} variant="query" color="secondary" />
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
        </div >


    );
}
