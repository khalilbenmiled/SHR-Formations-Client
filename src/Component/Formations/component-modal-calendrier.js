import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Moment from 'moment';
import 'moment/locale/fr'
import VisibilityIcon from '@material-ui/icons/Visibility';
import axios from "axios"
import querystring from 'querystring'
import ComponentListParticipants from "./component-list-participants"
import CancelIcon from '@material-ui/icons/Cancel';


const useStyles = makeStyles(theme => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor : "white",
    "&:focus" : {
      outline : "none"
    },
    borderRadius : "20px",
    width : 850,
    minHeight : "50vh",
    maxHeight : '90vh',
    boxShadow: theme.shadows[5],

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
  },
  iconInfo : {
    color : "#ED7E0A",
    cursor : "pointer",
    marginLeft : "45px"
  },
  cancelcon : {
    width : "30px",
    height : "30px",
    color : "#fff",
    cursor : "pointer",
    marginTop : "13px"
}
}));

export default function TransitionsModal(props) {
  const classes = useStyles();
  const [openListParticipants, setOpenListParticipants] = React.useState(false);
  const [listParticipants, setListParticipants] = React.useState([]);

  const getDate = (date) => {
    const myDate = new Date(date)
    Moment.locale("fr");
    const dateFormat = Moment(myDate).format("DD-MM-YYYY")
    return dateFormat
  }

  const userInfos = () => {
    setOpenListParticipants(true)
    const input = {
      theme : props.formation.theme.nom,
      quarter : props.session.trimestre
    }
 
    axios.post("http://localhost:8686/besoins/listParticipants",
    querystring.stringify(input), {
    headers: {
        "Content-Type": "application/x-www-form-urlencoded"
    }
    }).then(res => {
  
        setListParticipants(res.data.UsersInfos)
    })
  }

  const handleClose = () => {
    setOpenListParticipants(false)
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
                                        <h4 className="titreAction">Formation {props.formation.theme.nom} </h4>
                                    </div>
                                    <div className="col-lg-1 col-md-1" align="center">
                                        <CancelIcon onClick={handleClose} className={classes.cancelcon}/>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-lg-6">
                                        <div className="input-group mb-3 ">
                                            <div className="input-group-prepend">
                                                <label style={{width : 120}}  className="input-group-text" >Session </label>
                                            </div>
                                            <label style={{width : 200, backgroundColor : "white" }}  className="input-group-text"  > {props.session.nom}</label>                               
                                        </div>
                                    </div>

                                    <div className="col-lg-6">
                                        <div className="input-group mb-3 ">
                                            <div className="input-group-prepend">
                                                <label style={{width : 120}}  className="input-group-text" >Trimestre </label>
                                            </div>
                                            <label style={{width : 200, backgroundColor : "white" }}  className="input-group-text"  >{props.session.trimestre}</label>                               
                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-lg-6">
                                        <div className="input-group mb-3 ">
                                            <div className="input-group-prepend">
                                                <label style={{width : 120}}  className="input-group-text" >Date Debut </label>
                                            </div>
                                            <label style={{width : 200, backgroundColor : "white" }}  className="input-group-text"  > {getDate(props.formation.dateDebut)}</label>                               
                                        </div>
                                    </div>

                                    <div className="col-lg-6">
                                        <div className="input-group mb-3 ">
                                            <div className="input-group-prepend">
                                                <label style={{width : 120}}  className="input-group-text" >Date Fin </label>
                                            </div>
                                            <label style={{width : 200, backgroundColor : "white" }}  className="input-group-text"  > {getDate(props.formation.dateFin)}</label>                               
                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-lg-6">
                                        <div className="input-group mb-3 ">
                                            <div className="input-group-prepend">
                                                <label style={{width : 120}}  className="input-group-text" >Durée </label>
                                            </div>
                                            <label style={{width : 200, backgroundColor : "white" }}  className="input-group-text"  >{props.formation.duree} H</label>                               
                                        </div>
                                    </div>

                                    <div className="col-lg-6">
                                        <div className="input-group mb-3 ">
                                            <div className="input-group-prepend">
                                                <label style={{width : 120}}  className="input-group-text" >Participants </label>
                                            </div>
                                            <label style={{width : 200, backgroundColor : "white" }}  className="input-group-text"  >
                                              {props.formation.maxParticipants} participants <VisibilityIcon className={classes.iconInfo} onClick={userInfos} /> 
                                            </label>                               
                                        </div>
                                    </div>
                                </div>
                                <div hidden = {openListParticipants ? false : true}>
                                  <ComponentListParticipants listParticipants={listParticipants}/>
                                </div>
                            </div>
                        </div>
       
        </Fade>
      </Modal>
    </div>
  );
}
