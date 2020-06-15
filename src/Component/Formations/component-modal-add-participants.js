import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import CancelIcon from '@material-ui/icons/Cancel';
import ComponentListSetParticipants from "./component-list-set-participants"
import { Button } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';

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
    width: 850,
    minHeight : "75vh",
    maxHeight : "80vh",
    boxShadow: theme.shadows[5],

  },
  titre: {
    color: "#3D707E"
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
  },
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
    },
    "&:disabled": {
      backgroundColor: "#E0E0E0",
      color: "#B9A6AB"
    }
  },
}));

export default function TransitionsModal(props) {
  const classes = useStyles();
  const [newParticipants, setNewParticipants] = React.useState([]);


  const handleClose = () => {
    setNewParticipants([])
    props.handleClose()
  }

  const verifLimitParticipant = () => {
    if (props.listParticipants.length + newParticipants.length > props.limiteParticipant) {
     
      return 1
    } else {
      return 0
    }
  }
  const participantsToAdd = (participants) => {
    setNewParticipants(participants)
    props.participantsToAdd(participants)
  }

  const SetParticipants = () => {
    props.SetParticipants()
    props.handleClose()
  }

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={props.open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={props.open}>
          <div className={classes.paper}>


            <div className="col-lg-12 col-md-12 " >

              <div className="row headerModal">
                <div className="col-lg-11 col-md-11">
                  <h4 className="titreAction">Ajouter participants</h4>
                </div>
                <div className="col-lg-1 col-md-1" align="center">
                  <CancelIcon onClick={handleClose} className={classes.cancelcon} />
                </div>
              </div>

              <div className="row">
                <div className="col-lg-12 col-md-12">
                  <Alert hidden = {verifLimitParticipant() === 1 ? false : true} severity="error">vous avez depassé le nombre de participants autorisé !</Alert>
                  <ComponentListSetParticipants users={props.users} participantsToAdd={participantsToAdd} />
                  <Button disabled={verifLimitParticipant() === 1 || newParticipants.length === 0 ? true : false} style={{ marginLeft: "380px", marginBottom: "8px" }} className={classes.button} size="small" variant="outlined" onClick={SetParticipants}>
                    Valider
                  </Button>
                </div>
              </div>
            </div>
          </div>

        </Fade>
      </Modal>
    </div>
  );
}
