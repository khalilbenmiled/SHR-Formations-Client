import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import CancelIcon from '@material-ui/icons/Cancel';
import { TextField, Button } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import ComponentListTeamLead from "./component-list-teamlead"

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
        width: 800,
        minHeight: "40h",
        maxHeight: '75vh',
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
    const [manager, setManager] = React.useState("");
    const [teamlead, setTeamLead] = React.useState("");

    const onChangeTeamLead = (e, value) => {
        if (value != null) {
            setTeamLead(value)
        } else {
            setTeamLead("")
        }
    }

    const onChangeManager = (e, value) => {
        if (value != null) {
            setManager(value)
        } else {
            setManager("")
        }
    }

    const onClickUpdate = (user) => {
        if (user.role === "MANAGER") {
            props.updateManagerTeamLead(user)
        }
        if (user.role === "TEAMLEAD") {
            props.updateTeamLeadManager(user, manager)
        }
        if (user.role === "COLLABORATEUR") {
            props.updateCollaborateur(user, teamlead)
        }
        props.handleClose()
    }

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

                            <div className="row" style={{ width: "98%", margin: "auto", backgroundColor: "#FAFAFA", boxShadow: "0px 0px 1px", padding: "30px 20px" }}>
                                <div className="col-lg-12 col-md-12">

                                    <div hidden={props.user.role !== "COLLABORATEUR" ? true : false} className="input-group mb-3" style={{ marginTop: "30px", marginLeft: "100px" }} >
                                        <div className="input-group-prepend">
                                            <label style={{ width: 173 }} className="input-group-text" >Team Lead </label>
                                        </div>
                                        <Autocomplete
                                            size="small"
                                            options={props.listTeamLead}
                                            getOptionLabel={(option) => option.nom + " " + option.prenom}
                                            onChange={onChangeTeamLead}
                                            style={{ width: 300, backgroundColor: "white" }}
                                            renderInput={(params) => <TextField {...params} label="Team Lead" variant="outlined" />}
                                        />
                                    </div>

                                    <div hidden={props.user.role !== "TEAMLEAD" ? true : false} className="input-group mb-3 " style={{ marginTop: "30px", marginLeft: "100px" }}>
                                        <div className="input-group-prepend">
                                            <label style={{ width: 173 }} className="input-group-text" >Manager </label>
                                        </div>
                                        <Autocomplete
                                            size="small"
                                            options={props.listManager}
                                            getOptionLabel={(option) => option.nom + " " + option.prenom}
                                            onChange={onChangeManager}
                                            style={{ width: 300, backgroundColor: "white" }}
                                            renderInput={(params) => <TextField {...params} label="Manager" variant="outlined" />}
                                        />
                                    </div>

                                    <div hidden={props.user.role !== "MANAGER" ? true : false} className="input-group mb-3 " >

                                        <ComponentListTeamLead listFreeTeamLead={props.listFreeTeamLead} teamleadSelected={props.teamleadSelected} />
                                    </div>

                                </div>
                            </div>

                            <div className="row" style={{ marginBottom: "20px", marginTop: 20 }}>
                                <div className="col-lg-12 col-md-12">
                                    <div style={{ marginLeft: 590, display: "flex", flexDirection: "row", justifyContent: "space-between", width: 170 }}>
                                        <Button onClick={handleClose} size="small" variant="contained" className={classes.buttonAnnuler} > Annuler</Button>
                                        <Button onClick={onClickUpdate.bind(this, props.user)} size="small" variant="contained" className={classes.buttonConfirmer} > Ajouter</Button>
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
