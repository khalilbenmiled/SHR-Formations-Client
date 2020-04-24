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
  icon:{
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
    backgroundColor : "#B51B10",
    color : "white",
    "&:hover" : {
      backgroundColor : "#B51B10",
      color : "white"
    },
    "&:focus" : {
      outline : "none"
    }
  },
  buttonBack: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
    "&:focus" : {
      outline : "none"
    }
  },
  rootSession : {
    width: '100%',
    boxShadow: "0px 0px 1.5px",
    backgroundColor : "#FAFAFA",
    padding : "10px"
  },
  buttonStyles :{
    border : "1px solid #B51B10",
    marginLeft :"780px",
    marginTop : "5px",
    color : "#B51B10",
    "&:focus" : {
        outline : "none"
    }
  },
}));

function getSteps() {
  return ['Besoins','Session de formation', 'Cabinet / Formateur'];
}

export default function HorizontalLabelPositionBelowStepper(props) {
  
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const [activeContent, setActiveContent] = React.useState(0);

  
  const formateurCabinet = [
      {title : "Formateur"},
      {title : "Cabinet"}
  ]

  const steps = getSteps();

  const [selectedDateDebut, setSelectedDateDebut] = React.useState(null);
  const [selectedDateFin, setSelectedDateFin] = React.useState(null);
  const [formateur, setFormateur] = React.useState(true);
  const [cabinet, setCabinet] = React.useState(true);
  const [buttonStep1, setButtonStep1] = React.useState(0);
  const [buttonStep11, setButtonStep11] = React.useState(0);
  
  const [sessionS, setSessionS] = React.useState("");
  const [quarterS, setQuarterS] = React.useState("");
  const [dureeS, setDureeS] = React.useState("");

  const [besoinS, setBesoinSelected] = React.useState({
    nom : "",
    quarter : ""
  });
  


  const quarter = [
    {title : "Trimestre 1"} , 
    {title : "Trimestre 2"},
    {title : "Trimestre 3"},
    {title : "Trimestre 4"}
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
    if(activeStep === 2) {
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

  const onSelectFormateurCabinet = (e,values) => {
      console.log(values)
    if(values !== null){
        if(values.title ==="Formateur" ){
            setFormateur(false)
            setCabinet(true)
        }else if (values.title === "Cabinet") {
            setFormateur(true)
            setCabinet(false)
        }else {
            setFormateur(true)
            setCabinet(true)
        }
    }else {
        setFormateur(true)
        setCabinet(true)
    }
  }

  const nbrCheck = (nb) => {
    setButtonStep1(nb)
  }

  const sessionSelected = (e,value) => {
    setSessionS(value)
    props.sessionSelected(value)
  }

  const onChangeDuree = (e) => {
    setDureeS(e.target.value)
    props.onChangeDuree(e.target.value)
  }

  const besoinSelected = (besoin) => {
    const obj = {
      nom : besoin.theme.nom,
      quarter : besoin.quarter
    }
    setBesoinSelected(obj)
    props.besoinSelected(besoin)
  }

  const quarterSelected = (e,value) => {
    if(value != null) {
      setQuarterS(value.title) 
      props.quarterSelected(value.title === "Trimestre 1" ? "1" : value.title === "Trimestre 2" ? "2" : value.title === "Trimestre 3" ? "3" : value.title === "Trimestre 4" ? "4" : 0)
    }else {
      setQuarterS("")
    }
  }

  const nbrcheckParticipants = (i) => {
      if(i === 0 ){
        setButtonStep11(0)
      }else {
        setButtonStep11(1)
      }
  }

  function verifierSaisie  ()  {
    if(sessionS === "" || sessionS === null || selectedDateDebut === null || selectedDateFin === null ||dureeS === "" || quarterS === "" || quarterS === null){
      return 1
    }
    return 0
  }

  return (
    <div className={classes.root}>
      
      <Stepper activeStep={activeStep} alternativeLabel >
        {steps.map((label) => (
          <Step key={label} >
            <StepLabel StepIconProps={{ classes:{ root: classes.icon, active: classes.activeIcon, completed: classes.completedIcon } }}>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div hidden = {activeContent === 0 ? false : true} className="row">
          <div className="col-lg-12 col-md-12">
              <ComponentBesoins nbrcheckParticipants={nbrcheckParticipants} participantsSelected={props.participantsSelected} besoinUnselected={props.besoinUnselected} nbrCheck = {nbrCheck} besoinSelected = {besoinSelected} listBesoins = {props.listBesoins} />
          </div>
      </div>

      <div hidden = {activeContent === 1 ? false : true} className="row">
          <div className="col-lg-12 col-md-12">
                <div className={classes.rootSession}>
                    <div className="row">
                      <div style={{color : "#3D707E" , fontSize :"20px" , fontWeight : "bold"}} className="col-lg-4 col-md-4 offset-lg-4 offset-md-4 ">
                           {besoinS.nom} - Trimestre {besoinS.quarter} 
                      </div>
                    </div>
                    <div className="row" style={{paddingTop : "20px" }}>
                        <div className="col-lg-5 col-md-5 offset-lg-1 offset-md-1">
                            <div style={{width : 420 }} className="input-group mb-3">
                                <div style = {{height : 40 }} className="input-group-prepend" >
                                    <label   style={{width : 120}} className="input-group-text" >Trimester</label>
                                </div>
                                <Autocomplete
                                    size="small"
                                    options={quarter}
                                    onChange={quarterSelected}
                                    getOptionLabel={option => option.title}
                                    style={{ width: 200 , backgroundColor : "white" }}
                                    renderInput={params => <TextField {...params} label="Trimestre" variant="outlined" />}
                                />
                            </div>
                        </div>
                        <div className="col-lg-5 col-md-5">
                            <div style={{width : 420 }} className="input-group mb-3">
                                <div style = {{height : 40 }} className="input-group-prepend" >
                                    <label   style={{width : 120}} className="input-group-text" >Session</label>
                                </div>
                                <Autocomplete
                                    size="small"
                                    options={props.sessions}
                                    onChange={sessionSelected}
                                    getOptionLabel={option => option.nom}
                                    style={{ width: 200 , backgroundColor : "white" }}
                                    renderInput={params => <TextField {...params} label="Session" variant="outlined" />}
                                />
                                <ComponentModalSession ajouterSession = {props.ajouterSession} />
                            </div>
                        </div>
                    </div>

                    <div className="row" style={{paddingTop : "20px" }}>
                        <div className="col-lg-5 col-md-5 offset-lg-1 offset-md-1">
                                 <div style={{width : 320 }} className="input-group mb-3">
                                    <div style = {{height : 40 }} className="input-group-prepend" >
                                        <label   style={{width : 120}} className="input-group-text" >Date debut</label>
                                    </div>
                                    <MuiPickersUtilsProvider locale={fr} utils={DateFnsUtils}>
                                        
                                            <KeyboardDatePicker
                                                size = "small"
                                                autoOk
                                                disableToolbar
                                                disablePast
                                                shouldDisableDate={disableWeekends}
                                                keyboardIcon = {<EventIcon style={{outline : "none" , "&:focus" : {outline : "none"}}}/>}
                                                inputVariant="outlined"
                                                format="d MMM yyyy"
                                                style={{width : 200 , backgroundColor : "white"}}
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
                        <div style={{width : 320 }} className="input-group mb-3">
                                    <div style = {{height : 40 }} className="input-group-prepend" >
                                        <label   style={{width : 120}} className="input-group-text" >Date fin</label>
                                    </div>
                                    <MuiPickersUtilsProvider locale={fr} utils={DateFnsUtils}>
                                        
                                            <KeyboardDatePicker
                                                size = "small"
                                                autoOk
                                                shouldDisableDate={disableWeekends}
                                                disableToolbar
                                                disablePast
                                                keyboardIcon = {<EventIcon style={{outline : "none" , "&:focus" : {outline : "none"}}}/>}
                                                inputVariant="outlined"
                                                format="d MMM yyyy"
                                                style={{width : 200 , backgroundColor : "white"}}
                                                label="Date fin"
                                                minDate={selectedDateDebut}
                                                minDateMessage ="Date doit etre supérieur au date début"
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

                    <div className="row" style={{paddingTop : "20px" }}>
                        <div className="col-lg-5 col-md-5 offset-lg-1 offset-md-1">
                            <div style={{width : 420 }} className="input-group mb-3">
                                <div style = {{height : 40 }} className="input-group-prepend" >
                                    <label   style={{width : 120 }} className="input-group-text" >Participants</label>
                                </div>
                                <div className="input-group-prepend">
                                    <label style={{fontSize : "14px" , minWidth : 200 , backgroundColor : "white"}}  className="input-group-text" >{props.nbrParticipants}</label>
                                </div>
                            </div>
                            
                        </div>

                        <div className="col-lg-5 col-md-5 ">
                            <div style={{width : 420 }} className="input-group mb-3">
                                <div style = {{height : 40 }} className="input-group-prepend" >
                                    <label   style={{width : 120 }} className="input-group-text" >Durée</label>
                                </div>
                                <TextField type ="number" style={{width : 200 , backgroundColor : "white"}} size="small"  label="Durée" variant="outlined" onChange={onChangeDuree} />                               
                            </div>
                            
                        </div>
                    </div>

                  

                </div>
          </div>
      </div>

      <div hidden = {activeContent === 2 ? false : true} className="row">
          <div className="col-lg-12 col-md-12">
            <div className={classes.rootSession}>
                <div className="row" style={{paddingTop : "20px" }}>
                    <div className="col-lg-4 col-md-4 offset-lg-4 offset-md-4">
                    <Autocomplete
                        size="small"
                        onChange={onSelectFormateurCabinet}
                        options={formateurCabinet}
                        getOptionLabel={(option) => option.title}
                        style={{ width: 300 , backgroundColor : "white" }}
                        renderInput={(params) => <TextField {...params} label="Formateur / Cabinet" variant="outlined" />}
                    />
                    </div>
                </div>

                <div className="row" style={{paddingTop : "20px" }}>
                    <div hidden = {formateur ? true : false} className="col-lg-12 col-md-12">
                        <ComponentListFormateurs  />
                        <Button className={classes.buttonStyles} size="small" variant="outlined" >
                          Ajouter un formateur
                        </Button>      
                    </div>
                    <div hidden = {cabinet ? true : false} className="col-lg-12 col-md-12">
                        <ComponentListCabinets  />   
                        <Button className={classes.buttonStyles} size="small" variant="outlined" >
                          Ajouter une cabinet
                        </Button>    
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
          <div style={{marginTop : "30px"}}>
            <div>
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                className={classes.buttonBack}
              >
                Retour
              </Button>
              <Button 
                disabled=
                        {
                         ( (activeStep===0 && buttonStep1 === 0 ? true : false ) &&
                          (activeStep === 0 && buttonStep11 === 0 ? true : false) ) ||
                          (activeStep===1 && verifierSaisie() === 1 ? true : false)
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
