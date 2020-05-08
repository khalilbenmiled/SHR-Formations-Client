import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import CancelIcon from '@material-ui/icons/Cancel';
import ComponentListReponses from "./component-list-reponses"
import { TextField, Button } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { Grid } from '@material-ui/core';
import Switch from '@material-ui/core/Switch';


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
        height: "90vh",
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
    const rows = props.listQuestions

    const [question, setQuestion] = React.useState("");
    const [reponse1, setReponse1] = React.useState("");
    const [idReponse1, setIdReponse1] = React.useState("");

    const [reponse2, setReponse2] = React.useState("");
    const [idReponse2, setIdReponse2] = React.useState("");

    const [reponse3, setReponse3] = React.useState("");
    const [idReponse3, setIdReponse3] = React.useState("");

    const [reponse4, setReponse4] = React.useState("");
    const [idReponse4, setIdReponse4] = React.useState("");

    const [checked1, setChecked1] = React.useState(false);
    const [checked2, setChecked2] = React.useState(false);
    const [checked3, setChecked3] = React.useState(false);
    const [checked4, setChecked4] = React.useState(false);
    
    const [openFormulaire, setOpenFormulaire] = React.useState(false);
    const [idQuestion, setIdQuestion] = React.useState("");

    const handleClose = () => {
        props.handleClose()
    }

    const openEditQuestion = (question) => {
        setIdQuestion(question.id)
        setQuestion(question.question)

        setReponse1(question.listReponses[0].reponse)
        setIdReponse1(question.listReponses[0].id)

        setReponse2(question.listReponses[1].reponse)
        setIdReponse2(question.listReponses[1].id)

        setReponse3(question.listReponses[2].reponse)
        setIdReponse3(question.listReponses[2].id)

        setReponse4(question.listReponses[3].reponse)
        setIdReponse4(question.listReponses[3].id)

        setChecked1(question.listReponses[0].correcte)
        setChecked2(question.listReponses[1].correcte)
        setChecked3(question.listReponses[2].correcte)
        setChecked4(question.listReponses[3].correcte)

        setOpenFormulaire(true)
    }

    const onChangeQuestion = (e) => {
        setQuestion(e.target.value)
    }

    const handleChange1 = (event) => {
        setChecked1(event.target.checked)
        setChecked2(false)
        setChecked3(false)
        setChecked4(false)
    };

    const handleChange2 = (event) => {
        setChecked2(event.target.checked)
        setChecked1(false)
        setChecked3(false)
        setChecked4(false)
    };

    const handleChange3 = (event) => {
        setChecked3(event.target.checked)
        setChecked1(false)
        setChecked2(false)
        setChecked4(false)
    };

    const handleChange4 = (event) => {
        setChecked4(event.target.checked)
        setChecked1(false)
        setChecked2(false)
        setChecked3(false)
    };

    const onChangeReponse1 = (e) => {
        setReponse1(e.target.value)
    }

    const onChangeReponse2 = (e) => {
        setReponse2(e.target.value)
    }

    const onChangeReponse3 = (e) => {
        setReponse3(e.target.value)
    }

    const onChangeReponse4 = (e) => {
        setReponse4(e.target.value)
    }

    const verifyBeforeUpdate = () => {
        if (question === "" || reponse1 === "" || reponse2 === "" || reponse3 === "" || reponse4 === "" ||
            (!checked1 && !checked2 && !checked3 && !checked4)) {
            return 1
        } else {
            return 0
        }
    }

    const updateQuestion = () => {
        const obj = {
            id : idQuestion,
            question: question,
            reponse1: {
                id : idReponse1,
                reponse: reponse1,
                correcte: checked1
            },
            reponse2: {
                id : idReponse2,
                reponse: reponse2,
                correcte: checked2
            },
            reponse3: {
                id : idReponse3,
                reponse: reponse3,
                correcte: checked3
            },
            reponse4: {
                id : idReponse4,
                reponse: reponse4,
                correcte: checked4
            }
        }

        props.updateQuestion(obj)
        setOpenFormulaire(false)
    }

    const AntSwitch = withStyles((theme) => ({
        root: {
            width: 28,
            height: 16,
            padding: 0,
            display: 'flex',
        },
        switchBase: {
            padding: 2,
            color: theme.palette.grey[500],
            '&$checked': {
                transform: 'translateX(12px)',
                color: theme.palette.common.white,
                '& + $track': {
                    opacity: 1,
                    backgroundColor: "green",
                    borderColor: "green",
                },
            },
        },
        thumb: {
            width: 12,
            height: 12,
            boxShadow: 'none',
        },
        track: {
            border: `1px solid ${theme.palette.grey[500]}`,
            borderRadius: 16 / 2,
            opacity: 1,
            backgroundColor: theme.palette.common.white,
        },
        checked: {},
    }))(Switch);


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
                                    <h4 className="titreAction">Détails {props.quizInfos.nomQuiz}</h4>
                                </div>
                                <div className="col-lg-1 col-md-1" align="center">
                                    <CancelIcon onClick={handleClose} className={classes.cancelcon} />
                                </div>
                            </div>

                            <div className="row" style={{ marginTop: "-40px" }}>
                                <div className="col-lg-12 col-md-12">
                                    <ComponentListReponses rows={rows} openEditQuestion={openEditQuestion} />
                                </div>
                            </div>

                            <div hidden={!openFormulaire} className="row" style={{ paddingTop: "30px", width: "90%", backgroundColor: "#FAFAFA", margin: "auto", boxShadow: "0px 0px 1px" }}>
                                <div className="col-lg-11 col-md-11 offset-lg-1 offset-md-1">
                                    <div className="row">
                                        <div className="col-lg-8 col-md-8 offset-lg-3 offset-md-3">
                                            <div className="input-group mb-3 ">
                                                <div className="input-group-prepend">
                                                    <label style={{ width: 130 }} className="input-group-text" >Question ?</label>
                                                </div>
                                                <TextField value={question} onChange={onChangeQuestion} size="small" label="Question" variant="outlined" style={{ width: 260, backgroundColor: "white" }}  > </TextField>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row" style={{ marginTop: "10px" }}>
                                        <div className="col-lg-6 col-md-6">
                                            <div className="input-group mb-3 ">
                                                <div style={{ paddingTop: "6px", marginRight: "7px" }} className="input-group-prepend">
                                                    <Typography component="div">
                                                        <Grid component="label" container alignItems="center" spacing={1}>
                                                            <Grid item>Faux</Grid>
                                                            <Grid item>
                                                                <AntSwitch checked={checked1} onChange={handleChange1} name="checked1" />
                                                            </Grid>
                                                            <Grid item>Vrai</Grid>
                                                        </Grid>
                                                    </Typography>
                                                </div>
                                                <TextField value={reponse1} onChange={onChangeReponse1} size="small" label="Reponse 1" variant="outlined" style={{ backgroundColor: "white" }}  > </TextField>
                                            </div>
                                        </div>
                                        <div className="col-lg-6 col-md-6">
                                            <div className="input-group mb-3 ">
                                                <div style={{ paddingTop: "6px", marginRight: "7px" }} className="input-group-prepend">
                                                    <Typography component="div">
                                                        <Grid component="label" container alignItems="center" spacing={1}>
                                                            <Grid item>Faux</Grid>
                                                            <Grid item>
                                                                <AntSwitch checked={checked2} onChange={handleChange2} name="checked2" />
                                                            </Grid>
                                                            <Grid item>Vrai</Grid>
                                                        </Grid>
                                                    </Typography>
                                                </div>
                                                <TextField value={reponse2} onChange={onChangeReponse2} size="small" label="Reponse 2" variant="outlined" style={{ backgroundColor: "white" }}  > </TextField>
                                            </div>
                                        </div>
                                        <div className="col-lg-6 col-md-6">
                                            <div className="input-group mb-3 ">
                                                <div style={{ paddingTop: "6px", marginRight: "7px" }} className="input-group-prepend">
                                                    <Typography component="div">
                                                        <Grid component="label" container alignItems="center" spacing={1}>
                                                            <Grid item>Faux</Grid>
                                                            <Grid item>
                                                                <AntSwitch checked={checked3} onChange={handleChange3} name="checked3" />
                                                            </Grid>
                                                            <Grid item>Vrai</Grid>
                                                        </Grid>
                                                    </Typography>
                                                </div>
                                                <TextField value={reponse3} onChange={onChangeReponse3} size="small" label="Reponse 3" variant="outlined" style={{ backgroundColor: "white" }}  > </TextField>
                                            </div>
                                        </div>
                                        <div className="col-lg-6 col-md-6">
                                            <div className="input-group mb-3 ">
                                                <div style={{ paddingTop: "6px", marginRight: "7px" }} className="input-group-prepend">
                                                    <Typography component="div">
                                                        <Grid component="label" container alignItems="center" spacing={1}>
                                                            <Grid item>Faux</Grid>
                                                            <Grid item>
                                                                <AntSwitch checked={checked4} onChange={handleChange4} name="checked4" />
                                                            </Grid>
                                                            <Grid item>Vrai</Grid>
                                                        </Grid>
                                                    </Typography>
                                                </div>
                                                <TextField value={reponse4} onChange={onChangeReponse4} size="small" label="Reponse 4" variant="outlined" style={{ backgroundColor: "white" }}  > </TextField>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div hidden={!openFormulaire} className="row" style={{marginTop : "20px"}}>
                                <div className="col-lg-4 col-md-4 offset-lg-5 offset-md-5">
                                    <Button onClick={updateQuestion} disabled={verifyBeforeUpdate() === 1 ? true : false} size="small" variant="contained" className={classes.buttonAnnuler} > Modifier une question</Button>

                                </div>
                            </div>
                        </div>
                    </div>

                </Fade>
            </Modal>
        </div>
    );
}
