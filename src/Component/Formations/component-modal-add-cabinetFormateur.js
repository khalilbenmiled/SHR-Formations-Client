import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import CancelIcon from '@material-ui/icons/Cancel';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { TextField, Button } from '@material-ui/core';
import axios from "axios"
import ComponentListFormateurs from "./component-list-formateurs"
import ComponentListCabinets from "./component-list-cabinets"


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
        width: 1100,
        height: "92vh",
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
    },
    title: {
        color: "#3D707E",
        marginBottom: "-5px"
    }
}));

export default function TransitionsModal(props) {
    const classes = useStyles();
    const [formateur, setFormateur] = React.useState(true);
    const [cabinet, setCabinet] = React.useState(true);
    const [formateurs, setFormateurs] = React.useState([]);
    const [cabinets, setCabinets] = React.useState([]);
    const [choiceSelected, setChoiceSelected] = React.useState(false);
    const [formateurCabinetID, setFormateurCabinetId] = React.useState("");



    const handleClose = () => {
        props.handleClose()
    }

    const formateurCabinet = [
        { title: "Formateur" },
        { title: "Cabinet" }
    ]

    const onSelectFormateurCabinet = (e, values) => {
        if (values !== null) {
            setChoiceSelected(true)
            if (values.title === "Formateur") {
                axios.get(process.env.REACT_APP_PROXY_FormateursCabinets + "/formateurs").then(res => {
                    if (res.data.formateurs) {
                        setFormateurs(res.data.formateurs)
                        setFormateur(false)
                        setCabinet(true)
                    }
                })
            } else if (values.title === "Cabinet") {
                axios.get(process.env.REACT_APP_PROXY_FormateursCabinets + "/cabinets").then(res => {
                    if (res.data.cabinets) {
                        setCabinets(res.data.cabinets)
                        setFormateur(true)
                        setCabinet(false)
                    }
                })
            } else {
                setFormateur(true)
                setCabinet(true)
            }
        } else {
            setFormateur(true)
            setCabinet(true)
            setChoiceSelected(false)
        }
    }

    const affecterCF = () => {
        const input = {
            idFormation : props.idFormation,
            formateurCabinet : formateurCabinetID
        }
       
        props.affecterCF(input)
        setChoiceSelected(false)
        props.handleClose()
    }

    const formateurSelected = (formateur) => {
        setFormateurCabinetId(formateur.id)
    }

    const cabinetSelected = (cabinet) => {
        setFormateurCabinetId(cabinet.id)
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


                        <div className="col-lg-12 col-md-12 " >

                            <div className="row headerModal">
                                <div className="col-lg-11 col-md-11">
                                    <h4 className="titreAction">Ajouter cabinet / Formateur </h4>
                                </div>
                                <div className="col-lg-1 col-md-1" align="center">
                                    <CancelIcon onClick={handleClose} className={classes.cancelcon} />
                                </div>
                            </div>

                            <div className="row" style={{ width: "95%", margin: "10px auto", padding: "20px 10px", backgroundColor: "#F5F5F5", boxShadow: "0px 0px 2px" }} >
                                <div className="col-lg-4 col-md-4 offset-lg-4 offset-md-4">

                                    <Autocomplete
                                        size="small"
                                        onChange={onSelectFormateurCabinet}
                                        options={formateurCabinet}
                                        getOptionLabel={(option) => option.title}
                                        style={{ width: 300, backgroundColor: "white" }}
                                        renderInput={(params) => <TextField {...params} label="Formateur / Cabinet" variant="outlined" />}
                                    />

                                </div>
                            </div>

                            <div className="row" hidden={choiceSelected === true ? false : true} style={{ width: "95%", margin: "10px auto", padding: "20px 10px", backgroundColor: "#F5F5F5", boxShadow: "0px 0px 2px" }}>
                                <div hidden={formateur ? true : false} className="col-lg-12 col-md-12">
                                    <ComponentListFormateurs formateurs={formateurs} formateurSelected={formateurSelected} />

                                </div>
                                <div hidden={cabinet ? true : false} className="col-lg-12 col-md-12">
                                    <ComponentListCabinets cabinets={cabinets} cabinetSelected={cabinetSelected} />

                                </div>
                            </div>

                            <div className="row">
                                <div className="col-lg-12 col-md-12">
                                    <Button onClick={affecterCF} hidden={choiceSelected === true ? false : true} size="small" variant="contained" style={{ marginLeft: "25px", marginTop: "20px" }} className={classes.buttonConfirmer}>
                                        Valider
                                    </Button>
                                </div>
                            </div>

                        </div>
                    </div>

                </Fade>
            </Modal>
        </div>
    );
}
