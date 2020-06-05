import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import CancelIcon from '@material-ui/icons/Cancel';
import { TextField, Button } from '@material-ui/core';
import axios from "axios"
import querystring from 'querystring'
import Alert from '@material-ui/lab/Alert';

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
        width: 600,
        height: '60vh',
        boxShadow: theme.shadows[5],

    },
    titre: {
        color: "#3D707E"
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
}));

export default function TransitionsModal(props) {
    const classes = useStyles();
    const [passwordActuel, setPasswordActuel] = React.useState("");
    const [passwordNew, setPasswordNew] = React.useState("");
    const [passwordConfirm, setPasswordConfirm] = React.useState("");
    const [showError, setShowError] = React.useState(false);
    const [showErrorActuel, setShowErrorActuel] = React.useState(false);

    
    const handleClose = () => {
        props.handleClose()
    }

    const onChangeActualPassword = (e) => {
        setPasswordActuel(e.target.value)
    }

    const onChangeNewPassword = (e) => {
        setPasswordNew(e.target.value)
    }

    const onChangeConfirmNewPassword = (e) => {
        setPasswordConfirm(e.target.value)
        verifierEquals(passwordNew, e.target.value)
    }

    const verifierPassword = () => {
        if (passwordNew !== "" && passwordConfirm !== "" && passwordActuel !== "" && passwordNew === passwordConfirm) {
            return 1
        } else {
            return 0
        }
    }

    const verifierEquals = (p1, p2) => {
        if (p1 === p2) {
            setShowError(false)
        } else {
            setShowError(true)
        }
    }

    const onUpdatePassword = () => {
        const obj = {
            id: JSON.parse(localStorage.user).id,
            oldPassword: passwordActuel,
            newPassword: passwordNew
        }
        axios.post("http://localhost:8181/users/updatePassword", querystring.stringify(obj), {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        }).then(res => {
            console.log(res.data)
            if (res.data.Collaborateur) {
                handleClose()
                props.passwordUpdated()
            }else {
                setShowErrorActuel(true)
            }
        })
    }

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



                        <div className="col-lg-12 col-md-12">
                            <div className="row headerModal">
                                <div className="col-lg-11 col-md-11">
                                    <h4 className="titreAction">Modifier mot de passe </h4>
                                </div>
                                <div className="col-lg-1 col-md-1" align="center">
                                    <CancelIcon onClick={handleClose} className={classes.cancelcon} />
                                </div>
                            </div>
                            <div className="row" style={{ paddingTop: "30px", width: "90%", backgroundColor: "#FAFAFA", margin: "auto", boxShadow: "0px 0px 1px" }}>
                                <div className="col-lg-12 col-md-12">
                                    <div className="input-group mb-3 " >
                                        <div className="input-group-prepend">
                                            <label style={{ width: 195 }} className="input-group-text" >Mot de passe actuel </label>
                                        </div>
                                        <TextField onChange={onChangeActualPassword} type="password" style={{ width: 270 }} size="small" label="Mot de passe" variant="outlined" />
                                    </div>

                                    <div className="input-group mb-3 " >
                                        <div className="input-group-prepend">
                                            <label style={{ width: 195 }} className="input-group-text" >Nouveau mot de passe </label>
                                        </div>
                                        <TextField onChange={onChangeNewPassword} type="password" style={{ width: 270 }} size="small" label="Mot de passe" variant="outlined" />
                                    </div>

                                    <div className="input-group mb-3 " >
                                        <div className="input-group-prepend">
                                            <label style={{ width: 195 }} className="input-group-text" >Confirmer mot de passe </label>
                                        </div>
                                        <TextField onChange={onChangeConfirmNewPassword} type="password" style={{ width: 270 }} size="small" label="Mot de passe" variant="outlined" />
                                    </div>
                                    <Alert hidden={showError === true ? false : true} style={{ marginBottom: "10px" }} severity="error">Verifier votre mot de passe !</Alert>
                                    <Alert hidden={showErrorActuel === true ? false : true} style={{ marginBottom: "10px" }} severity="error">Votre mot de passe actuel n'est pas correcte !</Alert>

                                    <div style={{ marginBottom: "20px", marginLeft: 295, display: "flex", flexDirection: "row", justifyContent: "space-between", width: 170 }}>
                                        <Button size="small" variant="contained" className={classes.buttonAnnuler} onClick={handleClose}> Annuler</Button>
                                        <Button disabled={verifierPassword() === 0 ? true : false} size="small" variant="contained" className={classes.buttonConfirmer} onClick={onUpdatePassword} > Modifier</Button>
                                    </div>
                                </div>
                            </div>


                        </div>
                    </div>

                </Fade>
            </Modal>
        </div>
    );
}
