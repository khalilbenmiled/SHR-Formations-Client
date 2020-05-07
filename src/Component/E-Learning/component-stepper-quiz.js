import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { TextField, Grid } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Switch from '@material-ui/core/Switch';
import Alert from '@material-ui/lab/Alert';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    backButton: {
        marginRight: theme.spacing(1),
    },
    instructions: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
    icon: {
        color: "#D5D5D5",
        "&$activeIcon": {
            color: "#B51B10"
        },
        "&$completedIcon": {
            color: "#B51B10"
        }
    },
    activeIcon: {},
    completedIcon: {},
    button: {
        marginTop: theme.spacing(1),
        marginRight: theme.spacing(1),
        backgroundColor: "#B51B10",
        color: "white",
        "&:hover": {
            backgroundColor: "#B51B10",
            color: "white"
        },
        "&:focus": {
            outline: "none"
        }
    },
    buttonBack: {
        marginTop: theme.spacing(1),
        marginRight: theme.spacing(1),
        "&:focus": {
            outline: "none"
        }
    },
    rootSession: {
        width: '100%',
        boxShadow: "0px 0px 1.5px",
        backgroundColor: "#FAFAFA",
        padding: "10px"
    },
    buttonStyles: {
        border: "1px solid #B51B10",
        marginLeft: "780px",
        marginTop: "5px",
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
}));

function getSteps() {
    return ['Quiz', 'Questions / Reponses'];
}

export default function HorizontalLabelPositionBelowStepper(props) {

    const classes = useStyles();
    const [activeStep, setActiveStep] = React.useState(0);
    const [activeContent, setActiveContent] = React.useState(0);
    const steps = getSteps();
    const [nomQuiz, setNomQuiz] = React.useState("");
    const [nombreQuestions, setNombreQuestions] = React.useState(0);
    const [formation, setFormation] = React.useState("");
    const [question, setQuestion] = React.useState("");
    const [reponse1, setReponse1] = React.useState("");
    const [reponse2, setReponse2] = React.useState("");
    const [reponse3, setReponse3] = React.useState("");
    const [reponse4, setReponse4] = React.useState("");
    const [checked1, setChecked1] = React.useState(false);
    const [checked2, setChecked2] = React.useState(false);
    const [checked3, setChecked3] = React.useState(false);
    const [checked4, setChecked4] = React.useState(false);

    const [listQuestionReponse, setListQuestionReponse] = React.useState([]);


    const handleNext = () => {
        if (activeStep === 0) {
            setListQuestionReponse([])
            setQuestion("")
            setReponse1("")
            setReponse2("")
            setReponse3("")
            setReponse4("")
            setChecked1(false)
            setChecked2(false)
            setChecked3(false)
            setChecked4(false)
        }
        if (activeStep === 1) {
            const obj = {
                nomQuiz : nomQuiz,
                idFormation : formation.id,
                nbrQuestion : nombreQuestions,
                listQuestionReponse : listQuestionReponse
            }

            props.ajouterQuiz(obj)
            props.closeModal()
        }
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setActiveContent((prevActiveStep) => prevActiveStep + 1)
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
        setActiveContent((prevActiveStep) => prevActiveStep - 1)
    };

    const onChangeNom = (e) => {
        setNomQuiz(e.target.value)
    }

    const onChangeNombreQuestion = (e) => {
        setNombreQuestions(e.target.value)
    }

    const onChangeFormation = (e, value) => {
        setFormation(value)
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

    const nouvelleQuestion = () => {
        const tabs = listQuestionReponse

        const obj = {
            question: question,
            reponse1: {
                reponse: reponse1,
                correcte: checked1
            },
            reponse2: {
                reponse: reponse2,
                correcte: checked2
            },
            reponse3: {
                reponse: reponse3,
                correcte: checked3
            },
            reponse4: {
                reponse: reponse4,
                correcte: checked4
            }
        }
        tabs.push(obj)

        setListQuestionReponse(tabs)
        setQuestion("")
        setReponse1("")
        setReponse2("")
        setReponse3("")
        setReponse4("")
        setChecked1(false)
        setChecked2(false)
        setChecked3(false)
        setChecked4(false)
    }

    const verifStep0 = () => {
        if (nomQuiz === "" || nombreQuestions === "" || nombreQuestions === "0" || nombreQuestions < 0 || formation === null || formation === "") {
            return 1
        } else {
            return 0
        }
    }

    const verifStep1 = () => {
        if (nombreQuestions - listQuestionReponse.length !== 0) {
            return 1
        } else {
            return 0
        }
    }

    const verifInputStep1 = () => {
        if (question === "" || reponse1 === "" || reponse2 === "" || reponse3 === "" || reponse4 === "" ||
            (!checked1 && !checked2 && !checked3 && !checked4)) {
            return 1
        } else {
            return 0
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
        <div className={classes.root}>

            <Stepper activeStep={activeStep} alternativeLabel >
                {steps.map((label) => (
                    <Step key={label} >
                        <StepLabel StepIconProps={{ classes: { root: classes.icon, active: classes.activeIcon, completed: classes.completedIcon } }}>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
            <div hidden={activeContent === 0 ? false : true} className="row" style={{marginTop : "10px"}}>
                <div className="col-lg-12 col-md-12">
                    <div className="input-group mb-3 ">
                        <div className="input-group-prepend">
                            <label style={{ width: 130 }} className="input-group-text" >Nom </label>
                        </div>
                        <TextField onChange={onChangeNom} size="small" label="Nom" variant="outlined" style={{ width: 260, backgroundColor: "white" }}  > </TextField>
                    </div>

                    <div className="input-group mb-3 ">
                        <div className="input-group-prepend">
                            <label style={{ width: 130 }} className="input-group-text" >Nbr Questions </label>
                        </div>
                        <TextField type="number" onChange={onChangeNombreQuestion} size="small" label="Nombre de questions" variant="outlined" style={{ width: 260, backgroundColor: "white" }}  > </TextField>
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
            </div>

            <div hidden={activeContent === 1 ? false : true} className="row">
                <div className="col-lg-12 col-md-12">
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
                    <div className="row" style={{ marginTop: "10px" }}>
                        <div className="col-lg-4 col-md-4 offset-lg-4 offset-md-4">
                            <Button disabled={verifInputStep1() === 1 ? true : false} hidden={verifStep1() === 0 ? true : false} onClick={nouvelleQuestion} size="small" variant="contained" className={classes.buttonAnnuler} > Ajouter une autre question</Button>
                        </div>
                    </div>

                    <div className="row" style={{ marginTop: "10px" }}>
                        <div className="col-lg-12 col-md-12">
                            <Alert hidden={nombreQuestions - listQuestionReponse.length === 0 ? true : false} severity="success">{nombreQuestions - listQuestionReponse.length} questions à saisir</Alert>
                        </div>
                    </div>

                </div>
            </div>


            <div style={{ position: "fixed", top: "75%" }}>
                {activeStep === steps.length ? (
                    <div>
                        <Typography className={classes.instructions}>All steps completed</Typography>
                    </div>
                ) : (
                        <div style={{ marginTop: "30px" }}>
                            <div>
                                <Button
                                    size="small"
                                    disabled={activeStep === 0}
                                    onClick={handleBack}
                                    className={classes.buttonBack}
                                >
                                    Retour
                                </Button>
                                <Button
                                    size="small"
                                    disabled={(verifStep0() === 1 && activeStep === 0)
                                        || (verifStep1() !== 0 && activeStep === 1)
                                        ? true : false

                                    }
                                    variant="contained" color="primary" onClick={handleNext} className={classes.button}
                                >
                                    {activeStep === steps.length - 1 ? 'Terminer' : 'Suivant'}
                                </Button>
                            </div>
                        </div>
                    )}
            </div>
        </div>
    );
}
