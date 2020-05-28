import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import CancelIcon from '@material-ui/icons/Cancel';
import { TextField, Grid, Button } from '@material-ui/core';
import Switch from '@material-ui/core/Switch';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Rating from '@material-ui/lab/Rating';

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
        minHeight: "40vh",
        maxHeight: "55vh",
        boxShadow: theme.shadows[5],

    },
    titre: {
        color: "#3D707E",
        fontSize: "16px"
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
    const [index, setIndex] = React.useState(0);
    const [checked1, setChecked1] = React.useState(false);
    const [checked2, setChecked2] = React.useState(false);
    const [checked3, setChecked3] = React.useState(false);
    const [checked4, setChecked4] = React.useState(false);
    const [uneReponse, setUneReponse] = React.useState("");
    const [mesReponses, setMesReponses] = React.useState([]);
    const [rating, setRating] = React.useState(0);


    const handleClose = () => {
        props.handleClose()
    }

    const handleChange1 = (event) => {
        if (event.target.checked) {
            const obj = {
                index: index,
                question: props.listQuestions[index].question,
                reponse: event.target.value
            }
            setUneReponse(obj)

        }
        setChecked1(event.target.checked)
        setChecked2(false)
        setChecked3(false)
        setChecked4(false)
    };

    const handleChange2 = (event) => {
        if (event.target.checked) {
            const obj = {
                index: index,
                question: props.listQuestions[index].question,
                reponse: event.target.value
            }
            setUneReponse(obj)
        }
        setChecked2(event.target.checked)
        setChecked1(false)
        setChecked3(false)
        setChecked4(false)
    };

    const handleChange3 = (event) => {
        if (event.target.checked) {
            const obj = {
                index: index,
                question: props.listQuestions[index].question,
                reponse: event.target.value
            }
            setUneReponse(obj)
        }
        setChecked3(event.target.checked)
        setChecked1(false)
        setChecked2(false)
        setChecked4(false)
    };

    const handleChange4 = (event) => {
        if (event.target.checked) {
            const obj = {
                index: index,
                question: props.listQuestions[index].question,
                reponse: event.target.value
            }
            setUneReponse(obj)
        }
        setChecked4(event.target.checked)
        setChecked1(false)
        setChecked2(false)
        setChecked3(false)
    };

    const nextQuestion = () => {
        if (index === props.listQuestions.length) {
            props.passerQuiz(mesReponses, props.idQuiz)
            props.rateFormation(props.idFormation , rating)
            setIndex(0)
            setMesReponses([])
            setUneReponse("")
            setChecked1(false)
            setChecked2(false)
            setChecked3(false)
            setChecked4(false)
            handleClose()
        } else {
            const tabs = mesReponses
            tabs.push(uneReponse)
            setMesReponses(tabs)
            setUneReponse("")
            setChecked1(false)
            setChecked2(false)
            setChecked3(false)
            setChecked4(false)
            var i = index
            setIndex(i + 1)
        }
    }

    const onChangeRating = (e, value) => {
        if(value != null) {
            setRating(value)
        }else {
            setRating(0)
        }
       

    }

    const disableNext = () => {
        if (!checked1 && !checked2 && !checked3 && !checked4 && index < props.listQuestions.length) {
            return 1
        } else {
            return 0
        }
    }

    const getQuestion = () => {
        if (index < props.listQuestions.length) {
            return (
                <>
                    <div className="row">
                        <div className="col-lg-8 col-md-8 offset-lg-3 offset-md-3">
                            <div className="input-group mb-3 ">
                                <div className="input-group-prepend">
                                    <label style={{ width: 130 }} className="input-group-text" >Question ?</label>
                                </div>
                                <TextField disabled value={props.listQuestions[index].question} size="small" label="Question" variant="outlined" style={{ width: 260, backgroundColor: "white" }}  > </TextField>
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
                                                <AntSwitch value={props.listQuestions[index].listReponses[0].reponse} checked={checked1} onChange={handleChange1} name="checked1" />
                                            </Grid>
                                            <Grid item>Vrai</Grid>
                                        </Grid>
                                    </Typography>
                                </div>
                                <TextField value={props.listQuestions[index].listReponses[0].reponse} size="small" label="Reponse 1" variant="outlined" style={{ backgroundColor: "white" }}  > </TextField>
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-6">
                            <div className="input-group mb-3 ">
                                <div style={{ paddingTop: "6px", marginRight: "7px" }} className="input-group-prepend">
                                    <Typography component="div">
                                        <Grid component="label" container alignItems="center" spacing={1}>
                                            <Grid item>Faux</Grid>
                                            <Grid item>
                                                <AntSwitch value={props.listQuestions[index].listReponses[1].reponse} checked={checked2} onChange={handleChange2} name="checked2" />
                                            </Grid>
                                            <Grid item>Vrai</Grid>
                                        </Grid>
                                    </Typography>
                                </div>
                                <TextField value={props.listQuestions[index].listReponses[1].reponse} size="small" label="Reponse 2" variant="outlined" style={{ backgroundColor: "white" }}  > </TextField>
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-6">
                            <div className="input-group mb-3 ">
                                <div style={{ paddingTop: "6px", marginRight: "7px" }} className="input-group-prepend">
                                    <Typography component="div">
                                        <Grid component="label" container alignItems="center" spacing={1}>
                                            <Grid item>Faux</Grid>
                                            <Grid item>
                                                <AntSwitch value={props.listQuestions[index].listReponses[2].reponse} checked={checked3} onChange={handleChange3} name="checked3" />
                                            </Grid>
                                            <Grid item>Vrai</Grid>
                                        </Grid>
                                    </Typography>
                                </div>
                                <TextField value={props.listQuestions[index].listReponses[2].reponse} size="small" label="Reponse 3" variant="outlined" style={{ backgroundColor: "white" }}  > </TextField>
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-6">
                            <div className="input-group mb-3 ">
                                <div style={{ paddingTop: "6px", marginRight: "7px" }} className="input-group-prepend">
                                    <Typography component="div">
                                        <Grid component="label" container alignItems="center" spacing={1}>
                                            <Grid item>Faux</Grid>
                                            <Grid item>
                                                <AntSwitch value={props.listQuestions[index].listReponses[3].reponse} checked={checked4} onChange={handleChange4} name="checked4" />
                                            </Grid>
                                            <Grid item>Vrai</Grid>
                                        </Grid>
                                    </Typography>
                                </div>
                                <TextField value={props.listQuestions[index].listReponses[3].reponse} size="small" label="Reponse 4" variant="outlined" style={{ backgroundColor: "white" }}  > </TextField>
                            </div>
                        </div>
                    </div>
                </>
            )
        } else {
            return (
                <>
                    <div className="row" style={{ paddingLeft: "280px" }}>
                        <div className="col-lg-12 col-md-12">
                            <h4 className={classes.titre}>Evaluer cette formation ! </h4>
                        </div>
                    </div>
                    <div className="row" style={{ paddingLeft: "300px" }}>
                        <div className="col-lg-12 col-md-12">
                            <Box component="fieldset" mb={0} borderColor="transparent">
                                <Rating onChange={onChangeRating} name="customized-10" defaultValue={0} max={5} />
                            </Box>
                        </div>
                    </div>
                </>

            )
        }
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
                                    <h4 className="titreAction">QUIZ {props.nomQuiz} </h4>
                                </div>
                                <div hidden className="col-lg-1 col-md-1" align="center">
                                    <CancelIcon onClick={handleClose} className={classes.cancelcon} />
                                </div>
                            </div>

                            <div className="row" style={{ paddingTop: "10px", width: "98%", margin: "auto", marginBottom: "20px", backgroundColor: "#FAFAFA", boxShadow: "0px 0px 1px" }}>
                                <div className="col-lg-12 col-md-12" >
                                    {getQuestion()}
                                </div>
                            </div>

                            <div className="row" style={{ marginTop: "10px", marginBottom: "50px" }}>
                                <div className="col-lg-12 col-md-12">
                                    <Button style={{ marginLeft: "690px" }} disabled={disableNext() === 1 ? true : false} onClick={nextQuestion} size="small" variant="contained" className={classes.buttonAnnuler} > {index < props.listQuestions.length ? "Suivant" : "Terminer"}</Button>
                                </div>
                            </div>

                        </div>
                    </div>

                </Fade>
            </Modal>
        </div>
    );
}
