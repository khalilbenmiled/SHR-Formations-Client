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
    justifyContent: 'center'
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    "&:focus" : {
      outline : "none"
    },
    borderRadius : "20px",
    width : 600,
    height : '45vh',
    boxShadow: theme.shadows[5],
  },
  titre : {
      color : "#3D707E"
  },
  buttonStyles :{
    color : "#B51B10",
    "&:focus" : {
        outline : "none"
    }
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
  const [open, setOpen] = React.useState(false);
  const [nom , setNom] = React.useState("");
  const [type , setType] = React.useState("");

  const handleSubmit = () => {
  
      setOpen(false);
      const theme = {
        nom : nom,
        type : type
      }
      props.addAction(theme)

  }
  const actionName = (e) => {
    setNom(e.target.value)
  }
  const actionType = (e) => {
    setType(e.target.value)
  }
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div >
      <Button hidden = {JSON.parse(localStorage.user).role === "COLLABORATEUR" ? true : false} size="small" variant="outlined" color="secondary" className={classes.buttonStyles} onClick={handleOpen}>
        Ajouter une action de formations
      </Button>
      <Modal 
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
                       
            <div className="col-lg-12 col-md-12 " >
                 
                                <div className="row modalHeader" style={{marginBottom : "50px"}}>
                                  <div className="col-lg-12 col-md-12">
                                    <h4 className="titreInfos">Ajouter une action de formation</h4>
                                  </div>
                                </div>
                                

                                <div className="row">
                                  <div className="col-lg-12 col-md-12">
                                    <div className="input-group mb-3 ">
                                      <div className="input-group-prepend">
                                          <label className="input-group-text" >Action de formation</label>
                                      </div>
                                      <select className="custom-select" id="inputGroupSelect01" onChange={actionType}>
                                          <option defaultValue value="NONE">Choisir...</option>
                                          <option value="TECHNIQUE">TECHNIQUE</option>
                                          <option value="SOFTWARE">SOFTWARE</option>
                                          <option value="SOFTSKILLS">SOFTSKILLS</option>
                                      </select>
                                    
                                    </div>
                                  </div>
                                </div>

                                <div className="row">
                                  <div className="col-lg-12 col-md-12">
                                    <div className="input-group mb-3 ">
                                      <div className="input-group-prepend">
                                          <label style={{width : 173}}  className="input-group-text" >Nom du formation</label>
                                      </div>
                                      <TextField  style={{width : 396 }}  size="small" id="outlined-basic" label="Nom" variant="outlined" onChange={actionName}/>                               
                                    </div>
                                  </div>
                                </div>

                                <div className="row" style={{marginTop : "25px" , float : "right"}}>
                                
                                    <Button style={{ marginRight : "5px"}} size="small" variant="contained" className = {classes.buttonAnnuler} onClick={handleClose}> Annuler</Button>
                                    <Button style= {{marginRight : "20px"}} disabled={nom === "" || type === "" || type === "NONE" ? true : false}  size="small" variant="contained" className = {classes.buttonConfirmer} onClick={handleSubmit}> Ajouter</Button>

                                </div>                             
                            </div>
               

          </div>
        </Fade>
      </Modal>
    </div>
  );
}





