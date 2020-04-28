import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import CancelIcon from '@material-ui/icons/Cancel';
import { Button, TextField } from '@material-ui/core';
import ComponentListDomaine from "./component-list-domaine"


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
        height: "85vh",
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
    const [nomDomaine, setNomDomaine] = React.useState("");
    const [descriptionDomaine, setDescriptionDomaine] = React.useState("");
    const [domainesSelected, setDomainesSelected] = React.useState([]);
    const [nomCabinet, setNomCabinet] = React.useState("");
    const [emailCabinet, setEmailCabinet] = React.useState("");
    const [contactCabinet, setContactCabinet] = React.useState("");
    const [telCabinet, setTelCabinet] = React.useState("");
    const [typeCabinet, setTypeCabinet] = React.useState("");

    const handleClose = () => {
        props.handleClose()
    }

    const onChangeNomDomaine = (e) => {
        setNomDomaine(e.target.value)
    }

    const onChangeDescriptionDomaine = (e) => {
        setDescriptionDomaine(e.target.value)
    }

    const addDomaine = () => {
        const domaine = {
            nom: nomDomaine,
            description: descriptionDomaine
        }
        props.addDomaine(domaine)
        setNomDomaine("")
        setDescriptionDomaine("")
    }

    const getListDomaines = (listDomaines) => {
        setDomainesSelected(listDomaines)
    }

    const onChangeNomCabinet = (e) => {
        setNomCabinet(e.target.value)
    }

    const onChangeEmailCabinet = (e) => {
        setEmailCabinet(e.target.value)
    }

    const onChangeContactCabinet = (e) => {
        setContactCabinet(e.target.value)
    }

    const onChangeTelephoneCabinet = (e) => {
        setTelCabinet(e.target.value)
    }

    const onChangeTypeCabinet = (e) => {
        setTypeCabinet(e.target.value)
    }

    const addCabinet = () => {
        const cabinet = {
            nom: nomCabinet,
            email: emailCabinet,
            tel: telCabinet,
            contact: contactCabinet,
            typeFormation: typeCabinet,
            listDomaines: domainesSelected
        }
        props.addCabinet(cabinet)
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
                                    <h4 className="titreAction">Ajouter un cabinet  </h4>
                                </div>
                                <div className="col-lg-1 col-md-1" align="center">
                                    <CancelIcon onClick={handleClose} className={classes.cancelcon} />
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-lg-6 col-md-6" >
                                    <div className="input-group mb-3 ">
                                        <div className="input-group-prepend">
                                            <label style={{ width: 130 }} className="input-group-text" >Nom </label>
                                        </div>
                                        <TextField defaultValue={props.cabinet.nom} onChange={onChangeNomCabinet} size="small" label="Nom" variant="outlined" style={{ width: 260, backgroundColor: "white" }}  > </TextField>
                                    </div>
                                    <div className="input-group mb-3 ">
                                        <div className="input-group-prepend">
                                            <label style={{ width: 130 }} className="input-group-text" >Email </label>
                                        </div>
                                        <TextField defaultValue={props.cabinet.email} onChange={onChangeEmailCabinet} size="small" label="Email" variant="outlined" style={{ width: 260, backgroundColor: "white" }}   > </TextField>
                                    </div>
                                    <div className="input-group mb-3 ">
                                        <div className="input-group-prepend">
                                            <label style={{ width: 130 }} className="input-group-text" >Contact </label>
                                        </div>
                                        <TextField defaultValue={props.cabinet.contact} onChange={onChangeContactCabinet} size="small" label="Contact" variant="outlined" style={{ width: 260, backgroundColor: "white" }}  > </TextField>
                                    </div>
                                    <div className="input-group mb-3 ">
                                        <div className="input-group-prepend">
                                            <label style={{ width: 130 }} className="input-group-text" >Telephone </label>
                                        </div>
                                        <TextField defaultValue={props.cabinet.tel} onChange={onChangeTelephoneCabinet} size="small" label="Telephone" variant="outlined" style={{ width: 260, backgroundColor: "white" }} > </TextField>
                                    </div>
                                    <div style={{ width: 390 }} className="input-group mb-3">
                                        <div className="input-group-prepend" >
                                            <label style={{ width: 130 }} className="input-group-text"  >Type cabinet</label>
                                        </div>
                                        <select defaultValue={props.cabinet.typeFormation} className="custom-select" onChange={onChangeTypeCabinet}>
                                            <option defaultValue value="null"> -----------------------------------------------------</option>
                                            <option value="TECHNIQUE">TECHNIQUE</option>
                                            <option value="SOFTWARE">PRODUITS</option>
                                            <option value="SOFTSKILLS">SOFTSKILLS</option>
                                        </select>
                                    </div>

                                </div>
                                <div className="col-lg-6 col-md-6">
                                    <ComponentListDomaine domaines={props.cabinet.listDomaines} getListDomaines={getListDomaines} />
                                    <div style={{ marginLeft: "80px" }} className="input-group mb-3 ">
                                        <div className="input-group-prepend">
                                            <label style={{ width: 130 }} className="input-group-text" >Nom </label>
                                        </div>
                                        <TextField value={nomDomaine} onChange={onChangeNomDomaine} size="small" label="Nom" variant="outlined" style={{ width: 260, backgroundColor: "white" }} > </TextField>
                                    </div>
                                    <div style={{ marginLeft: "80px" }} className="input-group mb-3 ">
                                        <div className="input-group-prepend">
                                            <label style={{ width: 130 }} className="input-group-text" >Description </label>
                                        </div>
                                        <TextField value={descriptionDomaine} onChange={onChangeDescriptionDomaine} size="small" label="Description" variant="outlined" style={{ width: 260, backgroundColor: "white" }} > </TextField>
                                    </div>
                                    <Button disabled={nomDomaine === "" || descriptionDomaine === "" ? true : false} onClick={addDomaine} style={{ marginLeft: "395px" }} size="small" variant="contained" className={classes.buttonConfirmer} > Ajouter</Button>

                                </div>
                            </div>
                            <div className="row" style={{ borderTop: "2px solid #E67A0A", marginTop: "10px", padding: "20px 0" }}>
                                <div className="col-lg-12 col-md-12">
                                    <div style={{ marginLeft: "400px" }} >
                                        <Button style={{ marginRight: "10px" }} size="small" variant="contained" className={classes.buttonAnnuler} onClick={handleClose}> Annuler</Button>
                                        <Button onClick={addCabinet} size="small" variant="contained" className={classes.buttonConfirmer} > Valider</Button>
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
