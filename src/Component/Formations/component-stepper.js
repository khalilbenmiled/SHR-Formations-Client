import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import ComponentBesoins from "./component-besoins"
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
  return ['Besoins', 'Session de formation', 'Cabinet / Formateur'];
}

export default function HorizontalLabelPositionBelowStepper(props) {

  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const [activeContent, setActiveContent] = React.useState(0);


  const formateurCabinet = [
    { title: "Formateur" },
    { title: "Cabinet" }
  ]

  const steps = getSteps();

  const [selectedDateDebut, setSelectedDateDebut] = React.useState(null);
  const [selectedDateFin, setSelectedDateFin] = React.useState(null);
  const [formateur, setFormateur] = React.useState(true);
  const [cabinet, setCabinet] = React.useState(true);
  const [buttonStep1, setButtonStep1] = React.useState(0);

  const [dateDebutDisabled, setDateDebutDisabled] = React.useState(true);
  const [dateFinDisabled, setDateFinDisabled] = React.useState(true);


  // const [sessionS, setSessionS] = React.useState("");
  const [quarterS, setQuarterS] = React.useState("");
  // const [dureeS, setDureeS] = React.useState("");
  const [participants, setParticipants] = React.useState("");
  const [formateurs, setFormateurs] = React.useState([]);
  const [cabinets, setCabinets] = React.useState([]);
  const [nbrParticipantsSelected, setNbrParticipantsSelected] = React.useState(0);

  const [besoinS, setBesoinSelected] = React.useState({
    nom: "",
    quarter: ""
  });


  const quarter = [
    { title: "Trimestre 1" },
    { title: "Trimestre 2" },
    { title: "Trimestre 3" },
    { title: "Trimestre 4" }
  ]
  const handleDateDebutChange = (date) => {
    Moment.locale("fr");
    setSelectedDateDebut(date);
    setDateFinDisabled(false)
    props.dateDebutSelected(Moment(date).format("DD/MM/YYYY HH:mm"))
  };

  const handleDateFinChange = (date) => {
    Moment.locale("fr");
    setSelectedDateFin(date);
    props.dateFinSelected(Moment(date).format("DD/MM/YYYY HH:mm"))
  };

  const handleNext = () => {
    if (activeStep === 2) {
      props.ajouterSessionFormation()
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

  const participantsSelected = (participants) => {
    setParticipants(participants)
    setNbrParticipantsSelected(participants.length)
    props.participantsSelected(participants)
  }

  const onSelectFormateurCabinet = (e, values) => {
    if (values !== null) {
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
    }
  }

  const nbrCheck = (nb) => {
    setButtonStep1(nb)
  }

  const sessionSelected = (e, value) => {
    // setSessionS(value)
    props.sessionSelected(value)
  }

  const onChangeDuree = (e) => {
    // setDureeS(e.target.value)
    props.onChangeDuree(e.target.value)
  }

  const besoinSelected = (besoin) => {
    const obj = {
      nom: besoin.theme.nom,
      quarter: besoin.quarter
    }
    setBesoinSelected(obj)
    props.besoinSelected(besoin)
  }

  const quarterSelected = (e, value) => {
    if (value != null) {
      setQuarterS(value.title)
      setDateDebutDisabled(false)
      props.quarterSelected(value.title === "Trimestre 1" ? "1" : value.title === "Trimestre 2" ? "2" : value.title === "Trimestre 3" ? "3" : value.title === "Trimestre 4" ? "4" : 0)
    
    } else {
      setQuarterS("")
      setSelectedDateDebut(null)
      setSelectedDateFin(null)
      setDateDebutDisabled(true)
      setDateFinDisabled(true)
    }
  }

  const onChangerNbrParticipants = (e) => {
    setNbrParticipantsSelected(e.target.value)
    props.onChangerNbrParticipants(e.target.value)
  }

  function verifierSaisie() {
    if (selectedDateDebut === null || selectedDateFin === null || quarterS === "" || quarterS === null || nbrParticipantsSelected < participants.length) {
      return 1
    }
    return 0
  }

  function minDateDebutFunction(quarter) {

    let date = new Date()
    var month = date.getMonth() + 1
    if (quarter === "Trimestre 1") {

      if (Math.ceil(month / 3) > 1) {
        return "01.01." + (date.getFullYear() + 1).toString()
      } else {
        return "01.01." + date.getFullYear().toString()
      }

    } else if (quarter === "Trimestre 2") {
      if (Math.ceil(month / 3) > 2) {
        return "04.01." + (date.getFullYear() + 1).toString()
      } else {
        return "04.01." + date.getFullYear().toString()
      }

    } else if (quarter === "Trimestre 3") {
      if (Math.ceil(month / 3) > 3) {
        return "07.01." + (date.getFullYear() + 1).toString()
      } else {
        return "07.01." + date.getFullYear().toString()
      }

    } else if (quarter === "Trimestre 4") {
      if (Math.ceil(month / 3) > 4) {
        return "10.01." + (date.getFullYear() + 1).toString()
      } else {
        return "10.01." + date.getFullYear().toString()
      }

    }
  }

  function maxDateDebutFunction(quarter) {

    let date = new Date()
    var month = date.getMonth() + 1
    if (quarter === "Trimestre 1") {
      if (Math.ceil(month / 3) > 1) {
        return "03.31." + (date.getFullYear() + 1).toString()
      } else {
        return "03.31." + date.getFullYear().toString()
      }

    } else if (quarter === "Trimestre 2") {
      if (Math.ceil(month / 3) > 2) {
        return "06.30." + (date.getFullYear() + 1).toString()
      } else {
        return "06.30." + date.getFullYear().toString()
      }

    } else if (quarter === "Trimestre 3") {
      if (Math.ceil(month / 3) > 3) {
        return "09.30." + (date.getFullYear() + 1).toString()
      } else {
        return "09.30." + date.getFullYear().toString()
      }

    } else if (quarter === "Trimestre 4") {
      if (Math.ceil(month / 3) > 4) {
        return "12.31." + (date.getFullYear() + 1).toString()
      } else {
        return "12.31." + date.getFullYear().toString()
      }

    }
  }

  function maxDateFinFunction(quarter) {

    if (selectedDateDebut === null) {
      return
    } else {
      let date = selectedDateDebut
      var month = date.getMonth() + 1
      if (quarter === "Trimestre 1") {
        if (Math.ceil(month / 3) > 1) {
          return "03.31." + (date.getFullYear() + 1).toString()
        } else {
          return "03.31." + date.getFullYear().toString()
        }

      } else if (quarter === "Trimestre 2") {
        if (Math.ceil(month / 3) > 2) {
          return "06.30." + (date.getFullYear() + 1).toString()
        } else {
          return "06.30." + date.getFullYear().toString()
        }

      } else if (quarter === "Trimestre 3") {
        if (Math.ceil(month / 3) > 3) {
          return "09.30." + (date.getFullYear() + 1).toString()
        } else {
          return "09.30." + date.getFullYear().toString()
        }

      } else if (quarter === "Trimestre 4") {
        if (Math.ceil(month / 3) > 4) {
          return "12.31." + (date.getFullYear() + 1).toString()
        } else {
          return "12.31." + date.getFullYear().toString()
        }

      }
    }

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
        <div className="col-lg-12 col-md-12">
          <ComponentBesoins closePanel={props.closePanel} deleteBesoin={props.deleteBesoin} participantsSelected={participantsSelected} besoinUnselected={props.besoinUnselected} nbrCheck={nbrCheck} besoinSelected={besoinSelected} listBesoins={props.listBesoins} />
        </div>
      </div>

      <div hidden={activeContent === 1 ? false : true} className="row">
        <div className="col-lg-12 col-md-12">
          <div className={classes.rootSession}>
            <div className="row">
              <div style={{ color: "#3D707E", fontSize: "20px", fontWeight: "bold" }} className="col-lg-4 col-md-4 offset-lg-4 offset-md-4 ">
                {besoinS.nom} - Trimestre {besoinS.quarter}
              </div>
            </div>
            <div className="row" style={{ paddingTop: "20px" }}>
              <div className="col-lg-5 col-md-5 offset-lg-1 offset-md-1">
                <div style={{ width: 420 }} className="input-group mb-3">
                  <div style={{ height: 40 }} className="input-group-prepend" >
                    <label style={{ width: 120 }} className="input-group-text" >Trimestre</label>
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
              {/* HIDDEN SESSION */}
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
              {/* END HIDDEN SESSION */}

              <div className="col-lg-5 col-md-5 ">
                <div style={{ width: 420 }} className="input-group mb-3">
                  <div style={{ height: 40 }} className="input-group-prepend" >
                    <label style={{ width: 120 }} className="input-group-text" >Participants</label>
                  </div>
                  <div className="input-group-prepend">
                    <TextField value={nbrParticipantsSelected} type="number" style={{ width: 200, backgroundColor: "white" }} size="small" label="Nombres de participants" variant="outlined" onChange={onChangerNbrParticipants} />
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
                      disabled = {dateDebutDisabled}
                      disableToolbar
                      disablePast
                      minDate={minDateDebutFunction(quarterS)}
                      maxDate={maxDateDebutFunction(quarterS)}

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
                      disabled = {dateFinDisabled}
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
                      maxDate={maxDateFinFunction(quarterS)}
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


      <div>
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
                  disabled=
                  {
                    ((activeStep === 0 && buttonStep1 === 0) || (activeStep === 0 && participants.length === 0) ? true : false)
                    ||
                    (activeStep === 1 && verifierSaisie() === 1 ? true : false)
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
