import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { Button } from '@material-ui/core';
import "./besoins.css"
import ComponentListBesoinsPublier from "./component-listBesoins-publier"
import ComponentListModules from "./component-list-modules"
import axios from "axios"
import querystring from 'querystring'

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
    width : "80%",
    minHeight : '50vh',
    maxHeight : "96vh",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  titre : {
      color : "#3D707E",
      marginBottom : "30px"
  }
}));

export default function TransitionsModal(props) {

  const classes = useStyles();
  const [modules, setModules] = React.useState([]);
  const [modulesHidden, setModulesHidden] = React.useState(true);
  const [user, setUser] = React.useState({});

  const handleClose = () => {
    props.handleClose();
    setModulesHidden(true)
  };

  const infosBesoinPublier = (row) => {
    console.log(row)
    setModules(row.theme.listModules)
    setModulesHidden(false)

    const user = {
        id : row.idUser
    }
    axios.post("http://localhost:8181/users/byId",
    querystring.stringify(user), {
    headers: {
        "Content-Type": "application/x-www-form-urlencoded"
    }
    }).then(res => {
        setUser(res.data.User)
    })

  }

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
            <h4 className={classes.titre}>Détails besoins</h4>
                   
                        <div className="row">
                            <div className="col-lg-6 col-md-6">
                                <ComponentListBesoinsPublier listBesoins = {props.besoinPublier.listBesoins} infosBesoinPublier={infosBesoinPublier}/>
                            </div>
                            <div className="col-lg-6 col-md-6" >
                                <div  className="input-group mb-3 ">
                                    <div className="input-group-prepend">
                                        <label style={{width : 100}}  className="input-group-text" >Action</label>
                                    </div>
                                    <div className="input-group-prepend">
                                        <label style={{fontSize : "14px" , width : 220 , backgroundColor : "transparent"}}  className="input-group-text" > {props.besoinPublier.theme}</label>
                                    </div>                              
                                </div>
                                <div  className="input-group mb-3 ">
                                    <div className="input-group-prepend">
                                        <label style={{width : 100}}  className="input-group-text" >Quarter</label>
                                    </div>
                                    <div className="input-group-prepend">
                                        <label style={{fontSize : "14px" , width : 220 , backgroundColor : "transparent"}}  className="input-group-text" >Trimestre {props.besoinPublier.quarter}</label>
                                    </div>                              
                                </div>
                                <div  className="input-group mb-3 ">
                                    <div className="input-group-prepend">
                                        <label style={{width : 130}}  className="input-group-text" >Nombre Prévus</label>
                                    </div>
                                    <div className="input-group-prepend">
                                        <label style={{fontSize : "14px" , width : 191 , backgroundColor : "transparent"}}  className="input-group-text" > {props.nbrPrevus} Besoins</label>
                                    </div>                              
                                </div>
                            </div>
                        </div>
                        <h4  hidden = {modulesHidden} style={{color : "#3D707E" , marginTop :"15px" }}>Listes Modules</h4>
                        <div hidden = {modulesHidden} className="row" style={{marginTop : "15px"}}>
                            <div className="col-lg-6 col-md-6">
                                <ComponentListModules modules={modules} />
                            </div>
                            <div className="col-lg-6 col-md-6">
                                <div  className="input-group mb-3 ">
                                    <div className="input-group-prepend">
                                        <label style={{width : 80}}  className="input-group-text" >Nom</label>
                                    </div>
                                    <div className="input-group-prepend">
                                        <label style={{fontSize : "14px" , width : 220 , backgroundColor : "transparent"}}  className="input-group-text" > {user.nom}</label>
                                    </div>                              
                                </div>
                                <div  className="input-group mb-3 ">
                                    <div className="input-group-prepend">
                                        <label style={{width : 80}}  className="input-group-text" >Prenom</label>
                                    </div>
                                    <div className="input-group-prepend">
                                        <label style={{fontSize : "14px" , width : 220 , backgroundColor : "transparent"}}  className="input-group-text" > {user.prenom}</label>
                                    </div>                              
                                </div>
                                <div  className="input-group mb-3 ">
                                    <div className="input-group-prepend">
                                        <label style={{width : 80}}  className="input-group-text" >BU</label>
                                    </div>
                                    <div className="input-group-prepend">
                                        <label style={{fontSize : "14px" , width : 220 , backgroundColor : "transparent"}}  className="input-group-text" > {user.bu}</label>
                                    </div>                              
                                </div>
                                <div  className="input-group mb-3 ">
                                    <div className="input-group-prepend">
                                        <label style={{width : 80}}  className="input-group-text" >Email</label>
                                    </div>
                                    <div className="input-group-prepend">
                                        <label style={{fontSize : "14px" , width : 220 , backgroundColor : "transparent"}}  className="input-group-text" > {user.email}</label>
                                    </div>                              
                                </div>
                            </div>
                        </div>
                    
         
                        <div className="row">
                            <div className="col-lg-12 col-md-12">
                                <Button style={{marginLeft : 460 , marginTop : 20 , marginBottom : 10 , backgroundColor : "#B51B10" , color : "white" , "&:focus" : {outline : "none"}}} size="small" variant="contained"  onClick={handleClose}> Fermer</Button>
                            </div>
                            
                        </div>
                    </div>

          </div>
        </Fade>
      </Modal>
    </div>
  );
}





