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
    padding: theme.spacing(2, 4, 3),
  },
  titre : {
      color : "#3D707E"
  },
  buttonStyles :{
    border : "1px solid #B51B10",
    marginLeft :"152px",
    marginTop : "10px",
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
  const [nom, setNom] = React.useState();
  const [description, setDescription] = React.useState();


  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onChangeNom = (e) => {
    setNom(e.target.value)
  }

  const onChangeDescription = (e) => {
    setDescription(e.target.value)
  }

  const ajouterSession = () => {
    props.ajouterSession(nom,description)
    setOpen(false);
  }

  return (
    <div>
      <Button className={classes.buttonStyles} size="small" variant="outlined"  onClick={handleOpen}>
        Ajouter une session
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
                                <h4 className="titreAction">Ajouter une nouvelle session</h4>
                              
                                <div className="input-group mb-3 ">
                                    <div className="input-group-prepend">
                                        <label style={{width : 173}}  className="input-group-text" >Nom </label>
                                    </div>
                                    <TextField style={{width : 280 }} size="small" id="outlined-basic" label="Nom" variant="outlined" onChange={onChangeNom} />                               
                                </div>

                                <div className="input-group mb-3 ">
                                    <div className="input-group-prepend">
                                        <label style={{width : 173}}  className="input-group-text" >Description </label>
                                    </div>
                                    <TextField multiline rows="4" style={{width : 280 }} size="small" id="outlined-basic" label="Description" variant="outlined" onChange={onChangeDescription}/>                               
                                </div>

                                <div style={{marginLeft: 282,display : "flex" , flexDirection : "row" , justifyContent : "space-between" , width : 170}}>
                                  <Button  size="small" variant="contained" className = {classes.buttonAnnuler} onClick={handleClose}> Annuler</Button>
                                  <Button  size="small" variant="contained" className = {classes.buttonConfirmer} onClick={ajouterSession}> Ajouter</Button>
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
