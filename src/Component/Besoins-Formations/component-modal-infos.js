import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { Card, CardContent } from '@material-ui/core';
import ComponentListModules from "./component-list-modules"
import "./besoins.css"
import avatar1 from "../../images/avatar1.png"
import CancelIcon from '@material-ui/icons/Cancel';

const useStyles = makeStyles(theme => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    "&:focus": {
      outline: "none"
    },
    borderRadius: "20px",
    width: 800,
    height: '80vh',
    boxShadow: theme.shadows[5],

  },
  titre: {
    color: "#3D707E"
  },
  cancelcon: {
    width: "30px",
    height: "30px",
    color: "#fff",
    cursor: "pointer",
    marginTop: "13px"
  }
}));

export default function TransitionsModal(props) {
  const classes = useStyles();

  const handleClose = () => {
    props.handleClose();
  };

  function showMessage() {

    if (JSON.parse(localStorage.user).role === "COLLABORATEUR") {
      return props.besoinToModal.validerTL ? 1 : 0
    } else if (JSON.parse(localStorage.user).role === "TEAMLEAD") {
      return props.besoinToModal.validerMG ? 11 : -1
    }
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

              <div className="row modalHeader" style={{ marginBottom: "20px" }}>
                <div className="col-lg-11 col-md-11">
                  <h4 className="titreInfos">Détails besoins</h4>
                </div>
                <div className="col-lg-1 col-md-1" align="center">
                  <CancelIcon onClick={handleClose} className={classes.cancelcon} />
                </div>
              </div>
              <div className="row" style={{ marginBottom: "30px" }}>
                <div className="col-lg-12 col-md-12">
                  <Card style={{ border: "2px solid #B51B10", boxShadow: "0px 0px 3px 0px #B51B10", paddingTop: 15 }}>
                    <CardContent>
                      <div className="row">
                        <div className="col-lg-2 col-md-2" >
                          <img className="avatar1" src={avatar1} alt="avatar1" />
                        </div>
                        <div className="col-lg-5 col-md-5">
                          <label style={{ fontWeight: "bold" }}>Bu : </label> <label>{props.besoinToModal.bu}</label> <br />
                          <label style={{ fontWeight: "bold" }}>Nom : </label> <label>{props.besoinToModal.nom}</label> <br />
                          <label style={{ fontWeight: "bold" }}>Prenom : </label> <label>{props.besoinToModal.prenom}</label> <br />
                          <label style={{ fontWeight: "bold" }}>Email : </label> <label>{props.besoinToModal.email}</label>
                        </div>
                        <div className="col-lg-5 col-md-5">
                          <label style={{ fontWeight: "bold" }}>Action : </label> <label>{props.besoinToModal.action}</label> <br />
                          <label style={{ fontWeight: "bold" }}>Type : </label> <label>{props.besoinToModal.type}</label> <br />
                          <label style={{ fontWeight: "bold" }}>Trimestre : </label> <label>{props.besoinToModal.validerTL ? props.besoinToModal.trimestre : "En attente"}</label> <br />
                          <label style={{ fontWeight: "bold" }}>Projet : </label> <label>{props.besoinToModal.validerTL ? props.besoinToModal.projet : "En attente"}</label>
                        </div>

                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              <div className="row" >
                <div className="col-lg-11 col-md-11" style={{ marginLeft: 30 }}>
                  <ComponentListModules modules={props.modulesToModal} />
                </div>
              </div>

              <div className="row modalFooter" style={{ backgroundColor: showMessage() === 1 || showMessage() === 11 ? "#52A32D" : showMessage() === 0 || showMessage() === -1 ? "#E67A0A" : "" }}>
                <div className="col-lg-12 col-md-12" align="center">
                  {
                    showMessage() === 1 ? "Besoin validé par votre supérieur" :
                      showMessage() === 0 ? "Besoin doit etre validé par votre supérieur" :
                        showMessage() === 11 ? "Besoin validé par votre manager" :
                          showMessage() === -1 ? "Besoin doit etre validé par votre manager" :
                            ""
                  }
                </div>
              </div>
            </div>

          </div>
        </Fade>
      </Modal>
    </div>
  );
}





