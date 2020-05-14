import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import CancelIcon from '@material-ui/icons/Cancel';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import avatar from "../../images/avatar1.png"

const useStyles = makeStyles(theme => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        "&:focus": {
            outline: "none"
        },
        borderRadius: "20px",
        width: 920,
        height: '70vh',
        boxShadow: theme.shadows[5],

    },
    titre: {
        color: "#3D707E",
        fontSize: "16px"
    },
    buttonStyles: {
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
    cancelcon: {
        width: "30px",
        height: "30px",
        color: "#fff",
        cursor: "pointer",
        marginTop: "13px"
    },
    rootCard: {
        minWidth: 275,
        height: 280
    },
    avatar: {
        width: 80,
        height: 80,
        borderRadius: "300px"
    }
}));

export default function TransitionsModal(props) {
    const classes = useStyles();

    return (
        <div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={props.open}
                onClose={props.handleClose}
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
                                    <h4 className="titreAction">Détails collaborateur </h4>
                                </div>
                                <div className="col-lg-1 col-md-1" align="center">
                                    <CancelIcon onClick={props.handleClose} className={classes.cancelcon} />
                                </div>
                            </div>

                            <div className="row" style={{ width: "98%", margin: "auto", backgroundColor: "#FAFAFA", boxShadow: "0px 0px 1px", padding: "30px 10px" }}>
                                <div className="col-lg-4 col-md-4">
                                    <Card className={classes.rootCard}>
                                        <CardContent>
                                            <div className="row" style={{ paddingLeft: 60, marginBottom: 40 }}>
                                                <div className="col-lg-12 col-md-12">
                                                    <img src={avatar} alt="avatar" className={classes.avatar} />
                                                </div>
                                            </div>

                                            <div className="row" style={{ marginBottom: 15 }}>
                                                <div className="col-lg-4 col-md-4">
                                                    <label style={{ fontWeight: "bold" }}>Nom : </label>

                                                </div>
                                                <div className="col-lg-8 col-md-8">
                                                    <label style={{}}>{props.user.nom}</label>
                                                </div>
                                            </div>
                                            <div className="row" style={{ marginBottom: 15}}>
                                                <div className="col-lg-4 col-md-4">
                                                    <label style={{ fontWeight: "bold" }}>Prenom : </label>

                                                </div>
                                                <div className="col-lg-8 col-md-8">
                                                    <label style={{}}>{props.user.prenom}</label>
                                                </div>
                                            </div>
                                            <div className="row" style={{ marginBottom: 15}}>
                                                <div className="col-lg-4 col-md-4">
                                                    <label style={{ fontWeight: "bold" }}>Email : </label>

                                                </div>
                                                <div className="col-lg-8 col-md-8">
                                                    <label style={{}}>{props.user.email}</label>
                                                </div>
                                            </div>
                                            <div className="row" style={{ marginBottom: 15 }}>
                                                <div className="col-lg-4 col-md-4">
                                                    <label style={{ fontWeight: "bold" }}>Role : </label>

                                                </div>
                                                <div className="col-lg-8 col-md-8">
                                                    <label style={{}}>{props.user.role}</label>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </div>

                                <div className="col-lg-8 col-md-8">
                                    <Card className={classes.rootCard}>
                                        <CardContent>
                                            <div className="row" style={{ marginBottom: "20px" }}>
                                                <div className="col-lg-12 col-md-12">
                                                    <h4 className={classes.titre}>A propos ..</h4>
                                                </div>
                                            </div>

                                            <div className="row">
                                                <div className="col-lg-12 col-md-12">
                                                    <div className="row" style={{  marginBottom: "15px" }}>
                                                        <div className="col-lg-4 col-md-4">
                                                            <label style={{ fontWeight: "bold" }}>Bu : </label>
                                                        </div>

                                                        <div className="col-lg-8 col-md-8">
                                                            <label>{props.user.bu}</label>
                                                        </div>
                                                    </div>

                                                    <div hidden={props.user.role === "MANAGER" ? true : false} className="row" style={{  marginBottom: "15px" }}>
                                                        <div className="col-lg-4 col-md-4">
                                                            <label style={{ fontWeight: "bold" }}>Manager : </label>
                                                        </div>

                                                        <div className="col-lg-8 col-md-8">
                                                            <label>{props.infosCollaborateur.manager.nom } {props.infosCollaborateur.manager.prenom}</label>
                                                        </div>
                                                    </div>


                                                    <div hidden={props.user.role !== "COLLABORATEUR" ? true : false} className="row" style={{ marginBottom: "15px" }}>
                                                        <div className="col-lg-4 col-md-4">
                                                            <label style={{ fontWeight: "bold" }}>Team Lead : </label>
                                                        </div>

                                                        <div className="col-lg-8 col-md-8">
                                                            <label>{props.infosCollaborateur.teamlead.nom} {props.infosCollaborateur.teamlead.prenom}</label>
                                                        </div>
                                                    </div>


                                                    <div className="row" style={{  marginBottom: "15px" }}>
                                                        <div className="col-lg-4 col-md-4">
                                                            <label style={{ fontWeight: "bold" }}>Telephone : </label>
                                                        </div>

                                                        <div className="col-lg-8 col-md-8">
                                                            <label>{props.user.tel}</label>
                                                        </div>
                                                    </div>

                                                    <div className="row" style={{ marginBottom: "15px" }}>
                                                        <div className="col-lg-4 col-md-4">
                                                            <label style={{ fontWeight: "bold" }}>Adresse : </label>
                                                        </div>

                                                        <div className="col-lg-8 col-md-8">
                                                            <label>{props.user.adresse}</label>
                                                        </div>
                                                    </div>

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
