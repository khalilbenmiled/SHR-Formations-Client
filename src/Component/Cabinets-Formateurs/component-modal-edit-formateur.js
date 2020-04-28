import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import CancelIcon from '@material-ui/icons/Cancel';
import { Button, TextField } from '@material-ui/core';


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
        width: 650,
        height: "65vh",
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
    }
}));

export default function TransitionsModal(props) {
    const classes = useStyles();
    const [nom, setNom] = React.useState("");
    const [prenom, setPrenom] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [adresse, setAdresse] = React.useState("");
    const [tel, setTel] = React.useState("");

    const handleClose = () => {
        props.handleClose()
    }

    const onChangeNom = (e) => {
        setNom(e.target.value)
    }

    const onChangePrenom = (e) => {
        setPrenom(e.target.value)
    }

    const onChangeEmail = (e) => {
        setEmail(e.target.value)
    }

    const onChangeAdresse = (e) => {
        setAdresse(e.target.value)
    }

    const onChangeTel = (e) => {
        setTel(e.target.value)
    }

    const updateFormateur = () => {
        const formateur = {
            id : props.formateur.id,
            nom : nom,
            prenom : prenom,
            email : email,
            adresse : adresse,
            tel : tel
        }

        props.updateFormateur(formateur)
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


                        <div className="col-lg-12 col-md-12 ">

                            <div className="row headerModal">
                                <div className="col-lg-11 col-md-11">
                                    <h4 className="titreAction">Modifier formateur  </h4>
                                </div>
                                <div className="col-lg-1 col-md-1" align="center">
                                    <CancelIcon onClick={handleClose} className={classes.cancelcon} />
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-lg-10 col-md-10 offset-lg-2 offset-md-2" >
                                    <div className="input-group mb-3 ">
                                        <div className="input-group-prepend">
                                            <label style={{ width: 130 }} className="input-group-text" >Nom </label>
                                        </div>
                                        <TextField defaultValue={props.formateur.nom} onChange={onChangeNom} size="small" label="Nom" variant="outlined" style={{ width: 260, backgroundColor: "white" }}  > </TextField>
                                    </div>
                                    <div className="input-group mb-3 ">
                                        <div className="input-group-prepend">
                                            <label style={{ width: 130 }} className="input-group-text" >Prenom </label>
                                        </div>
                                        <TextField defaultValue={props.formateur.prenom} onChange={onChangePrenom} size="small"  label="Prenom" variant="outlined" style={{ width: 260, backgroundColor: "white" }}  > </TextField>
                                    </div>
                                    <div className="input-group mb-3 ">
                                        <div className="input-group-prepend">
                                            <label style={{ width: 130 }} className="input-group-text" >Email </label>
                                        </div>
                                        <TextField defaultValue={props.formateur.email} onChange={onChangeEmail} size="small" label="Email" variant="outlined" style={{ width: 260, backgroundColor: "white" }}   > </TextField>
                                    </div>
                                    <div className="input-group mb-3 ">
                                        <div className="input-group-prepend">
                                            <label style={{ width: 130 }} className="input-group-text" >Adresse </label>
                                        </div>
                                        <TextField defaultValue={props.formateur.adresse} onChange={onChangeAdresse} size="small"  label="Contact" variant="outlined" style={{ width: 260, backgroundColor: "white" }}  > </TextField>
                                    </div>
                                    <div className="input-group mb-3 ">
                                        <div className="input-group-prepend">
                                            <label style={{ width: 130 }} className="input-group-text" >Telephone </label>
                                        </div>
                                        <TextField defaultValue={props.formateur.tel} onChange={onChangeTel} size="small" label="Telephone" variant="outlined" style={{ width: 260, backgroundColor: "white" }} > </TextField>
                                    </div>

                                    <div style={{ marginLeft: "220px" }} >
                                        <Button style={{ marginRight: "10px" }} size="small" variant="contained" className={classes.buttonAnnuler} onClick={handleClose}> Annuler</Button>
                                        <Button onClick={updateFormateur} size="small" variant="contained" className={classes.buttonConfirmer} > Modifier</Button>
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
