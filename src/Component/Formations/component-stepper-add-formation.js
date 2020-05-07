import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import Checkbox from '@material-ui/core/Checkbox';
import { TextField } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import ComponentModalSession from "./component-modal-session"
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import fr from "date-fns/locale/fr";
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import EventIcon from '@material-ui/icons/Event';
import Moment from 'moment';
import 'moment/locale/fr'
import ComponentListFormateurs from "./component-list-formateurs"
import ComponentListCabinets from "./component-list-cabinets"
import ComponentThemes from "../Besoins-Formations/component-themes"
import ComponentModalModules from "./component-modal-module"
import ComponentListCollaborateurs from "./component-list-collaborateurs"
import axios from "axios"


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
}));

function getSteps() {
    return ['Action de formation', 'Session de formation', 'Participants', 'Cabinet / Formateur'];
}

export default function HorizontalLabelPositionBelowStepper(props) {

    const classes = useStyles();
    const [activeStep, setActiveStep] = React.useState(0);
    const [activeContent, setActiveContent] = React.useState(0);
    const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
    const checkedIcon = <CheckBoxIcon fontSize="small" />;


    const formateurCabinet = [
        { title: "Formateur" },
        { title: "Cabinet" }
    ]

    const steps = getSteps();

    const [selectedDateDebut, setSelectedDateDebut] = React.useState(null);
    const [selectedDateFin, setSelectedDateFin] = React.useState(null);
    const [formateur, setFormateur] = React.useState(true);
    const [cabinet, setCabinet] = React.useState(true);
    const [open, setOpen] = React.useState(false);
    // const [sessionS, setSessionS] = React.useState("");
    const [quarterS, setQuarterS] = React.useState("");
    // const [dureeS, setDureeS] = React.useState("");
    const [themeSelect, setThemeSelect] = React.useState("");
    const [radioSelect, setRadioSelect] = React.useState(false);
    const [modulesSelect, setModulesSelect] = React.useState([]);
    const [collaborateurs, setCollaborateurs] = React.useState([]);
    const [maxParticipants, setMaxParticipants] = React.useState(0);
    const [formateurs, setFormateurs] = React.useState([]);
    const [cabinets, setCabinets] = React.useState([]);


    const quarter = [
        { title: "Trimestre 1" },
        { title: "Trimestre 2" },
        { title: "Trimestre 3" },
        { title: "Trimestre 4" }
    ]
    const handleDateDebutChange = (date) => {
        Moment.locale("fr");
        setSelectedDateDebut(date);
        props.dateDebutSelected(Moment(date).format("DD/MM/YYYY HH:mm"))
    };

    const handleDateFinChange = (date) => {
        Moment.locale("fr");
        setSelectedDateFin(date);
        props.dateFinSelected(Moment(date).format("DD/MM/YYYY HH:mm"))
    };


    const handleNext = () => {
        if (activeStep === 1) {
            axios.get("http://localhost:8181/users/collaborateurs").then(res => {
                if (res.data.Collaborateurs) {
                    setCollaborateurs(res.data.Collaborateurs)
                }
            })
        }
        if (activeStep === 3) {
            props.ajouterNouvelleFormation()
            window.location.reload(true)
        }
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setActiveContent((prevActiveStep) => prevActiveStep + 1)
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
        setActiveContent((prevActiveStep) => prevActiveStep - 1)
    };

    function disableWeekends(date) {
        return date.getDay() === 0
    }

    const onSelectFormateurCabinet = (e, values) => {
        if (values !== null) {
            if (values.title === "Formateur") {
                axios.get("http://localhost:8282/formateurs").then(res => {
                    if (res.data.formateurs) {
                        setFormateurs(res.data.formateurs)
                        setFormateur(false)
                        setCabinet(true)
                    }
                })
            } else if (values.title === "Cabinet") {
                axios.get("http://localhost:8282/cabinets").then(res => {
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
        }
    }


    const sessionSelected = (e, value) => {
        // setSessionS(value)
        props.sessionSelected(value)
    }

    const onChangeDuree = (e) => {
        // setDureeS(e.target.value)
        props.onChangeDuree(e)
    }



    const quarterSelected = (e, value) => {
        if (value != null) {
            setQuarterS(value.title)
            props.quarterSelected(value.title === "Trimestre 1" ? "1" : value.title === "Trimestre 2" ? "2" : value.title === "Trimestre 3" ? "3" : value.title === "Trimestre 4" ? "4" : 0)
        } else {
            setQuarterS("")
        }
    }

    function verifierSaisie() {
        if ( selectedDateDebut === null || selectedDateFin === null || quarterS === "" || quarterS === null || maxParticipants === 0) {
            return 1
        }
        return 0
    }

    const handleOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    const actionSelected = (e) => {
        setRadioSelect(true)
        setThemeSelect(JSON.parse(e.target.value))
        props.actionSelected(e)
    }

    const getModules = (e, values) => {
        if (values.length !== 0) {
            setModulesSelect(values)
            props.getModules(values)
        } else {
            setModulesSelect([])
        }

    }

    const onChangeMaxParticipants = (e) => {
        setMaxParticipants(e.target.value)
        props.onChangeMaxParticipants(e)
    }

    return (
        <div className={classes.root}>

            <Stepper activeStep={activeStep} alternativeLabel >
                {steps.map((label) => (
                    <Step key={label} >
                        <StepLabel StepIconProps={{ classes: { root: classes.icon, active: classes.activeIcon, completed: classes.completedIcon } }}>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
            <div hidden={activeContent === 0 ? false : true} className="row">
                <div className="col-lg-8 col-md-8">
                    <div className="input-group mb-3">
                        <div className="input-group-prepend" >
                            <label className="input-group-text"  >Action de formation</label>
                        </div>
                        <select className="custom-select" id="inputGroupSelect01" onChange={props.onChangeTheme}>
                            <option defaultValue value="TOUS">Tous</option>
                            <option value="TECHNIQUE">TECHNIQUE</option>
                            <option value="SOFTWARE">PRODUITS</option>
                            <option value="SOFTSKILLS">SOFTSKILLS</option>
                        </select>
                    </div>
                    <ComponentThemes
                        themes={props.themes}
                        actionSelected={actionSelected}
                        addAction={props.addAction}
                    />
                </div>
                <div className="col-lg-4 col-md-4" style={{ paddingTop: "60px" }}>
                    <Autocomplete
                        disabled={radioSelect === true ? false : true}
                        size="small"
                        multiple
                        id="checkboxes-tags-demo"
                        options={props.modules}
                        onChange={getModules}
                        disableCloseOnSelect
                        getOptionLabel={option => option.nom}
                        renderOption={(option, { selected }) => (
                            <React.Fragment >
                                <Checkbox
                                    size="small"
                                    icon={icon}
                                    checkedIcon={checkedIcon}
                                    style={{ marginRight: 8 }}
                                    checked={selected}


                                />
                                {option.nom} - {option.description}
                            </React.Fragment>
                        )}
                        style={{ width: 300 }}

                        renderInput={params => (
                            <TextField {...params} variant="outlined" label="Modules" placeholder="Modules" />
                        )}


                    />
                    <Button disabled={radioSelect === true ? false : true} style={{ margin: "10px 0px", marginLeft: 140 }} color="secondary" className={classes.buttonStyles} size="small" variant="outlined" onClick={handleOpen}>
                        Ajouter un module
                    </Button>
                    <ComponentModalModules open={open} handleClose={handleClose} addModule={props.addModule} />
                </div>
            </div>

            <div hidden={activeContent === 1 ? false : true} className="row">
                <div className="col-lg-12 col-md-12">
                    <div className={classes.rootSession}>
                        <div className="row">
                            <div style={{ color: "#3D707E", fontSize: "20px", fontWeight: "bold" }} className="col-lg-5 col-md-5 offset-lg-5 offset-md-5 ">
                                Action {themeSelect.nom}
                            </div>
                        </div>
                        <div className="row" style={{ paddingTop: "20px" }}>
                            <div className="col-lg-5 col-md-5 offset-lg-1 offset-md-1">
                                <div style={{ width: 420 }} className="input-group mb-3">
                                    <div style={{ height: 40 }} className="input-group-prepend" >
                                        <label style={{ width: 120 }} className="input-group-text" >Trimester</label>
                                    </div>
                                    <Autocomplete
                                        size="small"
                                        options={quarter}
                                        onChange={quarterSelected}
                                        getOptionLabel={option => option.title}
                                        style={{ width: 200, backgroundColor: "white" }}
                                        renderInput={params => <TextField {...params} label="Trimestre" variant="outlined" />}
                                    />
                                </div>
                            </div>

                            {/* SESSION HIDDEN */}
                            <div hidden className="col-lg-5 col-md-5">
                                <div style={{ width: 420 }} className="input-group mb-3">
                                    <div style={{ height: 40 }} className="input-group-prepend" >
                                        <label style={{ width: 120 }} className="input-group-text" >Session</label>
                                    </div>
                                    <Autocomplete
                                        size="small"
                                        options={props.sessions}
                                        onChange={sessionSelected}
                                        getOptionLabel={option => option.nom}
                                        style={{ width: 200, backgroundColor: "white" }}
                                        renderInput={params => <TextField {...params} label="Session" variant="outlined" />}
                                    />
                                    <ComponentModalSession ajouterSession={props.ajouterSession} />
                                </div>
                            </div>
                            {/* END SESSION HIDDEN */}

                            <div className="col-lg-5 col-md-5">
                                <div style={{ width: 420 }} className="input-group mb-3">
                                    <div style={{ height: 40 }} className="input-group-prepend" >
                                        <label style={{ width: 120 }} className="input-group-text" >Participants</label>
                                    </div>
                                    <div className="input-group-prepend">
                                        <TextField type="number" style={{ width: 200, backgroundColor: "white" }} size="small" label="Max participants" variant="outlined" onChange={onChangeMaxParticipants} />
                                    </div>
                                </div>

                            </div>
                        </div>

                        <div className="row" style={{ paddingTop: "20px" }}>
                            <div className="col-lg-5 col-md-5 offset-lg-1 offset-md-1">
                                <div style={{ width: 320 }} className="input-group mb-3">
                                    <div style={{ height: 40 }} className="input-group-prepend" >
                                        <label style={{ width: 120 }} className="input-group-text" >Date debut</label>
                                    </div>
                                    <MuiPickersUtilsProvider locale={fr} utils={DateFnsUtils}>

                                        <KeyboardDatePicker
                                            size="small"
                                            autoOk
                                            disableToolbar
                                            disablePast
                                            shouldDisableDate={disableWeekends}
                                            keyboardIcon={<EventIcon style={{ outline: "none", "&:focus": { outline: "none" } }} />}
                                            inputVariant="outlined"
                                            format="d MMM yyyy"
                                            style={{ width: 200, backgroundColor: "white" }}
                                            label="Date debut"
                                            value={selectedDateDebut}

                                            onChange={handleDateDebutChange}
                                            KeyboardButtonProps={{
                                                'aria-label': 'change date',
                                            }}
                                        />

                                    </MuiPickersUtilsProvider>
                                </div>

                            </div>
                            <div className="col-lg-5 col-md-5">
                                <div style={{ width: 320 }} className="input-group mb-3">
                                    <div style={{ height: 40 }} className="input-group-prepend" >
                                        <label style={{ width: 120 }} className="input-group-text" >Date fin</label>
                                    </div>
                                    <MuiPickersUtilsProvider locale={fr} utils={DateFnsUtils}>

                                        <KeyboardDatePicker
                                            size="small"
                                            autoOk
                                            shouldDisableDate={disableWeekends}
                                            disableToolbar
                                            disablePast
                                            keyboardIcon={<EventIcon style={{ outline: "none", "&:focus": { outline: "none" } }} />}
                                            inputVariant="outlined"
                                            format="d MMM yyyy"
                                            style={{ width: 200, backgroundColor: "white" }}
                                            label="Date fin"
                                            minDate={selectedDateDebut}
                                            minDateMessage="Date doit etre supérieur au date début"
                                            value={selectedDateFin}
                                            onChange={handleDateFinChange}
                                            KeyboardButtonProps={{
                                                'aria-label': 'change date',
                                            }}
                                        />

                                    </MuiPickersUtilsProvider>
                                </div>
                            </div>
                        </div>

                        <div hidden className="row" style={{ paddingTop: "20px" }}>
                            {/* <div className="col-lg-5 col-md-5 offset-lg-1 offset-md-1">
                                <div style={{ width: 420 }} className="input-group mb-3">
                                    <div style={{ height: 40 }} className="input-group-prepend" >
                                        <label style={{ width: 120 }} className="input-group-text" >Participants</label>
                                    </div>
                                    <div className="input-group-prepend">
                                        <TextField type="number" style={{ width: 200, backgroundColor: "white" }} size="small" label="Max participants" variant="outlined" onChange={onChangeMaxParticipants} />
                                    </div>
                                </div>

                            </div> */}

                            <div hidden className="col-lg-5 col-md-5 ">
                                <div style={{ width: 420 }} className="input-group mb-3">
                                    <div style={{ height: 40 }} className="input-group-prepend" >
                                        <label style={{ width: 120 }} className="input-group-text" >Durée</label>
                                    </div>
                                    <TextField type="number" style={{ width: 200, backgroundColor: "white" }} size="small" label="Durée" variant="outlined" onChange={onChangeDuree} />
                                </div>

                            </div>
                        </div>



                    </div>
                </div>
            </div>

            <div hidden={activeContent === 2 ? false : true} className="row">
                <div className="col-lg-12 col-md-12">
                    <div className={classes.rootSession}>
                        <h4 style={{ color: "#3D707E", fontSize: "20px", fontWeight: "bold" }}>La liste des collaborateurs</h4>
                        <ComponentListCollaborateurs listParticipants={collaborateurs} participantsSelected={props.participantsSelected} />
                    </div>
                </div>
            </div>

            <div hidden={activeContent === 3 ? false : true} className="row">
                <div className="col-lg-12 col-md-12">
                    <div className={classes.rootSession}>
                        <div className="row" style={{ paddingTop: "20px" }}>
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

                        <div className="row" style={{ paddingTop: "20px" }}>
                            <div hidden={formateur ? true : false} className="col-lg-12 col-md-12">
                                <ComponentListFormateurs formateurs={formateurs} formateurSelected={props.formateurSelected} />

                            </div>
                            <div hidden={cabinet ? true : false} className="col-lg-12 col-md-12">
                                <ComponentListCabinets cabinets={cabinets} cabinetSelected={props.cabinetSelected} />

                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <div style={{ position: "fixed", top: "88%" }}>
                {activeStep === steps.length ? (
                    <div>
                        <Typography className={classes.instructions}>All steps completed</Typography>
                    </div>
                ) : (
                        <div style={{ marginBottom: "10px" }}>
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
                                    disabled={
                                        (activeStep === 0 && modulesSelect.length === 0) ||
                                            (activeStep === 1 && verifierSaisie() === 1) ? true : false
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
