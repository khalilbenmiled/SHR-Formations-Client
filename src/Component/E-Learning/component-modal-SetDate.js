import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import CancelIcon from '@material-ui/icons/Cancel';
import Moment from 'moment';
import 'moment/locale/fr'
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
        width: 600,
        height: "50vh",
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
    const [dateQuiz, setDateQuiz] = React.useState("");

    const handleClose = () => {
        props.handleClose()
    }

    const getDateQuiz = (date) => {
        Moment.locale("fr");
        setDateQuiz(Moment(date.target.value).add(-1,'hours').format("DD/MM/YYYY HH:mm"))
    }

    const modifierDateQuiz = () => {
        const obj = {
            id : props.quiz.id,
            date : dateQuiz
        }
        props.modifierDateQuiz(obj)
        handleClose()
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
                                    <h4 className="titreAction">{props.quiz.nomQuiz} : {Moment(props.quiz.date).add(-1, "hours").format("DD-MM-YYYY HH:mm").toString()}</h4>
                                </div>
                                <div className="col-lg-1 col-md-1" align="center">
                                    <CancelIcon onClick={handleClose} className={classes.cancelcon} />
                                </div>
                            </div>

                            <div className="row" style={{ marginTop: "10px", width: "90%", margin: "auto", paddingTop: "20px", backgroundColor: "#FAFAFA", boxShadow: "0px 0px 1px" }}>
                                <div className="col-lg-12 col-md-12">
                                    <form className={classes.container} noValidate>
                                        <TextField
                                            id="datetime-local"
                                            variant="outlined"
                                            label="Date quiz"
                                            type="datetime-local"
                                            defaultValue={Moment(new Date()).format("YYYY-MM-DDTHH:mm").toString()}
                                            className={classes.textField}
                                            style={{ backgroundColor: "white", marginLeft: "120px", marginBottom: "20px" }}
                                            onChange={getDateQuiz}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                        />
                                    </form>
                                </div>
                            </div>



                            <div style={{ paddingTop: "20px", marginLeft: 380, display: "flex", flexDirection: "row", justifyContent: "space-between", width: 170 }}>
                                <Button size="small" variant="contained" className={classes.buttonAnnuler} onClick={props.handleClose}> Annuler</Button>
                                <Button disabled={dateQuiz === "" ? true : false} onClick={modifierDateQuiz} size="small" variant="contained" className={classes.buttonConfirmer} > Modifier</Button>
                            </div>
                        </div>
                    </div>

                </Fade>
            </Modal>
        </div>
    );
}
