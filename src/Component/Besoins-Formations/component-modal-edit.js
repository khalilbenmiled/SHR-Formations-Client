import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import "./besoins.css"
import CancelIcon from '@material-ui/icons/Cancel';
import ComponentThemes from "./component-themes"
import ComponentModalProjet from "./component-modal-projet"
import { Button } from '@material-ui/core';

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
        width: 800,
        height: '95vh',
        boxShadow: theme.shadows[5],

    },
    titre: {
        color: "#3D707E"
    },
    cancelcon: {
        width: "30px",
        height: "30px",
        color: "#fff",
        cursor: "pointer",
        marginTop: "13px"
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
}));

export default function TransitionsModal(props) {
    const classes = useStyles();
    const [trimestre, setTrimestre] = React.useState("");
    const [projet, setProjet] = React.useState("");
    const [actionS, setActionSelected] = React.useState("");

    const handleClose = () => {
        setTrimestre("")
        setProjet("")
        setActionSelected("")
        props.handleClose();
    };
    const onChangeTrimeter = (e) => {
        setTrimestre(e.target.value)
        props.onChangeTrimeter(e)
    }
    const getProjet = (e) => {
        setProjet(e.target.value)
        props.getProjet(e)
    }

    const actionSelected = (e) => {
        setActionSelected(JSON.parse(e.target.value))
        props.actionSelected(e)
    }
    const modifierBesoin = () => {

       props.modifierBesoin(props.id)
       props.handleClose()
    }

    const verif = ()  => {
        if(actionS === "" && projet === "" && trimestre === ""){
            return false
        }else {
            return true
        }
    }

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

                            <div className="row modalHeader" style={{ marginBottom: "10px" }}>
                                <div className="col-lg-11 col-md-11">
                                    <h4 className="titreInfos">Modifier {props.nomBesoinToEdit} Trimestre {props.quarterBesoinToEdit}</h4>
                                </div>
                                <div className="col-lg-1 col-md-1" align="center">
                                    <CancelIcon onClick={handleClose} className={classes.cancelcon} />
                                </div>
                            </div>

                            <div className="row" style={{ paddingTop: "20px", backgroundColor: "#FAFAFA", marginBottom: "50px", margin: "auto", boxShadow: "0px 0px 1px" }}>
                                <div className="col-lg-12 col-md-12">
                                    <div className="row">
                                        <div className="col-lg-12 col-md-12">
                                            <div style={{ width: 700 }} className="input-group mb-3">
                                                <div className="input-group-prepend" >
                                                    <label className="input-group-text"  >Action de formation</label>
                                                </div>
                                                <select className="custom-select" id="inputGroupSelect01" onChange={props.onChangeTheme}>
                                                    <option defaultValue value="TOUS">Tous</option>
                                                    <option value="TECHNIQUE">TECHNIQUE</option>
                                                    <option value="SOFTWARE">PRODUIT</option>
                                                    <option value="SOFTSKILLS">SOFTSKILLS</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-lg-12 col-md-12">
                                            <ComponentThemes
                                                themes={props.themes}
                                                actionSelected={actionSelected}
                                                addAction={props.addAction}

                                            />
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-lg-12 col-md-12">
                                            <div hidden={JSON.parse(localStorage.user).role === "COLLABORATEUR" ? true : false} style={{ width: 420 }} className="input-group mb-3">
                                                <div style={{ height: 40 }} className="input-group-prepend" >
                                                    <label style={{ width: 150 }} className="input-group-text" >Trimestre</label>
                                                </div>
                                                <select className="custom-select" id="inputGroupSelect01" onChange={onChangeTrimeter}>
                                                    <option style={{ outline: "none" }} defaultValue value="NONE">Choisir...</option>
                                                    <option value="1">Trimestre 1</option>
                                                    <option value="2">Trimestre 2</option>
                                                    <option value="3">Trimestre 3</option>
                                                    <option value="4">Trimestre 4</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-lg-12 col-md-12">
                                            <div hidden={JSON.parse(localStorage.user).role === "COLLABORATEUR" ? true : false} style={{ width: 420 }} className="input-group mb-3">
                                                <div className="input-group-prepend">
                                                    <label style={{ width: 150 }} className="input-group-text" >Projet</label>
                                                </div>
                                                <select className="custom-select" id="inputGroupSelect01" onChange={getProjet}>
                                                    <option defaultValue value="-1">Choisir...</option>

                                                    {props.projets.map(projet => {
                                                        return (
                                                            <option key={projet.id} value={JSON.stringify(projet)}>{projet.nom}</option>
                                                        )
                                                    })}
                                                </select>
                                                <ComponentModalProjet addProjet={props.addProjet} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>


                            <div style={{ paddingTop : "20px" ,marginLeft: 560, display: "flex", flexDirection: "row", justifyContent: "space-between", width: 170 }}>
                                <Button size="small" variant="contained" className={classes.buttonAnnuler} onClick={props.handleClose}> Annuler</Button>
                                <Button disabled = {verif() === false ? true : false} size="small" variant="contained" className={classes.buttonConfirmer} onClick={modifierBesoin}> Modifier</Button>
                            </div>

                        </div>

                    </div>
                </Fade>
            </Modal>
        </div>
    );
}





