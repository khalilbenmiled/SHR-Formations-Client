import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import "./besoins.css"
import ComponentListBesoinsPublier from "./component-listBesoins-publier"
import ComponentListModules from "./component-list-modules"
import axios from "axios"
import querystring from 'querystring'
import ComponentListParticipants from "./component-list-participants"
import CancelIcon from '@material-ui/icons/Cancel';


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
    minHeight : '50vh',
    maxHeight : "96vh",
    boxShadow: theme.shadows[5],
  },
  titre : {
      color : "#3D707E",
      marginBottom : "30px"
  },
  cancelcon : {
    width : "30px",
    height : "30px",
    color : "#fff",
    cursor : "pointer",
    marginTop : "15px",
    marginLeft : "16px"
}
}));

export default function TransitionsModal(props) {

  const classes = useStyles();
  const [modules, setModules] = React.useState([]);
  const [modulesHidden, setModulesHidden] = React.useState(true);
  const [users, setUsers] = React.useState([]);
  const [besoinSelected, setBesoinSelected ] = React.useState(0);

  const handleClose = () => {
    props.handleClose();
    setModulesHidden(true)
  };

  const infosBesoinPublier = (row) => {
    setBesoinSelected(row.id)
    setModules(row.theme.listModules)
    setModulesHidden(false)

    const besoin = {
        id : row.id
    }

    axios.post("http://localhost:8686/besoins/listParticipantsBesoins",
    querystring.stringify(besoin), {
    headers: {
        "Content-Type": "application/x-www-form-urlencoded"
    }
    }).then(res => {
        if(res.data.Participants){
            setUsers(res.data.Participants)
        }
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
            
                   
                        <div className="row modalHeader" style={{marginBottom : "40px"}}>
                            <div className="col-lg-11 col-md-11">
                                <h4 className="titreInfos"> {props.besoinPublier.theme} - Trimestre {props.besoinPublier.quarter}</h4>
                            </div>
                            <div className="col-lg-1 col-md-1" align="center">
                            <CancelIcon onClick={handleClose} className={classes.cancelcon}/>
                        </div>
                        </div>

                        <div className="row" style={{marginBottom : "5px"}}>
                            <div className="col-lg-6 col-md-6 offset-lg-3 offset-md-3 ">
                                <ComponentListBesoinsPublier besoinSelected={besoinSelected} listBesoins = {props.besoinPublier.listBesoins} infosBesoinPublier={infosBesoinPublier}/>
                            </div>
                        </div>
                     
                        <div hidden = {modulesHidden} className="row" >
                            
                            <div className="col-lg-12 col-md-12">
                                
                                <div className="row">
                                    <div className="col-lg-6 col-md-6">
                                        <h4  className="titreInfos2">Listes Modules</h4>
                                    </div>
                                    <div className="col-lg-6 col-md-6">
                                        <h4  className="titreInfos2">Participants</h4>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-lg-6 col-md-6">
                                        <ComponentListModules modules={modules} />
                                    </div>
                                    <div className="col-lg-6 col-md-6">
                                        <ComponentListParticipants listParticipants={users}/>
                                    </div>
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





