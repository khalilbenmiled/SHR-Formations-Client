import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { Button, TextField } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    "&:focus": {
      outline: "none"
    },
    borderRadius: "20px",
    width: 600,
    height: '50vh',
    boxShadow: theme.shadows[5],

  },
  titre: {
    color: "#3D707E"
  },
  buttonStyles: {
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
  }
}));

export default function TransitionsModal(props) {
  const classes = useStyles();
  const [nom, setNom] = React.useState("");
  const [description, setDescription] = React.useState("");

  const handleSubmit = () => {

    props.handleClose()
    const module = {
      nom: nom,
      description: description
    }
    props.addModule(module)
    setNom("")
    setDescription("")

  }
  const moduleNom = (e) => {
    setNom(e.target.value)
  }

  const moduleDescription = (e) => {
    setDescription(e.target.value)
  }


  const verifierSaisie = () => {
    if (nom === "" || description === "") {
      return 0
    } else {
      return 1
    }
  }

  return (
    <div>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={props.open}
        onClose={props.handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={props.open}>
          <div className={classes.paper}>


            <div className="col-lg-12 col-md-12 " >
              <div className="row ">
                <div className="col-lg-12 col-md-12">
                  <div className="row modalHeader" style={{ marginBottom: "50px" }}>
                    <div className="col-lg-12 col-md-12">
                      <h4 className="titreInfos">Ajouter un module</h4>
                    </div>

                  </div>


                  <div className="input-group mb-3 " style={{ marginLeft: "40px" }}>
                    <div className="input-group-prepend">
                      <label style={{ width: 173 }} className="input-group-text" >Nom </label>
                    </div>
                    <TextField style={{ width: 280 }} size="small" id="outlined-basic" label="Nom" variant="outlined" onChange={moduleNom} />
                  </div>
                  <div className="input-group mb-3 " style={{ marginLeft: "40px" }}>
                    <div className="input-group-prepend">
                      <label style={{ width: 173 }} className="input-group-text" >Description</label>
                    </div>
                    <TextField
                      size="small"
                      style={{ width: 280 }}
                      id="outlined-multiline-static"
                      label="Description"
                      multiline
                      rows="4"
                      variant="outlined"
                      onChange={moduleDescription}
                    />
                  </div>
                  <div style={{ marginLeft: 322, display: "flex", flexDirection: "row", justifyContent: "space-between", width: 170 }}>
                    <Button size="small" variant="contained" className={classes.buttonAnnuler} onClick={props.handleClose}> Annuler</Button>
                    <Button disabled={verifierSaisie() === 0 ? true : false} size="small" variant="contained" className={classes.buttonConfirmer} onClick={handleSubmit}> Ajouter</Button>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </Fade>
      </Modal>
    </div>
  );
}
