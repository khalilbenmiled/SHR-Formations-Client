import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import CancelIcon from '@material-ui/icons/Cancel';
import { Button } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { TextField } from '@material-ui/core';

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
        width: 700,
        height: "80h",
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
    const [nom, setNom] = React.useState("");
    const [prenom, setPrenom] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [adresse, setAdresse] = React.useState("");
    const [tel, setTel] = React.useState("");
    const [role, setRole] = React.useState("");
    const [bu, setBu] = React.useState("");
   
    
    const roles = [
        { title: "COLLABORATEUR" },
        { title: "TEAMLEAD" },
        { title: "MANAGER" },
        { title: "SERVICEFORMATIONS" }
    ]

    const bus = [
        { title: "RD" },
        { title: "CS" },
        { title: "Prodops" }
    ]

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

    const onChangeRole = (e, value) => {
        if (value != null) {
            setRole(value.title)
        } else {
            setRole("")
        }

    }

    const onChangeBu = (e, value) => {
        if (value != null) {
            setBu(value.title)
        } else {
            setBu("")
        }

    }

    const handleClose = () => {
        props.handleClose()
    }

    const modifierUtilisateur = () => {
        const utilisateur = {
            id : props.user.id,
            nom: nom,
            prenom: prenom,
            email: email,
            adresse: adresse,
            tel: tel,
            bu: bu,
            role: role
        }
        props.modifierUtilisateur(utilisateur)
        handleClose()
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


                        <div className="col-lg-12 col-md-12 " >

                            <div className="row headerModal">
                                <div className="col-lg-11 col-md-11">
                                    <h4 className="titreAction">Modifier utilisateur </h4>
                                </div>
                                <div className="col-lg-1 col-md-1" align="center">
                                    <CancelIcon onClick={props.handleClose} className={classes.cancelcon} />
                                </div>
                            </div>

                            <div className="row" style={{ width: "98%", margin: "auto", backgroundColor: "#FAFAFA", boxShadow: "0px 0px 1px", padding: "30px 10px" }}>
                                <div className="col-lg-12 col-md-12">
                                    <div className="row">
                                        <div className="col-lg-10 col-md-10 offset-lg-2 offset-md-2" >
                                            <div className="input-group mb-3 ">
                                                <div className="input-group-prepend">
                                                    <label style={{ width: 130 }} className="input-group-text" >Nom </label>
                                                </div>
                                                <TextField onChange={onChangeNom} size="small" label={props.user.nom} variant="outlined" style={{ width: 260, backgroundColor: "white" }}  > </TextField>
                                            </div>
                                            <div className="input-group mb-3 ">
                                                <div className="input-group-prepend">
                                                    <label style={{ width: 130 }} className="input-group-text" >Prenom </label>
                                                </div>
                                                <TextField onChange={onChangePrenom} size="small" label={props.user.prenom} variant="outlined" style={{ width: 260, backgroundColor: "white" }}  > </TextField>
                                            </div>
                                            <div className="input-group mb-3 ">
                                                <div className="input-group-prepend">
                                                    <label style={{ width: 130 }} className="input-group-text" >Email </label>
                                                </div>
                                                <TextField onChange={onChangeEmail} size="small" label={props.user.email} variant="outlined" style={{ width: 260, backgroundColor: "white" }}   > </TextField>
                                            </div>
                                            <div className="input-group mb-3 ">
                                                <div className="input-group-prepend">
                                                    <label style={{ width: 130 }} className="input-group-text" >Adresse </label>
                                                </div>
                                                <TextField onChange={onChangeAdresse} size="small" label={props.user.adresse} variant="outlined" style={{ width: 260, backgroundColor: "white" }}  > </TextField>
                                            </div>
                                            <div className="input-group mb-3 ">
                                                <div className="input-group-prepend">
                                                    <label style={{ width: 130 }} className="input-group-text" >Telephone </label>
                                                </div>
                                                <TextField onChange={onChangeTel} size="small" label={props.user.tel} variant="outlined" style={{ width: 260, backgroundColor: "white" }} > </TextField>
                                            </div>

                                            <div className="input-group mb-3 ">
                                                <div className="input-group-prepend">
                                                    <label style={{ width: 130 }} className="input-group-text" >BU </label>
                                                </div>

                                                <Autocomplete
                                                    size="small"
                                                    options={bus}
                                                    getOptionLabel={(option) => option.title}
                                                    onChange={onChangeBu}
                                                    style={{ width: 260, backgroundColor: "white" }}
                                                    renderInput={(params) => <TextField {...params} label={props.user.bu} variant="outlined" />}
                                                />
                                            </div>

                                            <div hidden className="input-group mb-3 ">
                                                <div className="input-group-prepend">
                                                    <label style={{ width: 130 }} className="input-group-text" >ROLE </label>
                                                </div>
                                                <Autocomplete
                                                    size="small"
                                                    options={roles}
                                                    getOptionLabel={(option) => option.title}
                                                    onChange={onChangeRole}
                                                    style={{ width: 260, backgroundColor: "white" }}
                                                    renderInput={(params) => <TextField {...params} label={props.user.role} variant="outlined" />}
                                                />
                                            </div>

                                            <div style={{ marginLeft: "220px" }} >
                                                <Button style={{ marginRight: "10px" }} size="small" variant="contained" className={classes.buttonAnnuler} onClick={handleClose}> Annuler</Button>
                                                <Button onClick={modifierUtilisateur} size="small" variant="contained" className={classes.buttonConfirmer} > Modifier</Button>
                                            </div>
                                        </div>
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
