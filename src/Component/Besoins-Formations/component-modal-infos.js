import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { Button } from '@material-ui/core';
import ComponentListModules from "./component-list-modules"
import "./besoins.css"
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
    width : 800,
    height : '90vh',
    boxShadow: theme.shadows[5],

  },
  titre : {
      color : "#3D707E"
  }
}));

export default function TransitionsModal(props) {
  const classes = useStyles();
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
            
                        <div className="row modalHeader">
                            <div className="col-lg-12 col-md-12">
                                <h4 className="titreInfos">Détails besoins</h4>
                            </div>
                        </div>
                        <div className="row" style={{marginTop : "-50px"}}>
                            <div className="col-lg-6 col-md-6">
                                

                                <div className="input-group mb-3 ">
                                    <div className="input-group-prepend">
                                        <label style={{  width : 100}}  className="input-group-text" >Nom</label>
                                    </div>
                                    <div className="input-group-prepend">
                                        <label style={{fontSize : "14px" , width : 220 , backgroundColor : "transparent"}}  className="input-group-text" >{props.besoinToModal.nom}</label>
                                    </div>                             
                                </div>

                                <div className="input-group mb-3 ">
                                    <div className="input-group-prepend">
                                        <label style={{width : 100}}  className="input-group-text" >Prenom</label>
                                    </div>
                                    <div className="input-group-prepend">
                                        <label style={{fontSize : "14px" , width : 220 , backgroundColor : "transparent"}}  className="input-group-text" >{props.besoinToModal.prenom}</label>
                                    </div>                               
                                </div>

                                <div className="input-group mb-3 ">
                                    <div className="input-group-prepend">
                                        <label style={{width : 100}}  className="input-group-text" >Email</label>
                                    </div>
                                    <div className="input-group-prepend">
                                        <label style={{ fontSize : "14px" , width : 220 , backgroundColor : "transparent"}}  className="input-group-text" >{props.besoinToModal.email}</label>
                                    </div>                             
                                </div>

                                <div className="input-group mb-3 ">
                                    <div className="input-group-prepend">
                                        <label style={{width : 100}}  className="input-group-text" >BU</label>
                                    </div>
                                    <div className="input-group-prepend">
                                        <label style={{fontSize : "14px" , width : 220 , backgroundColor : "transparent"}}  className="input-group-text" >{props.besoinToModal.bu}</label>
                                    </div>                              
                                </div>
                             
                            </div>
                            <div className= "col-lg-6 col-md-6">
                                
                                <div className="input-group mb-3 ">
                                    <div className="input-group-prepend">
                                        <label style={{width : 100}}  className="input-group-text" >Trimestre</label>
                                    </div>
                                    <div className="input-group-prepend">
                                        <label style={{fontSize : "14px" , width : 220 , backgroundColor : "transparent"}}  className="input-group-text" >{props.besoinToModal.trimestre}</label>
                                    </div>                              
                                </div>

                                <div className="input-group mb-3 ">
                                    <div className="input-group-prepend">
                                        <label style={{width : 100}}  className="input-group-text" >Action</label>
                                    </div>
                                    <div className="input-group-prepend">
                                        <label style={{fontSize : "14px" , width : 220 , backgroundColor : "transparent"}}  className="input-group-text" >{props.besoinToModal.action}</label>
                                    </div>                              
                                </div>

                                <div className="input-group mb-3 ">
                                    <div className="input-group-prepend">
                                        <label style={{width : 100}}  className="input-group-text" >Type</label>
                                    </div>
                                    <div className="input-group-prepend">
                                        <label style={{fontSize : "14px" , width : 220 , backgroundColor : "transparent"}}  className="input-group-text" >{props.besoinToModal.type}</label>
                                    </div>                               
                                </div>

                                <div className="input-group mb-3 ">
                                    <div className="input-group-prepend">
                                        <label style={{width : 100}}  className="input-group-text" >Projet</label>
                                    </div>
                                    <div className="input-group-prepend">
                                        <label style={{fontSize : "14px" , width : 220 , backgroundColor : "transparent"}}  className="input-group-text" >{props.besoinToModal.projet}</label>
                                    </div>                               
                                </div>
                                

                            </div>
                        </div>
                        <div className = "row">
                            <div className="col-lg-11 col-md-11" style={{marginLeft : 15}}>
                                <ComponentListModules modules = {props.modulesToModal} />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-12 col-md-12">
                                <Button style={{marginLeft : 300 , marginTop : 10 , marginBottom : 10 , backgroundColor : "#B51B10" , color : "white" , "&:focus" : {outline : "none"}}} size="small" variant="contained"  onClick={handleClose}> Fermer</Button>
                            </div>
                        </div>
                    </div>

          </div>
        </Fade>
      </Modal>
    </div>
  );
}





