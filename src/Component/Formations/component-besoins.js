import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ComponentListBesoins from "./component-list-besoins"

const useStyles = makeStyles({
  root: {
    width: '100%',
    boxShadow: "0px 0px 1.5px",
    backgroundColor : "#E9EBEC",
    padding : "10px"
  },
  expansionPanel : {
    width : "99.9%",
    "&:disabled" : {
        backgroundColor : "red"
    }
  },
  expansionPanelSummary :{
    borderBottom : "1px solid #DCDCDC",
    height : "0px"
  },
  formControlLabel : {
      
  }
});

export default function ActionsInExpansionPanelSummary(props) {
  const classes = useStyles();
  const besoins = props.listBesoins
  const [expanded, setExpanded] = React.useState();
  const [disableBesoin, setDisableBesoin] = React.useState(0);
   
    
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const besoinDisabled = id => {
    setDisableBesoin(id)
  }


  
  return (
    <div className={classes.root}>

    {besoins.map( (besoin,index) => {
        return (
            <ExpansionPanel disabled={disableBesoin !== 0 && disableBesoin !== besoin.id ? true : false} key={index} square expanded={expanded === index} onChange={handleChange(index)} className={classes.expansionPanel} size="small">
            <ExpansionPanelSummary
              className={classes.expansionPanelSummary}
              expandIcon={<ExpandMoreIcon />}
              aria-label="Expand"
              aria-controls="additional-actions1-content"
              id="additional-actions1-header"
            >
              <Typography>
                    {besoin.theme + " - Quarter " + besoin.quarter}
              </Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
                <ComponentListBesoins besoins={besoin.listBesoins} besoinDisabled={besoinDisabled} id={besoin.id}/>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        )
    })}



 
    
    </div>
  );
}
