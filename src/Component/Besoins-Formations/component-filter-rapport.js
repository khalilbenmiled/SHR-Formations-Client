import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import MuiExpansionPanel from '@material-ui/core/ExpansionPanel';
import MuiExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import MuiExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import axios from 'axios';
import querystring from 'querystring'
import { Button } from '@material-ui/core';


const ExpansionPanel = withStyles({
  root: {
    overflowY : "hidden",
    border: '1px solid rgba(0, 0, 0, .125)',
    boxShadow: 'none',
    '&:not(:last-child)': {
      borderBottom: 0,
    },
    '&:before': {
      display: 'none',
    },
    '&$expanded': {
      margin: 'auto',
    },
  },
  expanded: {},
})(MuiExpansionPanel);

const ExpansionPanelSummary = withStyles({
  root: {
    overflowY : "hidden" ,
    backgroundColor: 'rgba(0, 0, 0, .03)',
    borderBottom: '1px solid rgba(0, 0, 0, .125)',
    marginBottom: -1,
    minHeight: 40,
    '&$expanded': {
      minHeight: 40,
      overflowY : "hidden"
    },
  },
  content: {
    '&$expanded': {
      margin: '12px 0',
    },
  },
  expanded: {},
  
})(MuiExpansionPanelSummary);

const ExpansionPanelDetails = withStyles(theme => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiExpansionPanelDetails);

export default function CustomizedExpansionPanels(props) {
 
  const [expanded, setExpanded] = React.useState('');
  const [themeNoms, setThemeNoms] = React.useState(props.themes);
  const [typeSelected, setTypeSelected] = React.useState("");
  const [themeSelected, setThemeSelected] = React.useState("");
  const [quarterSelected, setQuarterSelected] = React.useState(0);
  const [projetSelected, setProjetSelected] = React.useState("");
  const [TlSelected, setTlSelected] = React.useState("");
  const [MgSelected, setMgSelected] = React.useState("");

  const handleChange = panel => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };
  const typeTheme = [
    {title : "TECHNIQUE"},
    {title : "SOFTSKILLS"},
    {title : "SOFTWARE"}
  ]

  const quarter = [
    {title : "Q1"},
    {title : "Q2"},
    {title : "Q3"},
    {title : "Q4"}
  ]

  const TLMG = [
    {title : "Valider"},
    {title : "En attente"}
  ]

  const onTypeSelect = (e,values) => {
    if(values != null){
      setTypeSelected(values.title)
        const typeFormation = {
          type : values.title
        }
        axios.post("http://localhost:8585/themes/type",
        querystring.stringify(typeFormation), {
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        }
        }).then(res => { 
          setThemeNoms(res.data.Theme)
        })
    }else {
      setThemeNoms(props.themes)
    }
  }

  const onThemeSelect = (e,values) => {
    if(values != null){
      setThemeSelected(values.nom)
    }else {
      setThemeSelected("")
    }
  }

  const onQuarterSelect = (e,values) => {
    if(values != null){
      setQuarterSelected(values.title === "Q1" ? "1" : values.title === "Q2" ? "2" : values.title === "Q3" ? "3" : values.title === "Q4" ? "4" : 0);
    }else {
      setQuarterSelected("")
    }
  }

  const onProjetSelect = (e,values) => {
    if(values != null){
      setProjetSelected(values.id)
    }else {
      setProjetSelected("")
    }
  }

  const onTlSelect = (e,values) => {
    if(values != null){
      setTlSelected(values.title === "Valider" ? true : values.title === "En attente" ? false : "");
    }else {
      setTlSelected("")
    }
  }

  const onMgSelect = (e,values) => {
    if(values != null){
      setMgSelected(values.title === "Valider" ? true : values.title === "En attente" ? false : "");
    }else {
      setMgSelected("")
    }
  }

  const filter = () => {
    props.filter(typeSelected,themeSelected,quarterSelected,projetSelected,TlSelected,MgSelected)
    setExpanded(false)
  }
 

  return (
    
    <div style={{width : "90%" , marginLeft : "50px" , overflowX : "hidden" , boxShadow : "0px 0px 20px 0px whitesmoke"}}>
      <ExpansionPanel  square expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <ExpansionPanelSummary style = {{backgroundColor : "rgba(248,178,49,0.8)" , height : "0px"}} aria-controls="panel1d-content" id="panel1d-header"  expandIcon={<ExpandMoreIcon style={{color : "#B51B10"}} />}>
          <Typography style={{color : "#B51B10" , fontWeight : "600" , fontSize:"18px"}}>Filter</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails style={{display : "flex" , flexDirection : "column" ,border : "1px solid #F5F5F5" , borderBottom : "3px solid #F8B231"}}>
          <div className ="row" style={{ marginBottom : "20px"}}>
              <div className="col-lg-4 col-md-4">
                  <Autocomplete
                    onChange = {onTypeSelect}
                    disableCloseOnSelect = {false}
                    size ="small"
                    options = {typeTheme}
                    getOptionLabel={option => option.title}
                    style={{ width: 220 }}
                    renderInput={params => <TextField {...params} label="Type theme" variant="outlined" />}
                  />
              </div>

              <div className="col-lg-4 col-md-4">
                  <Autocomplete
                    onChange = {onThemeSelect}
                    size ="small"
                    options={themeNoms}
                    getOptionLabel={option => option.nom}
                    style={{ width: 220 }}
                    renderInput={params => <TextField {...params} label="Nom theme" variant="outlined" />}
                  />
              </div>
  
              <div className="col-lg-4 col-md-4">
                  <Autocomplete
                    onChange={onQuarterSelect}
                    size ="small"
                    options = {quarter}
                    getOptionLabel={option => option.title}
                    style={{ width: 220 }}
                    renderInput={params => <TextField {...params} label="Quarter" variant="outlined" />}
                  />
              </div>
          </div>
          <div className="row">
            <div className="col-lg-4 col-md-4">
                  <Autocomplete
                    size ="small"
                    onChange={onProjetSelect}
                    options = {props.projets}
                    getOptionLabel={option => option.nom}
                    style={{ width: 220 }}
                    renderInput={params => <TextField {...params} label="Projet" variant="outlined" />}
                  />
            </div>

            <div className="col-lg-4 col-md-4">
                  <Autocomplete
                    size ="small"
                    onChange={onTlSelect}
                    options = {TLMG}
                    getOptionLabel={option => option.title}
                    style={{ width: 220 }}
                    renderInput={params => <TextField {...params} label="Team Lead" variant="outlined" />}
                  />
            </div>

            <div className="col-lg-4 col-md-4">
                  <Autocomplete
                    onChange={onMgSelect}
                    size ="small"
                    options = {TLMG}
                    getOptionLabel={option => option.title}
                    style={{ width: 220 }}
                    renderInput={params => <TextField {...params} label="Manager" variant="outlined" />}
                  />
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12" >
                <Button size="small" style={{ marginTop: "20px" , backgroundColor : "#B51B10" , color: "white" , "&:focus" : {outline : "none" } , width : "200px" }} onClick={filter}>Filter</Button>
            </div>
          </div>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
  );
}
