import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import CancelIcon from '@material-ui/icons/Cancel';
import ComponentListModulesFormation from "./component-list-modules-formation"
import ComponentListParticipants from "./component-list-participants"
import { Card, CardContent } from '@material-ui/core';

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
        width: 1000,
        height: "90vh",
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
                                    <h4 className="titreAction">Formation {props.formation.nomTheme} </h4>
                                </div>
                                <div className="col-lg-1 col-md-1" align="center">
                                    <CancelIcon onClick={handleClose} className={classes.cancelcon} />
                                </div>
                            </div>
                            <div className="row" style={{ marginBottom: "30px" }}>
                                <div className="col-lg-10 col-md-10 offset-lg-1 offset-md-1">
                                    <Card style={{ border: "2px solid #B51B10", boxShadow: "0px 0px 3px 0px #B51B10", paddingTop: 15 }}>
                                        <CardContent>
                                            <div className="row">

                                                <div className="col-lg-5 col-md-5">
                                                    <label style={{ fontWeight: "bold" }}>Action : </label> <label>{props.formation.nomTheme}</label> <br />
                                                    <label style={{ fontWeight: "bold" }}>Type : </label> <label>{props.formation.typeTheme}</label> <br />
                                                    <label style={{ fontWeight: "bold" }}>Du : </label> <label>{props.formation.dateDebut}</label> <br />
                                                    <label style={{ fontWeight: "bold" }}>Au : </label> <label>{props.formation.dateFin}</label>
                                                </div>

                                                <div className="col-lg-5 col-md-5">
                                                    <label style={{ fontWeight: "bold" }}>Etat : </label> <label></label> <br />
                                                    <label style={{ fontWeight: "bold" }}>Nombres de participants : </label> <label>{props.participants.length}</label> <br />
                                                    <label style={{ fontWeight: "bold" }}>Max participants : </label> <label>{props.formation.maxParticipants}</label> <br />
                                                    <label style={{ fontWeight: "bold" }}>Cabinet / Formateur : </label>
                                                    <label>
                                                        {
                                                            props.cabinetFormateur.role === "Formateur" ? props.cabinetFormateur.data.nom + " " + props.cabinetFormateur.data.prenom
                                                                : props.cabinetFormateur.data.nom + " " + props.cabinetFormateur.data.contact
                                                        }
                                                    </label> <br />
                                                </div>


                                            </div>
                                        </CardContent>
                                    </Card>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-lg-6 col-md-6">
                                    <h5 className={classes.title}>Modules formation</h5>
                                    <ComponentListModulesFormation modules={props.formation.listModules} />
                                </div>

                                <div className="col-lg-6 col-md-6">
                                    <h5 className={classes.title}>Participants</h5>
                                    <ComponentListParticipants listParticipants={props.participants} />
                                </div>

                            </div>
                        </div>
                    </div>

                </Fade>
            </Modal>
        </div>
    );
}
