import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import CancelIcon from '@material-ui/icons/Cancel';
import ComponentStepperAddFormation from "./component-stepper-add-formation"

const useStyles = makeStyles(theme => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: "white",
        "&:focus": {
            outline: "none"
        },
        borderRadius: "20px",
        width: 1100,
        height: "92vh",
        boxShadow: theme.shadows[5],

    },
    titre: {
        color: "#3D707E"
    },
    buttonStyles: {
        border: "1px solid #B51B10",
        marginLeft: "152px",
        marginTop: "10px",
        color: "#B51B10",
        "&:focus": {
            outline: "none"
        }
    },
    buttonAnnuler: {
        backgroundColor: "#E67A0A",
        color: "white",
        "&:focus": {
            outline: "none"
        },
        "&:hover": {
            backgroundColor: "#E67A0A",
            color: "white"
        }
    },
    buttonConfirmer: {
        backgroundColor: "#B51B10",
        color: "white",
        "&:focus": {
            outline: "none"
        },
        "&:hover": {
            backgroundColor: "#B51B10",
            color: "white"
        }
    },
    iconInfo: {
        color: "#ED7E0A",
        cursor: "pointer",
        marginLeft: "45px"
    },
    cancelcon: {
        width: "30px",
        height: "30px",
        color: "#fff",
        cursor: "pointer",
        marginTop: "13px"
    },
    title: {
        color: "#3D707E",
        marginBottom: "-5px"
    }
}));

export default function TransitionsModal(props) {
    const classes = useStyles();

    const handleClose = () => {
        props.handleClose()
    }

    return (
        <div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={props.open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={props.open}>
                    <div className={classes.paper}>


                        <div className="col-lg-12 col-md-12 " >

                            <div className="row headerModal">
                                <div className="col-lg-11 col-md-11">
                                    <h4 className="titreAction">Nouvelle formation </h4>
                                </div>
                                <div className="col-lg-1 col-md-1" align="center">
                                    <CancelIcon onClick={handleClose} className={classes.cancelcon} />
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-lg-12 col-md-12">
                                    <ComponentStepperAddFormation
                                        themes={props.themes}
                                        addAction={props.addAction}
                                        onChangeTheme={props.onChangeTheme}
                                        actionSelected={props.actionSelected}
                                        modules={props.modules}
                                        getModules={props.getModules}
                                        addModule={props.addModule}
                                        sessions={props.sessions}
                                        sessionSelected={props.sessionSelected}
                                        quarterSelected={props.quarterSelected}
                                        ajouterSession={props.ajouterSession}
                                        dateDebutSelected={props.dateDebutSelected}
                                        dateFinSelected={props.dateFinSelected}
                                        onChangeDuree={props.onChangeDuree}
                                        onChangeMaxParticipants={props.onChangeMaxParticipants}
                                        ajouterNouvelleFormation={props.ajouterNouvelleFormation}
                                        participantsSelected={props.participantsSelected}
                                        formateurSelected={props.formateurSelected}
                                        cabinetSelected={props.cabinetSelected}
                                    />
                                </div>
                            </div>


                        </div>
                    </div>

                </Fade>
            </Modal>
        </div>
    );
}
