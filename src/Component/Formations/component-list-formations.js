import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import { TableHead, Button, Snackbar, Dialog, DialogTitle, DialogContentText, DialogContent, DialogActions } from '@material-ui/core';
import VisibilityIcon from '@material-ui/icons/Visibility';
import ComponentModalFormation from "./component-modal-formation"
import axios from "axios"
import querystring from 'querystring'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import ComponentModalAddFormation from "./component-modal-add-formation"
import Alert from '@material-ui/lab/Alert';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import ComponentModalAddParticipants from "./component-modal-add-participants"

const useStyles1 = makeStyles(theme => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
  },
  iconCheck: {
    color: "#027796",
    cursor: "pointer"
  },
  iconRemove: {
    color: "#D70220",
    cursor: "pointer",
    marginBottom: "7px",
  },
  iconInfo: {
    color: "#ED7E0A",
    cursor: "pointer"
  },
  iconAnnuler: {
    cursor: "pointer",
    color: "#B51B10",
  },
  checkBox: {
    cursor: "pointer",
    width: "17px",
    height: "17px",

  },
  user: {
    marginBottom: "7px",
    width: "30px",
    height: "30px",
    cursor: "pointer",
    color: "#ED7E0A"
  },
  buttonStyles: {
    color: "#B51B10",
    "&:focus": {
      outline: "none"
    }
  },
}));




function TablePaginationActions(props) {
  const classes = useStyles1();
  const theme = useTheme();
  const { count, page, rowsPerPage, onChangePage } = props;

  const handleBackButtonClick = event => {
    onChangePage(event, page - 1);
  };

  const handleNextButtonClick = event => {
    onChangePage(event, page + 1);
  };

  return (
    <div className={classes.root}>

      <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>

    </div>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};


export default function CustomPaginationActionsTable(props) {

  const [rows, setRows] = React.useState(props.formations);
  const classes = useStyles1();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(4);
  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);
  const [open, setOpen] = React.useState(false);
  const [openAddFormation, setOpenAddFormation] = React.useState(false);
  const [formation, setFormation] = React.useState([]);
  const [participants, setParticipants] = React.useState([]);
  const [participantsS, setParticipantsSelected] = React.useState([]);
  const [themes, setThemes] = React.useState([]);
  const [allThemes, setAllThemes] = React.useState([]);
  const [themeSelected, setThemeSelected] = React.useState("");
  const [listModulesSelected, setListModulesSelected] = React.useState([]);
  const [modules, setModules] = React.useState([]);
  const [sessionS, setSessionSelected] = React.useState("");
  const [dateDebut, setDateDebut] = React.useState("");
  const [dateFin, setDateFin] = React.useState("");
  const [maxParticipants, setMaxParticipants] = React.useState("");
  // const [duree, setDuree] = React.useState("");
  const [quarter, setQuarter] = React.useState("");
  const [alertAction, setAlertAction] = React.useState(false);
  const [alertModule, setAlertModule] = React.useState(false);
  const [formationToDelete, setFormationToDelete] = React.useState("");
  const [alertRemove, setAlertRemove] = React.useState(false);
  const [alertSuccessRemove, setAlertSuccessRemove] = React.useState(false);
  const [openModalAddParticipants, setOpenModalAddParticipants] = React.useState(false);
  const [formateurCabinet, setFormateurCabinet] = React.useState(0);
  const [cabinetFormateur, setFetchCabinetFormateur] = React.useState({
    role: "",
    data: {
      nom: "",
      prenom: "",
      contact: ""
    }
  });


  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const detailsFormations = (formation) => {
    
    setFormation(formation)
    fetchParticipants(formation.id)
    fetchCabinetFormateur(formation.idCF)
    setOpen(true)
  }

  const openDeleteFormation = (formation) => {
    setFormationToDelete(formation)
    setAlertRemove(true)
  }

  const closeAlertRemoveBesoin = () => {
    setAlertRemove(false)
  }
  const deleteFormation = () => {


    const input = {
      id: formationToDelete.id
    }
    axios.post("http://localhost:8585/formations/delete",
      querystring.stringify(input), {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    }).then(res => {
      if (res.data.Success) {

        const listFormation = rows
        const index = listFormation.findIndex(formation => formation.id === formationToDelete.id)
        listFormation.splice(index, 1)
        setRows(listFormation)
        setAlertRemove(false)
        setAlertSuccessRemove(true)
        props.refreshCalendrier(listFormation)
      }

    })
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleCloseAddFormation = () => {
    setOpenAddFormation(false)
  }

  const addFormation = () => {
    setOpenAddFormation(true)
    axios.get("http://localhost:8585/themes").then(res => {
      if (res.data.Theme) {
        setThemes(res.data.Theme)
        setAllThemes(res.data.Theme)
      }
    })
  }

  const fetchParticipants = (id) => {
    const input = {
      id: id
    }

    axios.post("http://localhost:8585/formations/participants",
      querystring.stringify(input), {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    }).then(res => {
      if (res.data.Participants) {
        setParticipants(res.data.Participants)
      }

    })
  }

  const fetchCabinetFormateur = (id) => {

    const input = {
      id: id
    }
    axios.post("http://localhost:8282/cabinets/cabinetOrFormateur",
      querystring.stringify(input), {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    }).then(res => {
      if (res.data.Cabinet) {
        const obj = {
          role: "Cabinet",
          data: res.data.Cabinet
        }
        setFetchCabinetFormateur(obj)
      }else if (res.data.Formateur) {
        const obj = {
          role: "Formateur",
          data: res.data.Formateur
        }
        setFetchCabinetFormateur(obj)
      }else {
        setFetchCabinetFormateur({
          role: "",
          data: {
            nom: "",
            prenom: "",
            contact: ""
          }
        })
      }
    })
  }

  const addAction = (theme) => {
    axios.post("http://localhost:8585/themes", theme).then(res => {
      const listThemes = themes
      listThemes.push(res.data.Theme)
      setThemes(listThemes)
      setAlertAction(true)
    })
  }

  const onChangeTheme = (e) => {

    if (e.target.value === "TOUS") {
      setThemes(allThemes)
    } else {
      const typeFormation = {
        type: e.target.value
      }
      axios.post("http://localhost:8585/themes/type",
        querystring.stringify(typeFormation), {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(res => {
        if (res.data.Theme) {
          setThemes(res.data.Theme)
        }

      })
    }
  }


  const actionSelected = (e) => {
    setThemeSelected(JSON.parse(e.target.value))

    const theme = {
      id: JSON.parse(e.target.value).id,
    }

    axios.post("http://localhost:8585/themes/modules",
      querystring.stringify(theme), {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    }).then(res => {

      if (res.data.Modules) {
        setModules(res.data.Modules)
      }

    })
  }

  const getModules = (values) => {
    setListModulesSelected(values)
  }

  const addModule = (module) => {
    axios.post("http://localhost:8585/modules", module).then(res => {


      const obj = {
        idTheme: themeSelected.id,
        idModule: res.data.Module.id
      }
      axios.post("http://localhost:8585/themes/affecterMAT",
        querystring.stringify(obj), {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(res => {

      })
      const listModules = modules
      listModules.push(res.data.Module)
      setModules(listModules)
      setAlertModule(true)
    })

  }
  const sessionSelected = (session) => {
    setSessionSelected(session)
  }

  const dateDebutSelected = (date) => {
    setDateDebut(date)
  }

  const dateFinSelected = (date) => {
    setDateFin(date)
  }

  const onChangeDuree = (e) => {
    // setDuree(0)
  }

  const onChangeMaxParticipants = (e) => {
    setMaxParticipants(e.target.value)
  }

  const quarterSelected = (quarter) => {
    setQuarter(quarter)
    props.quarterSelected(quarter)
  }

  const participantsSelected = (participants) => {
    setParticipantsSelected(participants)
    console.log(participants)
  }


  const ajouterNouvelleFormation = () => {

    const tabs = []
    tabs.push(listModulesSelected)
    const obj = {
      nomTheme: themeSelected.nom,
      typeTheme: themeSelected.type,
      dateDebut: dateDebut.toString(),
      dateFin: dateFin.toString(),
      maxParticipants: maxParticipants,
      duree: "0",
      idSession: sessionS.id,
      quarter: quarter,
      listModules: tabs,
      listParticipants: participantsS,
      idCF: formateurCabinet
    }

    axios.post("http://localhost:8585/formations/", obj).then(res => {
      console.log(res.data)

    })
  }


  const closeAlertAction = () => {
    setAlertAction(false)
  }

  const closeAlertModule = () => {
    setAlertModule(false)
  }

  const closeAlertSuccessRemove = () => {
    setAlertSuccessRemove(false)
  }

  const formateurSelected = (formateur) => {
    setFormateurCabinet(formateur.id)
  }

  const cabinetSelected = (cabinet) => {
    setFormateurCabinet(cabinet.id)
  }

  const openAddParticipants = (formation) => {
    setOpenModalAddParticipants(true)
  }

  const closeModalAddParticipants = () => {
    setOpenModalAddParticipants(false)
  }





  return (
    <>

      <TableContainer className="tableContainerStyles" component={Paper} style={{ marginTop: "30px", width: "100%" }}>
        <Table size="small" className="tableTheme" aria-label="custom pagination table" >
          <TableHead className="tableHead" style={{ backgroundColor: "#B51B10" }}>
            <TableRow>
              <TableCell style={{ fontSize: 16, color: 'white' }}>Action</TableCell>
              <TableCell style={{ fontSize: 16, color: 'white' }}>Date debut</TableCell>
              <TableCell style={{ fontSize: 16, color: 'white' }}>Date fin</TableCell>
              <TableCell style={{ fontSize: 16, color: 'white' }}>Etat</TableCell>
              <TableCell colSpan={3} style={{ fontSize: 16, color: 'white' }}></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : rows
            ).map((row, index) => (
              <TableRow key={index}>
                <TableCell> {row.nomTheme} </TableCell>
                <TableCell> {row.dateDebut} </TableCell>
                <TableCell> {row.dateFin} </TableCell>
                <TableCell> {row.etat} </TableCell>
                <TableCell> <VisibilityIcon className={classes.iconInfo} onClick={detailsFormations.bind(this, row)} /> </TableCell>
                <TableCell> <GroupAddIcon className={classes.iconCheck} onClick={openAddParticipants.bind(this, row)} /> </TableCell>
                <TableCell> <DeleteForeverIcon className={classes.iconRemove} onClick={openDeleteFormation.bind(this, row)} /> </TableCell>
              </TableRow>
            ))}

            {emptyRows > 0 && (
              <TableRow style={{ height: 30 * emptyRows }}>
                <TableCell colSpan={2} ></TableCell>
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[]}
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: { 'aria-label': 'rows per page' },
                  native: true,
                }}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />

            </TableRow>
          </TableFooter>
        </Table>

      </TableContainer>

      <Button size="small" variant="outlined" color="secondary" className={classes.buttonStyles} onClick={addFormation}>
        Ajouter une formation
        </Button>

      <ComponentModalFormation
        open={open}
        handleClose={handleClose}
        formation={formation}
        participants={participants}
        cabinetFormateur={cabinetFormateur}
      />
      <ComponentModalAddFormation
        open={openAddFormation}
        handleClose={handleCloseAddFormation}
        themes={themes}
        addAction={addAction}
        onChangeTheme={onChangeTheme}
        actionSelected={actionSelected}
        modules={modules}
        getModules={getModules}
        addModule={addModule}
        sessions={props.sessions}
        sessionSelected={sessionSelected}
        quarterSelected={quarterSelected}
        ajouterSession={props.ajouterSession}
        dateDebutSelected={dateDebutSelected}
        dateFinSelected={dateFinSelected}
        onChangeDuree={onChangeDuree}
        onChangeMaxParticipants={onChangeMaxParticipants}
        ajouterNouvelleFormation={ajouterNouvelleFormation}
        participantsSelected={participantsSelected}
        formateurSelected={formateurSelected}
        cabinetSelected={cabinetSelected}
      />

      <ComponentModalAddParticipants open={openModalAddParticipants} handleClose={closeModalAddParticipants} />

      <Snackbar open={alertAction} autoHideDuration={5000} onClose={closeAlertAction}>
        <Alert onClose={closeAlertAction} icon={<CheckCircleIcon style={{ color: "white" }} />} style={{ backgroundColor: "#4CAF50", color: "white", width: 400, fontSize: 16 }}>
          Action de formation enregistrer
        </Alert>
      </Snackbar>

      <Snackbar open={alertModule} autoHideDuration={5000} onClose={closeAlertModule}>
        <Alert onClose={closeAlertModule} icon={<CheckCircleIcon style={{ color: "white" }} />} style={{ backgroundColor: "#4CAF50", color: "white", width: 400, fontSize: 16 }}>
          Module enregistrer
        </Alert>
      </Snackbar>

      <Snackbar open={alertSuccessRemove} autoHideDuration={5000} onClose={closeAlertSuccessRemove}>
        <Alert onClose={closeAlertSuccessRemove} icon={<CheckCircleIcon style={{ color: "white" }} />} style={{ backgroundColor: "#4CAF50", color: "white", width: 400, fontSize: 16 }}>
          Formation supprimé avec succées !
        </Alert>
      </Snackbar>

      <Dialog
        open={alertRemove}
        onClose={closeAlertRemoveBesoin}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle className="titleDialog">Supprimer FORMATION</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Voulez-vous vraiment supprimer cette formation ?
            </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button className="annulerBtn" onClick={closeAlertRemoveBesoin} style={{ backgroundColor: "#E67A0A", color: "white" }}>
            Retour
          </Button>
          <Button className="supprimerBtn" onClick={deleteFormation} style={{ backgroundColor: "#B51B10", color: "white" }} >
            Supprimer
          </Button>
        </DialogActions>
      </Dialog>
    </>

  );
}
