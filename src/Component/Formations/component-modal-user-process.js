import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { Card, CardContent } from '@material-ui/core';
import avatar1 from "../../images/avatar1.png"
import "./formations.css"
import CancelIcon from '@material-ui/icons/Cancel';


const useStyles = makeStyles(theme => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        "&:focus": {
            outline: "none"
        },
        borderRadius: "20px",
        width: "90%",
        minHeight: "70vh",
        maxHeight: '90vh',
        boxShadow: theme.shadows[5],
    },
    title: {
        color: "#3D707E",
        marginBottom: "20px"
    },
    h5Title: {
        color: "#3D707E",
    },
    rootRow: {
        width: '100%',
        boxShadow: "0px 0px 1.5px",
        backgroundColor: "#FAFAFA",
        padding: "10px",
        borderRadius: "10px",
    },
    cancelcon: {
        width: "30px",
        height: "30px",
        color: "#fff",
        cursor: "pointer",
        marginTop: "15px",
        marginLeft: "16px"
    }
}));



export default function TransitionsModal(props) {
    const classes = useStyles();
    const infos = props.infos
    const handleClose = () => {
        props.handleClose();
    };

    return (
        <div >
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
                                    <h4 className="titreAction"> Processus validation</h4>
                                </div>
                                <div className="col-lg-1 col-md-1" align="center">
                                    <CancelIcon onClick={handleClose} className={classes.cancelcon} />
                                </div>
                            </div>

                            <div className="row" style={{ marginTop: 20 }}>
                                <div className="col-lg-4 col-md-4" align="center">
                                    <div className="step1">
                                        <p className="text1">Saisie des besoins</p>
                                    </div>
                                </div>

                                <div className="col-lg-4 col-md-4" align="center">
                                    <div className="step2">
                                        <p className="text2">Validation</p>
                                    </div>
                                </div>

                                <div className="col-lg-4 col-md-4" align="center">
                                    <div className="step3">
                                        <p className="text3">Verification, validation et publication</p>
                                    </div>
                                </div>

                            </div>

                            <div className="row" style={{ marginTop: 30 }}>
                                <div className="col-lg-4 col-md-4">
                                    <Card style={{ border: "2px solid #B51B10", boxShadow: "0px 0px 3px 0px #B51B10" }}>
                                        <CardContent>
                                            <div className="row">
                                                <div className="col-lg-9 col-md-9">
                                                    <label style={{ fontWeight: "bold" }}>Bu : </label> <label>{infos.collaborateur.bu}</label> <br />
                                                    <label style={{ fontWeight: "bold" }}>Nom : </label> <label>{infos.collaborateur.nom}</label> <br />
                                                    <label style={{ fontWeight: "bold" }}>Prenom : </label> <label>{infos.collaborateur.prenom}</label> <br />
                                                    <label style={{ fontWeight: "bold" }}>Email : </label> <label>{infos.collaborateur.email}</label>
                                                </div>
                                                <div className="col-lg-3 col-md-3" >
                                                    <img className="avatar1" src={avatar1} alt="avatar1" />
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </div>

                                <div className="col-lg-4 col-md-4">
                                    <Card style={{ border: "2px solid #E67A0A", boxShadow: "0px 0px 3px 0px #E67A0A" }}>
                                        <CardContent>
                                            <div className="row">
                                                <div className="col-lg-9 col-md-9">
                                                    <label style={{ fontWeight: "bold" }}>Bu : </label> <label>{infos.teamlead.bu}</label> <br />
                                                    <label style={{ fontWeight: "bold" }}>Nom : </label> <label>{infos.teamlead.nom}</label> <br />
                                                    <label style={{ fontWeight: "bold" }}>Prenom : </label> <label>{infos.teamlead.prenom}}</label> <br />
                                                    <label style={{ fontWeight: "bold" }}>Email : </label> <label>{infos.teamlead.email}</label>
                                                </div>
                                                <div className="col-lg-3 col-md-3" >
                                                    <img className="avatar1" src={avatar1} alt="avatar1" />
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </div>

                                <div className="col-lg-4 col-md-4">
                                    <Card style={{ border: "2px solid #3D707E", boxShadow: "0px 0px 3px 0px #3D707E" }}>
                                        <CardContent>
                                            <div className="row">
                                                <div className="col-lg-9 col-md-9">
                                                    <label style={{ fontWeight: "bold" }}>Bu : </label> <label>{infos.manager.bu}</label> <br />
                                                    <label style={{ fontWeight: "bold" }}>Nom : </label> <label>{infos.manager.nom}</label> <br />
                                                    <label style={{ fontWeight: "bold" }}>Prenom : </label> <label>{infos.manager.prenom}</label> <br />
                                                    <label style={{ fontWeight: "bold" }}>Email : </label> <label>{infos.manager.email}</label>
                                                </div>
                                                <div className="col-lg-3 col-md-3" >
                                                    <img className="avatar1" src={avatar1} alt="avatar1" />
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </div>

                            </div>

                        </div>
                    </div>
                </Fade>
            </Modal>
        </div>
    );
}





