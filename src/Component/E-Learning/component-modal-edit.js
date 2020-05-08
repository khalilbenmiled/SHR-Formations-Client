import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import CancelIcon from '@material-ui/icons/Cancel';
import { TextField, Button } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';


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
        width: 800,
        height: "60vh",
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

    const [nomQuiz, setNomQuiz] = React.useState(props.nomQuiz);
    const [nombreQuestions, setNombreQuestions] = React.useState(props.nbrQuestion);
    // const [formation, setFormation] = React.useState("");

    const handleClose = () => {
        props.handleClose()
    }


    const onChangeNom = (e) => {
        setNomQuiz(e.target.value)
    }

    const onChangeNombreQuestion = (e) => {
        setNombreQuestions(e.target.value)
    }

    const onChangeFormation = (e, value) => {
        // setFormation(value)
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
                                    <h4 className="titreAction">Modifier {props.nomQuiz} </h4>
                                </div>
                                <div className="col-lg-1 col-md-1" align="center">
                                    <CancelIcon onClick={handleClose} className={classes.cancelcon} />
                                </div>
                            </div>

                            <div className="row" style={{ paddingTop: "30px", backgroundColor: "#FAFAFA", margin: "auto", boxShadow: "0px 0px 1px" }}>
                                <div className="col-lg-7 col-md-7 offset-lg-3 offset-md-3">
                                    <div className="input-group mb-3 ">
                                        <div className="input-group-prepend">
                                            <label style={{ width: 130 }} className="input-group-text" >Nom </label>
                                        </div>
                                        <TextField value={nomQuiz} onChange={onChangeNom} size="small" label="Nom" variant="outlined" style={{ width: 260, backgroundColor: "white" }}  > </TextField>
                                    </div>

                                    <div className="input-group mb-3 ">
                                        <div className="input-group-prepend">
                                            <label style={{ width: 130 }} className="input-group-text" >Nbr Questions </label>
                                        </div>
                                        <TextField value={nombreQuestions} type="number" onChange={onChangeNombreQuestion} size="small" label="Nombre de questions" variant="outlined" style={{ width: 260, backgroundColor: "white" }}  > </TextField>
                                    </div>

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
                             
                                    <div className="col-lg-4 col-md-4 offset-lg-5 offset-md-5" style={{marginBottom : "20px"}}>
                                        <Button size="small" variant="contained" className={classes.buttonAnnuler} > Modifier quiz</Button>

                                    </div>
                      
                            </div>


                        </div>
                    </div>

                </Fade>
            </Modal>
        </div>
    );
}
