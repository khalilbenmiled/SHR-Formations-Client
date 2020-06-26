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
import Moment from 'moment';
import 'moment/locale/fr'
import SockJS from "sockjs-client"
import Stomp from "stomp-websocket"
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import ComponentModalAddCabinetFormateur from "./component-modal-add-cabinetFormateur"
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import ListIcon from '@material-ui/icons/List';
import Workbook from 'react-xlsx-workbook'
import EditIcon from '@material-ui/icons/Edit';
import ComponentModalEdit from "./component-modal-edit"


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

  const [rows, setRows] = React.useState(props.formations.sort((a, b) => (a.id < b.id) ? 1 : -1));
  const classes = useStyles1();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(6);
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
  // const [sessionS, setSessionSelected] = React.useState("");
  const [dateDebut, setDateDebut] = React.useState("");
  const [dateFin, setDateFin] = React.useState("");
  const [maxParticipants, setMaxParticipants] = React.useState("");
  // const [duree, setDuree] = React.useState("");
  const [quarter, setQuarter] = React.useState("");
  const [alertAction, setAlertAction] = React.useState(false);
  const [alertModule, setAlertModule] = React.useState(false);
  const [alertFormation, setAlertFormation] = React.useState(false);
  const [formationToDelete, setFormationToDelete] = React.useState("");
  const [alertRemove, setAlertRemove] = React.useState(false);
  const [alertSuccessRemove, setAlertSuccessRemove] = React.useState(false);
  const [openModalAddParticipants, setOpenModalAddParticipants] = React.useState(false);
  const [formateurCabinet, setFormateurCabinet] = React.useState(0);
  const [idFormation, setIdFormation] = React.useState(0);
  const [participantToSet, setParticipantToSet] = React.useState([]);
  const [limiteParticipant, setLimiteParticipants] = React.useState(0);
  const [listParticipants, setListParticipants] = React.useState([]);
  const [alertSetParticipants, setAlertSetParticipant] = React.useState(false);
  const [stompClient, setStompClient] = React.useState("");
  const [openModalAddCF, setOpenModalAddCF] = React.useState(false);
  const [alertConvoquer, setAlertConvoquer] = React.useState(false);
  const [formationToConvoquer, setFormationToConvoquer] = React.useState("");
  const [listPresence, setListPresence] = React.useState([]);
  const [openGenerateCSV, setOpenGenerateCSV] = React.useState(false);
  const [nombreDeJours, setNombreDeJours] = React.useState(0);
  const [dateUne, setDateUne] = React.useState("");
  const [openEdit, setOpenEdit] = React.useState(false);
  const [formationToEdit, setFormationToEdit] = React.useState("");
  const [actualNbrParticipant, setActualNbrParticipant] = React.useState(0);
  
  

  const [collaborateursAndParticipants, setCollaborateursAndParticipants] = React.useState([]);
  const [cabinetFormateur, setFetchCabinetFormateur] = React.useState({
    role: "",
    data: {
      nom: "",
      prenom: "",
      contact: ""
    }
  });


  React.useEffect(() => {
    var socket = new SockJS("http://localhost:8383/notifications");
    var stompClient = Stomp.over(socket);
    setStompClient(stompClient)
  }, [])

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
    axios.post(process.env.REACT_APP_PROXY_SessionsFormations + "/formations/delete",
      querystring.stringify(input), {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    }).then(res => {
      if (res.data.Success) {

        const listFormation = rows
        const index = listFormation.findIndex(formation => formation.id === formationToDelete.id)
        listFormation.splice(index, 1)
        setRows(listFormation.sort((a, b) => (a.id < b.id) ? 1 : -1))
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
    axios.get(process.env.REACT_APP_PROXY_SessionsFormations + "/themes").then(res => {
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

    axios.post(process.env.REACT_APP_PROXY_SessionsFormations + "/formations/participants",
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
    axios.post(process.env.REACT_APP_PROXY_FormateursCabinets + "/cabinets/cabinetOrFormateur",
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
      } else if (res.data.Formateur) {
        const obj = {
          role: "Formateur",
          data: res.data.Formateur
        }
        setFetchCabinetFormateur(obj)
      } else {
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
    axios.post(process.env.REACT_APP_PROXY_SessionsFormations + "/themes", theme).then(res => {
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
      axios.post(process.env.REACT_APP_PROXY_SessionsFormations + "/themes/type",
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

    axios.post(process.env.REACT_APP_PROXY_SessionsFormations + "/themes/modules",
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
    axios.post(process.env.REACT_APP_PROXY_SessionsFormations + "/modules", module).then(res => {


      const obj = {
        idTheme: themeSelected.id,
        idModule: res.data.Module.id
      }
      axios.post(process.env.REACT_APP_PROXY_SessionsFormations + "/themes/affecterMAT",
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
    // setSessionSelected(session)
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

  const participantsToAdd = (participants, id) => {
    const tabs = []
    participants.map(participant => {
      tabs.push(participant.data)
      return null
    })
    setParticipantToSet(tabs)
  }

  const SetParticipants = () => {
    const obj = {
      id: idFormation,
      participants: participantToSet
    }

    axios.post(process.env.REACT_APP_PROXY_SessionsFormations + "/formations/setListParticipantFormation", obj).then(res => {
      if (res.data.Formation) {

        const listFormation = rows
        const index = listFormation.findIndex(formation => formation.id === res.data.Formation.id)

        var dateDebut = new Date(res.data.Formation.dateDebut)
        var dateFin = new Date(res.data.Formation.dateFin)
        Moment.locale("fr");
        var new_date = Moment(dateFin, "YYYY-MM-DD").add(1, "days")

        const formation = {
          id: res.data.Formation.id,
          nomTheme: res.data.Formation.nomTheme,
          typeTheme: res.data.Formation.typeTheme,
          dateDebut: Moment(dateDebut).format("DD-MM-YYYY").toString(),
          dateFin: Moment(new_date).format("DD-MM-YYYY").toString(),
          listModules: res.data.Formation.listModules,
          listParticipants: res.data.Formation.listParticipants,
          maxParticipants: res.data.Formation.maxParticipants,
          duree: res.data.Formation.duree,
          idCF: res.data.Formation.idCF,
          etat: res.data.Formation.etat
        }
        listFormation.splice(index, 1, formation)
        setRows(listFormation.sort((a, b) => (a.id < b.id) ? 1 : -1))
        setAlertSetParticipant(true)
      }
    })
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
      idSession: "0",
      quarter: quarter,
      listModules: tabs,
      listParticipants: participantsS,
      idCF: formateurCabinet
    }


    axios.post(process.env.REACT_APP_PROXY_SessionsFormations + "/formations/", obj).then(res => {
      if (res.data.Formation) {
        participantsS.map(participant => {
          Moment.locale("fr");
          var now_date = Moment().format("DD/MM/YYYY HH:mm")
          const obj = {
            idCollaborateur: participant.id,
            message: "Vous etes inscrit à une formation, consulter votre calendrier",
            opened: false,
            date: now_date
          }
          stompClient.send("/app/valider", {}, JSON.stringify(obj));
          return null
        })

        setAlertFormation(true)

      }
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
    const obj = {
      id: formation.id
    }
    axios.post(process.env.REACT_APP_PROXY_SessionsFormations + "/formations/collaborateurWithoutParticipant",
      querystring.stringify(obj), {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    }).then(res => {
      setCollaborateursAndParticipants(res.data.Collaborateurs)
      setIdFormation(formation.id)
    })

    setLimiteParticipants(formation.maxParticipants)
    setListParticipants(formation.listParticipants)
    setOpenModalAddParticipants(true)

  }

  const closeModalAddParticipants = () => {
    setOpenModalAddParticipants(false)
  }

  const closeAlertFormation = () => {
    setAlertFormation(false)
  }

  const closeAlertSetParticipant = () => {
    setAlertSetParticipant(false)
  }

  const openModalCabinetFormateur = (row) => {
    setIdFormation(row.id)
    setOpenModalAddCF(true)
  }

  const getEtat = (dateDebut, dateFin) => {

    Moment.locale("fr");
    var now_date = Moment().format("YYYY-MM-DD")
    var date_debut = Moment(dateDebut, 'DD-MM-YYYY').format('YYYY-MM-DD')
    var date_fin = Moment(dateFin, 'DD-MM-YYYY').format('YYYY-MM-DD')

    if (Moment(now_date).isBefore(date_debut) && Moment(now_date).isBefore(date_fin)) {
      return "Programmée"
    } else if (Moment(now_date).isAfter(date_debut) && Moment(now_date).isAfter(date_fin)) {
      return "Terminée"
    } else if (Moment(now_date).isBetween(date_debut, date_fin)) {
      return "En cours"
    } else if (Moment(now_date).isSameOrAfter(date_debut) && Moment(now_date).isSameOrBefore(date_fin)) {
      return "En cours"
    }

  }


  const closeModalAddCF = () => {
    setOpenModalAddCF(false)
  }

  const closerAlertConvoquer = () => {
    setAlertConvoquer(false)
  }

  const openConvoquerParticipants = (row) => {

    setAlertConvoquer(true)
    setFormationToConvoquer(row)
  }

  const onConvoquer = () => {
    const obj = {
      listParticipants: formationToConvoquer.listParticipants,
      formation: formationToConvoquer
    }

    axios.post(process.env.REACT_APP_PROXY_SessionsFormations + "/formations/convoquer", obj).then(res => {

    })
    props.showLine(true)
    setAlertConvoquer(false)
    setTimeout(() => {
      props.showLine(false)
      props.showAlertConvoquer(true)
    }, 3000);

  }

  const generateListPresence = (row) => {

    const input = {
      id: row.id
    }
    Moment.locale("fr");
    var d1 = Moment(row.dateDebut, "DD-MM-YYYY").add(-1, "days").format("DD-MM-YYYY")

    setDateUne(d1)
    var admission = Moment(row.dateDebut, 'DD-MM-YYYY');
    var discharge = Moment(row.dateFin, 'DD-MM-YYYY');
    const nbr = discharge.diff(admission, 'days')

    setNombreDeJours(nbr)




    axios.post(process.env.REACT_APP_PROXY_SessionsFormations + "/formations/participants",
      querystring.stringify(input), {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    }).then(res => {
      if (res.data.Participants) {
        const csvFile = [{ formation: row.nomTheme }]
        res.data.Participants.map(participant => {
          csvFile.push({
            nomPrenom: participant.nom + " " + participant.prenom,
            bu: participant.bu,

          })
          return null
        })

        console.log(csvFile)
        setListPresence(csvFile)
        setOpenGenerateCSV(true)
      }
    })
  }



  const closeGenerateCSV = () => {
    setOpenGenerateCSV(false)
  }

  const getNombreDeJours = () => {

    const tabs = []
    for (let i = 0; i < nombreDeJours; i++) {
      tabs.push(<Workbook.Column label={Moment(dateUne, "DD-MM-YYYY").add(i + 1, "days").format("DD-MM-YYYY")} value="" />)

    }
    return tabs;
  }
  const GenererListPresence = () => {
    return (

      <Workbook filename="liste-présence.xlsx" element={
        <Button className="supprimerBtn" onClick={() => {
          setOpenGenerateCSV(false)
        }} style={{ backgroundColor: "#B51B10", color: "white" }} >
          Générer
          </Button>
      }>
        <Workbook.Sheet data={listPresence} name="Feuille 1">
          <Workbook.Column label="Formation" value="formation" />
          <Workbook.Column label="" value="" />
          <Workbook.Column label="Nom et Prénom" value="nomPrenom" />
          <Workbook.Column label="BU" value="bu" />
          {getNombreDeJours()}



        </Workbook.Sheet>
      </Workbook>


    )

  }

  const openModalEdit = (row) => {
    console.log(row)
    setFormationToEdit(row)
    setActualNbrParticipant(row.maxParticipants)
    setOpenEdit(true)
  }

  const modifierNbrParticipantsSelected = (nbr) => {
    props.modifierNbrParticipantsSelected(nbr)
    setActualNbrParticipant(nbr)
  }

  const closeModalEdit = () => {
    setOpenEdit(false)
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
              <TableCell colSpan={7} style={{ fontSize: 16, color: 'white' }}></TableCell>
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
                <TableCell> {getEtat(row.dateDebut, row.dateFin)} </TableCell>
                <TableCell> <VisibilityIcon className={classes.iconInfo} onClick={detailsFormations.bind(this, row)} /> </TableCell>
                <TableCell> <GroupAddIcon hidden={getEtat(row.dateDebut, row.dateFin) === "Programmée" ? false : true} className={classes.iconCheck} onClick={openAddParticipants.bind(this, row)} /> </TableCell>
                <TableCell> <AccountBalanceIcon onClick={openModalCabinetFormateur.bind(this, row)} hidden={getEtat(row.dateDebut, row.dateFin) === "Programmée" ? false : true} style={{ cursor: "pointer", color: "#4AA14B" }} /></TableCell>
                <TableCell> <SupervisorAccountIcon hidden={getEtat(row.dateDebut, row.dateFin) !== "Programmée" ? true : false} style={{ cursor: "pointer" }} onClick={openConvoquerParticipants.bind(this, row)} /> </TableCell>

                <TableCell><ListIcon style={{ cursor: "pointer" }} hidden={getEtat(row.dateDebut, row.dateFin) !== "Programmée" ? true : false} onClick={generateListPresence.bind(this, row)} /></TableCell>
                <TableCell> <EditIcon hidden={getEtat(row.dateDebut, row.dateFin) !== "Programmée" ? true : false} onClick={openModalEdit.bind(this, row)} style={{ cursor: "pointer", color: "#4AA14B" }} /></TableCell>

                <TableCell> <DeleteForeverIcon hidden={getEtat(row.dateDebut, row.dateFin) !== "Programmée" ? true : false} className={classes.iconRemove} onClick={openDeleteFormation.bind(this, row)} /> </TableCell>
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

      <ComponentModalAddParticipants
        open={openModalAddParticipants}
        handleClose={closeModalAddParticipants}
        users={collaborateursAndParticipants}
        participantsToAdd={participantsToAdd}
        SetParticipants={SetParticipants}
        limiteParticipant={limiteParticipant}
        listParticipants={listParticipants}
      />

      <ComponentModalAddCabinetFormateur
        open={openModalAddCF}
        handleClose={closeModalAddCF}
        idFormation={idFormation}
        affecterCF={props.affecterCF}
      />

      <ComponentModalEdit 
        open = {openEdit}
        handleClose={closeModalEdit}
        formation={formationToEdit}
        modfiferDateDebutSelected={props.modfiferDateDebutSelected}
        modifierDateFinSelected={props.modifierDateFinSelected}
        modifierNbrParticipantsSelected={modifierNbrParticipantsSelected}
        actualNbrParticipant={actualNbrParticipant}
        modifierFormation={props.modifierFormation}
      />

      <Snackbar open={alertAction} autoHideDuration={5000} onClose={closeAlertAction}>
        <Alert onClose={closeAlertAction} icon={<CheckCircleIcon style={{ color: "white" }} />} style={{ backgroundColor: "#4CAF50", color: "white", width: 400, fontSize: 16 }}>
          Action de formation enregistré
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

      <Snackbar open={alertFormation} autoHideDuration={5000} onClose={closeAlertFormation}>
        <Alert onClose={closeAlertFormation} icon={<CheckCircleIcon style={{ color: "white" }} />} style={{ backgroundColor: "#4CAF50", color: "white", width: 400, fontSize: 16 }}>
          Formation ajouté avec succées !
        </Alert>
      </Snackbar>

      <Snackbar open={alertSetParticipants} autoHideDuration={5000} onClose={closeAlertSetParticipant}>
        <Alert onClose={closeAlertSetParticipant} icon={<CheckCircleIcon style={{ color: "white" }} />} style={{ backgroundColor: "#4CAF50", color: "white", width: 400, fontSize: 16 }}>
          Participants ajoutés avec succées !
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

      <Dialog
        open={alertConvoquer}
        onClose={closerAlertConvoquer}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle className="titleDialog">Convoquer participants</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Voulez-vous vraiment convoquer les participants de cette formation ?
            </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button className="annulerBtn" onClick={closerAlertConvoquer} style={{ backgroundColor: "#E67A0A", color: "white" }}>
            Retour
          </Button>
          <Button className="supprimerBtn" onClick={onConvoquer} style={{ backgroundColor: "#B51B10", color: "white" }} >
            Convoquer
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openGenerateCSV}
        onClose={closeGenerateCSV}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle className="titleDialog">Générer une liste de présence</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Voulez-vous vraiment générer une liste de présence ?
            </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button className="annulerBtn" onClick={closeGenerateCSV} style={{ backgroundColor: "#E67A0A", color: "white" }}>
            Retour
          </Button>
          <div className="supprimerBtn" style={{ backgroundColor: "#B51B10", color: "white" }} >
            {GenererListPresence()}
          </div>
        </DialogActions>
      </Dialog>
    </>

  );
}
