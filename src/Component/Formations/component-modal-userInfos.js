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
    justifyContent: 'center'
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    "&:focus" : {
        outline : "none"
      },
    borderRadius : "20px",
    width : "90%",
    minHeight : "65vh",
    maxHeight : '90vh',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  title : {
      color : "#3D707E",
      marginBottom : "20px"
  },
  h5Title : {
    color : "#3D707E",
  },
  rootRow : {
    width: '100%',
    boxShadow: "0px 0px 1.5px",
    backgroundColor : "#FAFAFA",
    padding : "10px",
    borderRadius : "10px",
  }
}));



export default function TransitionsModal(props) {
  const classes = useStyles();
  const infos = props.infos

  const handleClose = () => {
    props.handleClose();
  };

  return (
    <div >
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
                <div className="row" style={{marginBottom : "20px"}}>
                    <div className={classes.rootRow}>
                        <div className = "col-lg-12 col-md-12">
                            <div className="row" style={{marginBottom : "10px"}}>
                                <h5 className={classes.h5Title}>Team Lead</h5>
                            </div>
                            <div className="row">
                                <div className="col-lg-4 col-md-4">   
                                    <div className="input-group mb-3 ">
                                        <div className="input-group-prepend">
                                            <label style={{minWidth : 100}} className="input-group-text" >BU</label>
                                        </div>
                                        <div className="input-group-prepend">
                                            <label style={{fontSize : "14px" , minWidth : 200 , backgroundColor : "white"}}  className="input-group-text" >{infos.teamlead.bu}</label>
                                        </div>                             
                                    </div>
                                </div>

                                <div className="col-lg-4 col-md-4">   
                                    <div className="input-group mb-3 ">
                                        <div className="input-group-prepend">
                                            <label style={{ minWidth : 100}}  className="input-group-text" >Nom</label>
                                        </div>
                                        <div className="input-group-prepend">
                                            <label style={{fontSize : "14px" , minWidth : 200 , backgroundColor : "white"}}  className="input-group-text" >{infos.teamlead.nom}</label>
                                        </div>                             
                                    </div>
                                </div>

                                <div className="col-lg-4 col-md-4">   
                                    <div className="input-group mb-3 ">
                                        <div className="input-group-prepend">
                                            <label style={{minWidth : 100}}  className="input-group-text" >Prenom</label>
                                        </div>
                                        <div className="input-group-prepend">
                                            <label style={{fontSize : "14px" , minWidth : 200  , backgroundColor : "white"}}  className="input-group-text" >{infos.teamlead.prenom}</label>
                                        </div>                             
                                    </div>
                                </div>

                            </div>

                            <div className="row">
                                <div className="col-lg-4 col-md-4">   
                                    <div className="input-group mb-3 ">
                                        <div className="input-group-prepend">
                                            <label style={{ minWidth : 100 }}  className="input-group-text" >Email</label>
                                        </div>
                                        <div className="input-group-prepend">
                                            <label style={{fontSize : "14px" , minWidth : 200  , backgroundColor : "white"}}  className="input-group-text" >{infos.teamlead.email}</label>
                                        </div>                             
                                    </div>
                                </div>

                                <div className="col-lg-4 col-md-4">   
                                    <div className="input-group mb-3 ">
                                        <div className="input-group-prepend">
                                            <label style={{minWidth : 100}}  className="input-group-text" >Adresse</label>
                                        </div>
                                        <div className="input-group-prepend">
                                            <label style={{fontSize : "14px" , minWidth : 200 , backgroundColor : "white"}}  className="input-group-text" >{infos.teamlead.adresse}</label>
                                        </div>                             
                                    </div>
                                </div>

                                <div className="col-lg-4 col-md-4">   
                                    <div className="input-group mb-3 ">
                                        <div className="input-group-prepend">
                                            <label style={{ minWidth : 100}}  className="input-group-text" >Tel</label>
                                        </div>
                                        <div className="input-group-prepend">
                                            <label style={{fontSize : "14px" , minWidth : 200  , backgroundColor : "white"}}  className="input-group-text" >{infos.teamlead.tel}</label>
                                        </div>                             
                                    </div>
                                </div>

                            </div>

                        </div>

                    </div>
                </div>
                <div className="row" style={{marginBottom : "20px"}}>
                    <div className={classes.rootRow}>
                        <div className = "col-lg-12 col-md-12">
                            <div className="row" style={{marginBottom : "10px"}}>
                                <h5 className={classes.h5Title}>Manager</h5>
                            </div>
                            <div className="row">
                                <div className="col-lg-4 col-md-4">   
                                    <div className="input-group mb-3 ">
                                        <div className="input-group-prepend">
                                            <label style={{minWidth : 100}} className="input-group-text" >BU</label>
                                        </div>
                                        <div className="input-group-prepend">
                                            <label style={{fontSize : "14px" , minWidth : 200 , backgroundColor : "white"}}  className="input-group-text" >{infos.manager.bu}</label>
                                        </div>                             
                                    </div>
                                </div>

                                <div className="col-lg-4 col-md-4">   
                                    <div className="input-group mb-3 ">
                                        <div className="input-group-prepend">
                                            <label style={{ minWidth : 100}}  className="input-group-text" >Nom</label>
                                        </div>
                                        <div className="input-group-prepend">
                                            <label style={{fontSize : "14px" , minWidth : 200 , backgroundColor : "white"}}  className="input-group-text" >{infos.manager.nom}</label>
                                        </div>                             
                                    </div>
                                </div>

                                <div className="col-lg-4 col-md-4">   
                                    <div className="input-group mb-3 ">
                                        <div className="input-group-prepend">
                                            <label style={{minWidth : 100}}  className="input-group-text" >Prenom</label>
                                        </div>
                                        <div className="input-group-prepend">
                                            <label style={{fontSize : "14px" , minWidth : 200  , backgroundColor : "white"}}  className="input-group-text" >{infos.manager.prenom}</label>
                                        </div>                             
                                    </div>
                                </div>

                            </div>

                            <div className="row">
                                <div className="col-lg-4 col-md-4">   
                                    <div className="input-group mb-3 ">
                                        <div className="input-group-prepend">
                                            <label style={{ minWidth : 100 }}  className="input-group-text" >Email</label>
                                        </div>
                                        <div className="input-group-prepend">
                                            <label style={{fontSize : "14px" , minWidth : 200  , backgroundColor : "white"}}  className="input-group-text" >{infos.manager.email}</label>
                                        </div>                             
                                    </div>
                                </div>

                                <div className="col-lg-4 col-md-4">   
                                    <div className="input-group mb-3 ">
                                        <div className="input-group-prepend">
                                            <label style={{minWidth : 100}}  className="input-group-text" >Adresse</label>
                                        </div>
                                        <div className="input-group-prepend">
                                            <label style={{fontSize : "14px" , minWidth : 200 , backgroundColor : "white"}}  className="input-group-text" >{infos.manager.adresse}</label>
                                        </div>                             
                                    </div>
                                </div>

                                <div className="col-lg-4 col-md-4">   
                                    <div className="input-group mb-3 ">
                                        <div className="input-group-prepend">
                                            <label style={{ minWidth : 100}}  className="input-group-text" >Tel</label>
                                        </div>
                                        <div className="input-group-prepend">
                                            <label style={{fontSize : "14px" , minWidth : 200  , backgroundColor : "white"}}  className="input-group-text" >{infos.manager.tel}</label>
                                        </div>                             
                                    </div>
                                </div>

                            </div>

                        </div>

                    </div>
                </div>
                        
                <div className="row">
                    <div className="col-lg-5 col-md-5 offset-lg-5 offset-md-5">
                        <Button style={{ backgroundColor : "#B51B10" , color : "white" , "&:focus" : {outline : "none"}}} size="small" variant="contained"  onClick={handleClose}> Fermer</Button>
                    </div>
                </div>
                        
            </div>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}





