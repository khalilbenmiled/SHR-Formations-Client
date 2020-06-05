import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import avatar from "../../images/avatar1.png"
import ComponentModalUpdatePassword from "./component-modal-update-password"
import { Snackbar } from "@material-ui/core"
import Alert from "@material-ui/lab/Alert"
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

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
        height: 340
    },
    avatar: {
        width: 80,
        height: 80,
        borderRadius: "300px"
    },
    password: {
        fontSize: "14px",
        textDecoration: "underline",
        color: "#F3AA5D",
        cursor: "pointer",
        "&:hover": {
            fontWeight: "bold"
        }
    }
}));

export default function TransitionsModal(props) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [openSnack, setOpenSnack] = React.useState(false);

    const openModalUpdatePassword = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    const closeSnack = () => {
        setOpenSnack(false)
    }

    const passwordUpdated = () => {
        setOpenSnack(true)
    }



    return (

        <div className="row" style={{ width: "98%", margin: "auto", backgroundColor: "#FAFAFA", boxShadow: "0px 0px 1px", padding: "30px 10px" }}>
            <div className="col-lg-4 col-md-4">
                <Card className={classes.rootCard}>
                    <CardContent>
                        <div className="row" style={{ paddingLeft: 80, marginBottom: 40 }}>
                            <div className="col-lg-12 col-md-12">
                                <img src={avatar} alt="avatar" className={classes.avatar} />
                            </div>
                        </div>

                        <div className="row" style={{ marginBottom: 15 }}>
                            <div className="col-lg-4 col-md-4">
                                <label style={{ fontWeight: "bold", fontSize: "14px" }}>Nom : </label>

                            </div>
                            <div className="col-lg-8 col-md-8">
                                <label style={{ fontSize: "14px" }}>{props.user.nom}</label>
                            </div>
                        </div>
                        <div className="row" style={{ marginBottom: 15 }}>
                            <div className="col-lg-4 col-md-4">
                                <label style={{ fontWeight: "bold", fontSize: "14px" }}>Prenom : </label>

                            </div>
                            <div className="col-lg-8 col-md-8">
                                <label style={{ fontSize: "14px" }}>{props.user.prenom}</label>
                            </div>
                        </div>
                        <div className="row" style={{ marginBottom: 15 }}>
                            <div className="col-lg-4 col-md-4">
                                <label style={{ fontWeight: "bold", fontSize: "14px" }}>Email : </label>

                            </div>
                            <div className="col-lg-8 col-md-8">
                                <label style={{ fontSize: "14px" }}>{props.user.email}</label>
                            </div>
                        </div>
                        <div className="row" style={{ marginBottom: 15 }}>
                            <div className="col-lg-4 col-md-4">
                                <label style={{ fontWeight: "bold", fontSize: "14px" }}>Role : </label>

                            </div>
                            <div className="col-lg-8 col-md-8">
                                <label style={{ fontSize: "14px" }}>{props.user.role}</label>
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
                                <div className="row" style={{ marginBottom: "15px" }}>
                                    <div className="col-lg-4 col-md-4">
                                        <label style={{ fontWeight: "bold", fontSize: "14px" }}>Bu : </label>
                                    </div>

                                    <div className="col-lg-8 col-md-8">
                                        <label style={{ fontSize: "14px" }}>{props.user.bu}</label>
                                    </div>
                                </div>

                                <div hidden={props.user.role === "MANAGER" ? true : false} className="row" style={{ marginBottom: "15px" }}>
                                    <div className="col-lg-4 col-md-4">
                                        <label style={{ fontWeight: "bold", fontSize: "14px" }}>Manager : </label>
                                    </div>

                                    <div className="col-lg-8 col-md-8">
                                        <label style={{ fontSize: "14px" }}>{props.infosCollaborateur.manager.nom} {props.infosCollaborateur.manager.prenom}</label>
                                    </div>
                                </div>


                                <div hidden={props.user.role !== "COLLABORATEUR" ? true : false} className="row" style={{ marginBottom: "15px" }}>
                                    <div className="col-lg-4 col-md-4">
                                        <label style={{ fontWeight: "bold", fontSize: "14px" }}>Team Lead : </label>
                                    </div>

                                    <div className="col-lg-8 col-md-8">
                                        <label style={{ fontSize: "14px" }}>{props.infosCollaborateur.teamlead.nom} {props.infosCollaborateur.teamlead.prenom}</label>
                                    </div>
                                </div>


                                <div className="row" style={{ marginBottom: "15px" }}>
                                    <div className="col-lg-4 col-md-4">
                                        <label style={{ fontWeight: "bold", fontSize: "14px" }}>Telephone : </label>
                                    </div>

                                    <div className="col-lg-8 col-md-8">
                                        <label style={{ fontSize: "14px" }}>{props.user.tel}</label>
                                    </div>
                                </div>

                                <div className="row" style={{ marginBottom: "15px" }}>
                                    <div className="col-lg-4 col-md-4">
                                        <label style={{ fontWeight: "bold", fontSize: "14px" }}>Adresse : </label>
                                    </div>

                                    <div className="col-lg-8 col-md-8">
                                        <label style={{ fontSize: "14px" }}>{props.user.adresse}</label>
                                    </div>
                                </div>

                                <div className="row" style={{ marginBottom: "15px" }}>
                                    <div className="col-lg-4 col-md-4">
                                        <label style={{ fontWeight: "bold", fontSize: "14px" }}>Mot de passe : </label>
                                    </div>

                                    <div className="col-lg-8 col-md-8">
                                        <label style={{ fontSize: "14px" }}>***********</label>
                                    </div>
                                </div>

                                <div className="row" style={{ marginBottom: "15px" }}>
                                    <div className="col-lg-8 col-md-8 offset-lg-4 offset-md-4">
                                        <label onClick={openModalUpdatePassword} className={classes.password}>Modifier mot de passe</label>
                                    </div>
                                </div>

                            </div>


                        </div>

                    </CardContent>
                </Card>
            </div>
            <ComponentModalUpdatePassword open={open} handleClose={handleClose} passwordUpdated={passwordUpdated}  />

            <Snackbar open={openSnack} autoHideDuration={5000} onClose={closeSnack}>
                <Alert onClose={closeSnack} icon={<CheckCircleIcon style={{ color: "white" }} />} style={{ backgroundColor: "#4CAF50", color: "white", width: 400, fontSize: 16 }}>
                    Mot de passe modifié !
                </Alert>
            </Snackbar>
        </div>



    );
}
