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
import Moment from "moment"

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
  }
}));

function getSteps() {
  return ['Besoins','Session de formation', 'Cabinet / Formateur'];
}

export default function HorizontalLabelPositionBelowStepper(props) {

  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const [activeContent, setActiveContent] = React.useState(0);
  const top100Films = []

  const steps = getSteps();

  const [selectedDateDebut, setSelectedDateDebut] = React.useState(new Date());
  const [selectedDateFin, setSelectedDateFin] = React.useState(new Date());

  const handleDateDebutChange = (date) => {
    Moment.locale('fr');
      console.log(Moment(date).format("l"))
    setSelectedDateDebut(date);
  };

  const handleDateFinChange = (date) => {
    setSelectedDateFin(date);
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setActiveContent((prevActiveStep) => prevActiveStep + 1)
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    setActiveContent((prevActiveStep) => prevActiveStep - 1)
  };

  const handleReset = () => {
    setActiveStep(0);
    setActiveContent(0)
  };

  function disableWeekends(date) {
    return date.getDay() === 0
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
              <ComponentBesoins listBesoins = {props.listBesoins} />
          </div>
      </div>

      <div hidden = {activeContent === 1 ? false : true} className="row">
          <div className="col-lg-12 col-md-12">
                <div className={classes.rootSession}>
                    <div className="row" style={{paddingTop : "20px" }}>
                        <div className="col-lg-5 col-md-5 offset-lg-1 offset-md-1">
                            <div style={{width : 420 }} className="input-group mb-3">
                                <div style = {{height : 40 }} className="input-group-prepend" >
                                    <label   style={{width : 120}} className="input-group-text" >Quarter</label>
                                </div>
                                <Autocomplete
                                    size="small"
                                    options={top100Films}
                                    getOptionLabel={option => option.title}
                                    style={{ width: 200 , backgroundColor : "white"}}
                                    renderInput={params => <TextField {...params} label="Quarter" variant="outlined" />}
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
                                    options={top100Films}
                                    getOptionLabel={option => option.title}
                                    style={{ width: 200 , backgroundColor : "white" }}
                                    renderInput={params => <TextField {...params} label="Session" variant="outlined" />}
                                />
                                <ComponentModalSession />
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
                                <TextField type ="number" style={{width : 200 , backgroundColor : "white"}} size="small"  label="Nombres participants" variant="outlined" />                               
                            </div>
                            
                        </div>

                        <div className="col-lg-5 col-md-5 ">
                            <div style={{width : 420 }} className="input-group mb-3">
                                <div style = {{height : 40 }} className="input-group-prepend" >
                                    <label   style={{width : 120 }} className="input-group-text" >Durée</label>
                                </div>
                                <TextField type ="number" style={{width : 200 , backgroundColor : "white"}} size="small"  label="Durée" variant="outlined" />                               
                            </div>
                            
                        </div>
                    </div>

                  

                </div>
          </div>
      </div>

      <div hidden = {activeContent === 2 ? false : true} className="row">
          <div className="col-lg-12 col-md-12">
              text 3
          </div>
      </div>


      <div>
        {activeStep === steps.length ? (
          <div>
            <Typography className={classes.instructions}>All steps completed</Typography>
            <Button onClick={handleReset}>Reset</Button>
          </div>
        ) : (
          <div style={{marginTop : "30px"}}>
            <div>
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                className={classes.buttonBack}
              >
                Back
              </Button>
              <Button variant="contained" color="primary" onClick={handleNext} className={classes.button} > 
                {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
