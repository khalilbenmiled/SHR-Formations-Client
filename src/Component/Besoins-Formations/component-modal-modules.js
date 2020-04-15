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
    "&:focus" : {
      outline : "none"
    },
    borderRadius : "20px",
    width : 600,
    height : '50vh',
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
  const [nom, setNom] = React.useState("");
  const [description, setDescription] = React.useState("");

  const handleSubmit = () => {
  
      setOpen(false);
      const module = {
        nom : nom,
        description : description
      }
      props.addModule(module)
    
  }
  const moduleNom = (e) => {
    setNom(e.target.value)
  }

  const moduleDescription = (e) => {
    setDescription(e.target.value)
  }

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button hidden = {JSON.parse(localStorage.user).role === "COLLABORATEUR" ? true : false} style={{margin :"10px 0px" , marginLeft : 240}} color="secondary" className={classes.buttonStyles} size="small" variant="outlined"  onClick={handleOpen}>
        Ajouter un module
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
                        <div className="row ">
                            <div className="col-lg-12 col-md-12">
                                <div className="row modalHeader" style={{marginBottom : "50px"}}>
                                  <div className="col-lg-12 col-md-12">
                                    <h4 className="titreInfos">Ajouter un module</h4>
                                  </div>
                                  
                                </div>
                                
                
                                <div className="input-group mb-3 " style={{marginLeft : "40px"}}>
                                    <div className="input-group-prepend">
                                        <label style={{width : 173}}  className="input-group-text" >Nom </label>
                                    </div>
                                    <TextField style={{width : 280 }} size="small" id="outlined-basic" label="Nom" variant="outlined" onChange={moduleNom}/>                               
                                </div>
                                <div className="input-group mb-3 "  style={{marginLeft : "40px"}}>
                                    <div className="input-group-prepend">
                                        <label style={{width : 173}}  className="input-group-text" >Description</label>
                                    </div>
                                    <TextField
                                        size = "small"
                                        style = {{width : 280}}
                                        id="outlined-multiline-static"
                                        label="Description"
                                        multiline
                                        rows="4"
                                        variant="outlined"
                                        onChange = {moduleDescription}
                                    />
                                </div>
                                <div style={{marginLeft: 322,display : "flex" , flexDirection : "row" , justifyContent : "space-between" , width : 170}}>
                                    <Button  size="small" variant="contained" className = {classes.buttonAnnuler}  onClick={handleClose}> Annuler</Button>
                                    <Button disabled={nom === "" || description === "" ? true : false} size="small" variant="contained" className = {classes.buttonConfirmer} onClick={handleSubmit}> Ajouter</Button>
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
