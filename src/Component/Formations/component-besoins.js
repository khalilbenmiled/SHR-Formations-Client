import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ComponentListBesoins from "./component-list-besoins"
import ComponentListParticipantsToSelect from "./component-list-participantsToSelect"

const useStyles = makeStyles({
  root: {
    width: '100%',
    boxShadow: "0px 0px 1.5px",
    backgroundColor: "#E9EBEC",
    padding: "10px"
  },
  expansionPanel: {
    width: "99.9%",
    "&:disabled": {
      backgroundColor: "red"
    }
  },
  expansionPanelSummary: {
    borderBottom: "1px solid #DCDCDC",
    height: "0px"
  },
  formControlLabel: {

  }
});

export default function ActionsInExpansionPanelSummary(props) {
  const classes = useStyles();
  const besoins = props.listBesoins
  const [expanded, setExpanded] = React.useState();
  const [disableBesoin, setDisableBesoin] = React.useState(0);

  const [nbcheck, setnbrCheck] = React.useState(0);
  const [listParticipants, setListParticipants] = React.useState([]);


  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const besoinDisabled = (id, i) => {
    setDisableBesoin(id)
    setnbrCheck(nbcheck + i)
    props.nbrCheck(nbcheck + i)
  }


  const afficherListParticipant = (participants) => {
    setListParticipants(participants)
  }





  return (
    <div className={classes.root}>

      {besoins.map((besoin, index) => {
        return (
          <div key={index}>
            <ExpansionPanel disabled={(disableBesoin !== besoin.id && nbcheck !== 0) ? true : false} key={index} square expanded={expanded === index} onChange={handleChange(index)} className={classes.expansionPanel} size="small">
              <ExpansionPanelSummary
                className={classes.expansionPanelSummary}
                expandIcon={<ExpandMoreIcon />}
                aria-label="Expand"
                aria-controls="additional-actions1-content"
                id="additional-actions1-header"
              >
                <Typography>
                  {besoin.theme + " - Trimester " + besoin.quarter}
                </Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails style={{ width: "100%", display: " flex", flexDirection: "column", borderBottom: "10px solid #DCDCDC" }}>
                <ComponentListBesoins afficherListParticipant={afficherListParticipant} besoinUnselected={props.besoinUnselected} besoinSelected={props.besoinSelected} besoins={besoin.listBesoins} besoinDisabled={besoinDisabled} id={besoin.id} />
                <h5 style={{ marginTop: "10px", marginLeft: "400px", marginBottom: "-10px", color: "#3D707E" }}> Participants </h5>
                <ComponentListParticipantsToSelect participantsSelected={props.participantsSelected} listParticipants={listParticipants} />
              </ExpansionPanelDetails>
            </ExpansionPanel>
          </div>
        )
      })}





    </div>
  );
}
