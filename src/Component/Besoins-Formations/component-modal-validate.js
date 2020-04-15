import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { Button } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    "&:focus" : {
      outline : "none"
    },
    borderRadius : "20px",
    width : 600,
    height : '40vh',
    boxShadow: theme.shadows[5],
  },
  titre : {
      color : "#3D707E"
  },
  buttonAnnuler : {
    backgroundColor : "#E67A0A",
    color : "white",
    "&:focus" : {
      outline : "none"
    },
    "&:hover" : {
      backgroundColor : "#E67A0A",
      color : "white"
    }
  },
  buttonConfirmer : {
    backgroundColor : "#B51B10",
    color : "white",
    "&:focus" : {
      outline : "none"
    },
    "&:hover" : {
      backgroundColor : "#B51B10",
      color : "white"
    }
  }
}));

export default function TransitionsModal(props) {
  const classes = useStyles();
  const [projet, setProjet] = React.useState("");
  const [trimstre, setTrimestre] = React.useState("");
  const handleClose = () => {
    props.handleClose();
  };
 const onChangeProjet = (e) => {
     props.onChangeProjet(JSON.parse(e.target.value).id)
     setProjet(e.target.value)
 }
 const onChangeTrimestre = (e) => {
     props.onChangeTrimestre(e.target.value)
     setTrimestre(e.target.value)
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
                        <div className="row ">
                            <div className="col-lg-12 col-md-12">
                              <div className="row modalHeader" style={{marginBottom : "50px"}}>
                                  <div className="col-lg-12 col-md-12">
                                    <h4 className="titreInfos">Valider besoin</h4>
                                  </div>
                                </div>

                                <div className="input-group mb-3 ">
                                    <div className="input-group-prepend">
                                        <label style={{width : 100}}  className="input-group-text" >Projet</label>
                                    </div>
                                    <select style={{width : 180}} className="custom-select"  onChange={onChangeProjet}>
                                        <option defaultValue value="0">Choisir...</option>
                                    
                                        {props.projets.map(projet => {
                                        return(
                                            <option key={projet.id} value={JSON.stringify(projet)}>{projet.nom}</option>
                                        )
                                        })}
                                </select>                         
                                </div>
                                <div className="input-group mb-3 ">
                                        <div  className="input-group-prepend" >
                                            <label style={{width : 100}} className="input-group-text" >Trimestre</label>
                                        </div>
                                        <select style={{width : 180 }} className="custom-select" onChange={onChangeTrimestre} >
                                            <option defaultValue value="NONE">Choisir...</option>
                                            <option value="1">Trimestre 1</option>
                                            <option value="2">Trimestre 2</option>
                                            <option value="3">Trimestre 3</option>
                                            <option value="4">Trimestre 4</option>
                                        </select>
                                </div>
                                <div style={{marginLeft: 396,display : "flex" , flexDirection : "row" , justifyContent : "space-between" , width : 170}}>
                                  <Button  size="small" variant="contained" className = {classes.buttonAnnuler} onClick={handleClose}> Annuler</Button>
                                  <Button disabled={projet === "" || trimstre === "" || projet === "0" || trimstre === "NONE" ? true : false} size="small" variant="contained" className = {classes.buttonConfirmer} onClick={props.onValiderBesoin}> Valider</Button>
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
