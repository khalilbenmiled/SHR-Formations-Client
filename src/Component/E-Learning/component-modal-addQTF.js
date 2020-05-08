import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import CancelIcon from '@material-ui/icons/Cancel';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { TextField, Button } from '@material-ui/core';



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
        width: 600,
        height: "35vh",
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
    const [formation, setFormation] = React.useState("");


    const handleClose = () => {
        props.handleClose()
    }

    const onChangeFormation = (e, value) => {
        setFormation(value)
    }

    const addQTF = () => {
        props.addQTF(formation.id)
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
                                    <h4 className="titreAction">Ajouter Quiz à une formation </h4>
                                </div>
                                <div className="col-lg-1 col-md-1" align="center">
                                    <CancelIcon onClick={handleClose} className={classes.cancelcon} />
                                </div>
                            </div>

                            <div className="row" style={{ paddingLeft: "20px" , marginTop : "20px"}}>
                                <div className="col-lg-11 col-md-11 offset-lg-1 offset-md-1">
                                    <div className="input-group mb-3 ">
                                        <div className="input-group-prepend">
                                            <label style={{ width: 130 }} className="input-group-text" >Formation </label>
                                        </div>
                                        <Autocomplete
                                            id="combo-box-demo"
                                            size="small"
                                            onChange={onChangeFormation}
                                            options={props.formations}
                                            getOptionLabel={(option) => option.nomTheme + " Du " + option.dateDebut + " Au " + option.dateFin}
                                            style={{ width: 260 }}
                                            renderInput={(params) => <TextField {...params} label="Formation" variant="outlined" />}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="col-lg-6 col-md-6 offset-lg-5 offset-md-5" >
                                <Button onClick={props.handleClose} size="small" variant="contained" className={classes.buttonAnnuler} style={{marginLeft:"30px" ,marginRight : "10px"}} > Annuler</Button>
                                <Button onClick={addQTF} size="small" variant="contained" className={classes.buttonConfirmer} > Ajouter</Button>
                            </div>



                        </div>
                    </div>

                </Fade>
            </Modal>
        </div>
    );
}
