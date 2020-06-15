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
import AccountTreeIcon from '@material-ui/icons/AccountTree';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { TableHead, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@material-ui/core';
import GroupWorkIcon from '@material-ui/icons/GroupWork';
import ComponentModalInfos from "./component-modal-infos"
import ComponentModalEdit from "./component-modal-edit"
import axios from "axios"
import querystring from 'querystring'

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
  }
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
  const rows = props.users.sort((a, b) => (a.id < b.id) ? 1 : -1)
  const classes = useStyles1();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(6);
  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  const [alertDelete, setAlertDelete] = React.useState(false);
  const [userToDelete, setUserToDelete] = React.useState("");
  const [openInfos, setOpenInfos] = React.useState(false);
  const [openEdit, setOpenEdit] = React.useState(false);
  const [userToEdit, setUserToEdit] = React.useState({
    role: ""
  });
  const [userInfos, setUserInfos] = React.useState(false);
  const [infosCollaborateur, setInfosCollaborateur] = React.useState({
    teamlead: {
      nom: "",
      prenom: ""
    },
    manager: {
      nom: "",
      prenom: ""
    }
  });
  const [listFreeTeamLead, setListFreeTeamLead] = React.useState([]);
  

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const openDeleteUser = (user) => {
    setAlertDelete(true)
    setUserToDelete(user)
  }

  const closeAlertDelete = () => {
    setAlertDelete(false)
  }

  const deleteUser = () => {
    props.deleteUser(userToDelete)
    setAlertDelete(false)
  }

  const openInfosUser = (user) => {
    if (user.role === "COLLABORATEUR") {

      const obj = {
        id: user.id
      }
      axios.post(process.env.REACT_APP_PROXY_Utilisateurs+"/users/getInfosCollaborateur",
        querystring.stringify(obj), {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(res => {
        if (!res.data.Error) {
          const infos = {
            teamlead: res.data.TeamLead,
            manager: res.data.Manager === null ? {nom : "" , prenom : ""} : res.data.Manager
          }
          setInfosCollaborateur(infos)
        }
      })
    }

    if (user.role === "TEAMLEAD") {
      const obj = {
        id: user.id
      }
      axios.post(process.env.REACT_APP_PROXY_Utilisateurs+"/users/getInfosTL",
        querystring.stringify(obj), {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(res => {
        if (!res.data.Error) {
          const infos = {
            teamlead: {
              nom : "",
              prenom : ""
            },
            manager: res.data.Manager
          }
          setInfosCollaborateur(infos)
        }
      })
    }
    setUserInfos(user)
    setOpenInfos(true)
  }

  const closeModalInfos = () => {
    const obj = {
      teamlead: {
        nom: "",
        prenom: ""
      },
      manager: {
        nom: "",
        prenom: ""
      }
    }
    setInfosCollaborateur(obj)
    setOpenInfos(false)
  }

  const openEditUser = (user) => {
    if(user.role === "MANAGER") {
      axios.get(process.env.REACT_APP_PROXY_Utilisateurs+"/users/getFreeTL").then(res => {
        if(res.data.TeamLeads){
          setListFreeTeamLead(res.data.TeamLeads)
        }
      })
    }
    setUserToEdit(user)
    setOpenEdit(true)
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
              <TableCell style={{ fontSize: 16, color: 'white' }}>Bu</TableCell>
              <TableCell style={{ fontSize: 16, color: 'white' }}>Nom et Prenom</TableCell>
              <TableCell style={{ fontSize: 16, color: 'white' }}>Email</TableCell>
              <TableCell style={{ fontSize: 16, color: 'white' }}>Adresse</TableCell>
              <TableCell style={{ fontSize: 16, color: 'white' }}>Telephone</TableCell>
              <TableCell style={{ fontSize: 16, color: 'white' }}>Role</TableCell>
              <TableCell colSpan={3} style={{ fontSize: 16, color: 'white' }}></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : rows
            ).map((row, index) => (
              <TableRow key={index}>
                <TableCell> {row.bu} </TableCell>
                <TableCell> {row.nom} {row.prenom} </TableCell>
                <TableCell> {row.email} </TableCell>
                <TableCell> {row.adresse} </TableCell>
                <TableCell> {row.tel} </TableCell>
                <TableCell> {row.role} </TableCell>
                <TableCell><GroupWorkIcon onClick={openInfosUser.bind(this, row)} className={classes.iconInfo} /></TableCell>
                {row.role !== "SERVICEFORMATIONS" 
                  ? <TableCell><AccountTreeIcon onClick={openEditUser.bind(this, row)} className={classes.iconCheck} /></TableCell>
                  :
                  <TableCell></TableCell>
                }
                <TableCell><DeleteForeverIcon onClick={openDeleteUser.bind(this, row)} className={classes.iconRemove} /></TableCell>


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

      <ComponentModalInfos
        open={openInfos}
        handleClose={closeModalInfos}
        user={userInfos}
        infosCollaborateur={infosCollaborateur}
      />
      <ComponentModalEdit
        open={openEdit}
        handleClose={closeModalEdit}
        listManager={props.listManager}
        listTeamLead={props.listTeamLead}
        user={userToEdit}
        listFreeTeamLead={listFreeTeamLead}
        teamleadSelected={props.teamleadSelected}
        updateManagerTeamLead={props.updateManagerTeamLead}
        updateTeamLeadManager={props.updateTeamLeadManager}
        updateCollaborateur={props.updateCollaborateur}
      />

      <Dialog
        open={alertDelete}
        onClose={closeAlertDelete}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle className="titleDialog">Supprimer utilisateur</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Voulez-vous vraiment supprimer cet utilisateur ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button className="annulerBtn" onClick={closeAlertDelete} style={{ backgroundColor: "#E67A0A", color: "white" }}>
            Retour
          </Button>
          <Button className="supprimerBtn" onClick={deleteUser} style={{ backgroundColor: "#B51B10", color: "white" }} >
            Supprimer
          </Button>
        </DialogActions>
      </Dialog>
    </>

  );
}
