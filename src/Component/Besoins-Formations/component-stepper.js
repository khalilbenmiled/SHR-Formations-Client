import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ComponentThemes from "./component-themes"
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import ComponentModalModules from "./component-modal-modules"
import ComponentModalProjet from "./component-modal-projet"


const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    border : "none"
  },
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
  actionsContainer: {
    marginTop : "50px",
    marginBottom: theme.spacing(2),
  },
  resetContainer: {
    padding: theme.spacing(3),
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

}));



export default function VerticalLinearStepper(props) {

  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;

  const submitBesoins = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
    props.addBesoin()
  }
  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
    props.stepper()
  };

  const handleReset = () => {
    setActiveStep(0);
  };


  return (
    
    <div className={classes.root}>
      <Stepper activeStep={activeStep} orientation="vertical" >

      <Step key="1"  > 
            <StepLabel StepIconProps={{ classes:{ root: classes.icon, active: classes.activeIcon, completed: classes.completedIcon } }}>
                    Action de formation
            </StepLabel>
            <StepContent>
                <div>
                    <div style={{width : 700}} className="input-group mb-3">
                        <div className="input-group-prepend">
                            <label className="input-group-text" >Action de formation</label>
                        </div>
                        <select className="custom-select" id="inputGroupSelect01" onChange={props.onChangeTheme}>
                            <option  defaultValue value="TOUS">Tous</option>
                            <option value="TECHNIQUE">TECHNIQUE</option>
                            <option value="SOFTWARE">SOFTWARE</option>
                            <option value="SOFTSKILLS">SOFTSKILLS</option>
                        </select>
                    </div>
                    <ComponentThemes 
                        themes={props.themes} 
                        actionSelected={props.actionSelected}
                        addAction = {props.addAction}
                        
                    />

                </div>
    
                <div className={classes.actionsContainer}>
                    <div>
                    <Button
                        size = "small"
                        disabled={activeStep === 0}
                        onClick={handleBack}
                        className={classes.buttonBack}
                    >
                        Back
                    </Button>
                    <Button
                        size = "small"
                        variant="contained"
                     
                        onClick={handleNext}
                        className={classes.button}
                        disabled = {!props.radioSelected}
                    >
                        {activeStep === 3 - 1 ? 'Finish' : 'Next'}
                    </Button>
                    </div>
                </div>
            </StepContent>
          </Step>

          <Step key="2">
            <StepLabel StepIconProps={{ classes:{ root: classes.icon, active: classes.activeIcon, completed: classes.completedIcon } }}>Modules de formations</StepLabel>
            <StepContent>
              
            <Autocomplete
            
                    size="small"
                    multiple
                    id="checkboxes-tags-demo"
                    options={props.modules}
                    onChange={props.getModules}
                    disableCloseOnSelect
                    getOptionLabel={option => option.nom}
                    renderOption={(option, { selected }) => (
                        <React.Fragment >
                        <Checkbox
                            size = "small"
                            icon={icon}
                            checkedIcon={checkedIcon}
                            style={{ marginRight: 8  }}
                            checked={selected}
                           
                           
                        />
                        {option.nom} - {option.description}
                        </React.Fragment>
                    )}
                    style={{ width: 400 }}
                    
                    renderInput={params => (
                    <TextField {...params} variant="outlined" label="Modules" placeholder="Modules" />
                     )}
                  
                   
                />

              <ComponentModalModules addModule={props.addModule} />

              <div className={classes.actionsContainer}>
                <div>
                  <Button
                    size = "small"
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    className={classes.buttonBack}
                  >
                    Back
                  </Button>
                  <Button
                    size = "small"
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                    className={classes.button}
                    disabled = {!props.moduleSelected}
                  >
                    {activeStep === 3 - 1 ? 'Finish' : 'Next'}
                  </Button>
                </div>
              </div>
            </StepContent>
          </Step>

          <Step key="3">
            <StepLabel StepIconProps={{ classes:{ root: classes.icon, active: classes.activeIcon, completed: classes.completedIcon } }}>Informations</StepLabel>
            <StepContent>

            <div hidden = {JSON.parse(localStorage.user).role === "COLLABORATEUR" ? true : false} style={{width : 420 }} className="input-group mb-3">
                        <div style = {{height : 40 }} className="input-group-prepend" >
                            <label   style={{width : 150}} className="input-group-text" >Trimestre</label>
                        </div>
                        <select className="custom-select" id="inputGroupSelect01" onChange={props.onChangeTrimeter}>
                            <option style={{outline : "none"}} defaultValue value="NONE">Choisir...</option>
                            <option value="1">Trimestre 1</option>
                            <option value="2">Trimestre 2</option>
                            <option value="3">Trimestre 3</option>
                            <option value="4">Trimestre 4</option>
                        </select>
              </div>

              <div hidden = {JSON.parse(localStorage.user).role === "COLLABORATEUR" ? true : false} style={{width : 420 }} className="input-group mb-3">
                        <div style = {{height : 40 }} className="input-group-prepend" >
                            <label   style={{width : 150}} className="input-group-text" >Nombre Prévus</label>
                        </div>
                        <TextField defaultValue="0" type ="number" style={{width : 270}} size="small" id="outlined-basic" label="Nombre prévus" variant="outlined" onChange={props.getNbrPrevus} />                               
              </div>
                           
              <div hidden = {JSON.parse(localStorage.user).role === "COLLABORATEUR" ? true : false} style={{width : 420}} className="input-group mb-3">
                        <div className="input-group-prepend">
                            <label style={{width : 150}} className="input-group-text" >Projet</label>
                        </div>
                        <select className="custom-select" id="inputGroupSelect01" onChange={props.getProjet}>
                            <option defaultValue value="-1">Choisir...</option>
                        
                            {props.projets.map(projet => {
                              return(
                                <option key={projet.id} value={JSON.stringify(projet)}>{projet.nom}</option>
                              )
                            })}
                        </select>
                        <ComponentModalProjet addProjet={props.addProjet} />
                </div>
              <div className={classes.actionsContainer}>
                <div>
                  <Button
                    size = "small"
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    className={classes.buttonBack}
                  >
                    Back
                  </Button>
                  <Button
                  
                    size = "small"
                    variant="contained"
                    color="primary"
                    onClick={submitBesoins}
                    className={classes.button}
                  >
                    Ajouter
                  </Button>
                </div>
              </div>
            </StepContent>
          </Step>
      </Stepper>

      {activeStep === 3 && (
        <Paper square elevation={0} className={classes.resetContainer}>
          <Typography>Votre besoin a été saisie avec succès</Typography>
          <Button size = "small" onClick={handleReset} className={classes.button}>
            Reset
          </Button>
        </Paper>
      )}
    </div>
  );
}
