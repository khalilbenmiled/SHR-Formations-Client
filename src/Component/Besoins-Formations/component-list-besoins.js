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
import { TableHead } from '@material-ui/core';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import ComponentModalInfos from "./component-modal-infos"
import VisibilityIcon from '@material-ui/icons/Visibility';
import axios from "axios"
import querystring from 'querystring'
import ComponentModalValidate from "./component-modal-validate"
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import ComponentModalValidateByMG from "./component-modal-validateByManager"

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
    cursor: "pointer"
  },
  iconInfo: {
    color: "#ED7E0A",
    cursor: "pointer"
  },
  iconAnnuler: {
    cursor: "pointer",
    color: "#B51B10"
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
  const rows = props.listBesoins.sort((a, b) => (a.id < b.id) ? 1 : -1)
  const classess = useStyles1();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(8);
  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);
  const [open, setOpen] = React.useState(false);
  const [openValider, setOpenValider] = React.useState(false);
  const [openValiderMG, setOpenValiderMG] = React.useState(false);
  const [besoinToModal, setbesoinToModal] = React.useState("");
  const [modulesToModal, setModulesToModal] = React.useState("");
  const [projet, setProjet] = React.useState("");
  const [trimestre, setTrimestre] = React.useState("");
  const [idBesoin, setIdBesoin] = React.useState("");
  const [idUser, setIdUser] = React.useState("");
  const [idCollaborateur, setIdCollaborateur] = React.useState("");
  


  const openInfos = (besoin) => {
    setModulesToModal(besoin.theme.listModules)
    const user = {
      id: besoin.idUser
    }
    axios.post("http://localhost:8181/users/byId",
      querystring.stringify(user), {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    }).then(res => {

      const obj = {
        id: besoin.id,
        bu: besoin.bu,
        trimestre: besoin.quarter,
        action: besoin.theme.nom,
        type: besoin.theme.type,
        nom: res.data.User.nom,
        prenom: res.data.User.prenom,
        email: res.data.User.email,
        role: res.data.User.role,
        projet: besoin.projet === null ? "" : besoin.projet.nom,
        validerTL: besoin.validerTL,
        validerMG: besoin.validerMG
      }
      setbesoinToModal(obj)


    })


    setOpen(true)
  }

  const openModalValider = (besoin) => {
    setIdBesoin(besoin.id)
    setIdUser(besoin.idUser)
    setOpenValider(true)
  }

  const handleClose = () => {
    setOpen(false)
    setOpenValider(false)
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const onChangeProjet = (projet) => {
    setProjet(projet)
  }

  const onChangeTrimestre = (trimestre) => {
    setTrimestre(trimestre)
  }

  const onValiderBesoin = () => {

    const obj = {
      idBesoin: idBesoin,
      idUser:idUser,
      trimestre: trimestre,
      idProjet: projet,
      validerMG: false
    }
    props.onValiderBesoin(obj)
    setOpenValider(false)
  }

  const onValiderBesoinByManager = () => {
    const obj = {
      idBesoin: idBesoin,
      idUser : idCollaborateur ,
      trimestre: trimestre,
      idProjet: projet,
      validerMG: true
    }
    props.onValiderBesoin(obj)
    setOpenValiderMG(false)
  }

  const validerByManager = (besoin) => {
    if (besoin.validerTL === true) {
      props.validerByManager(besoin)
    } else {
      setIdBesoin(besoin.id)
      setIdCollaborateur(besoin.idUser)
      setOpenValiderMG(true)
    }
  }

  const closeValiderMG = () => {
    setOpenValiderMG(false)
  }


  return (
    <>

      <TableContainer className="tableContainerStyles" component={Paper} style={{ marginTop: "30px", width: "100%" }}>
        <Table size="small" className="tableTheme" aria-label="custom pagination table" >
          <TableHead className="tableHead" style={{ backgroundColor: "#B51B10" }}>
            <TableRow>
              <TableCell hidden={JSON.parse(localStorage.user).role !== "SERVICEFORMATIONS" ? true : false} style={{ fontSize: 16, color: 'white' }}>BU</TableCell>
              <TableCell style={{ fontSize: 16, color: 'white' }}>Action</TableCell>
              <TableCell style={{ fontSize: 16, color: 'white' }}>Type</TableCell>
              <TableCell style={{ fontSize: 16, color: 'white' }}>Trimestre</TableCell>

              <TableCell style={{ fontSize: 16, color: 'white' }}>Team Leader</TableCell>
              {JSON.parse(localStorage.user).role !== "COLLABORATEUR" ?
                <TableCell colSpan={4} style={{ fontSize: 16, color: 'white' }}>Manager</TableCell>
                :
                <TableCell colSpan={4}></TableCell>
              }
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : rows
            ).map((row, index) => (

              <TableRow key={index} style={{ backgroundColor: row.idUser === JSON.parse(localStorage.user).id && JSON.parse(localStorage.user).role === "TEAMLEAD" ? "rgba(42,255,42,0.3)" : "" }}>
                <TableCell hidden={JSON.parse(localStorage.user).role !== "SERVICEFORMATIONS" ? true : false}>{row.bu}</TableCell>
                <TableCell >{row.theme.nom}</TableCell>
                <TableCell > {row.theme.type}</TableCell>
                <TableCell >{row.quarter === 1 ? "1ere trimestre" : row.quarter === 2 ? "2eme trimestre" : row.quarter === 3 ? "3eme trimestre" : row.quarter === 4 ? "4eme trimestre" : ""}</TableCell>
                {JSON.parse(localStorage.user).id === row.idUser && JSON.parse(localStorage.user).role === "TEAMLEAD" ?
                  <TableCell ></TableCell>
                  :
                  <TableCell >{row.validerTL ? "Validé" : "En attente"}</TableCell>
                }

                {JSON.parse(localStorage.user).role !== "COLLABORATEUR" ?
                  <TableCell >{row.validerMG ? "Validé" : "En attente"}</TableCell>
                  :
                  <TableCell> </TableCell>
                }

                <TableCell > <VisibilityIcon className={classess.iconInfo} onClick={openInfos.bind(this, row)} /> </TableCell>

                {JSON.parse(localStorage.user).role === "TEAMLEAD" && JSON.parse(localStorage.user).id !== row.idUser ?
                  <TableCell hidden={JSON.parse(localStorage.user).role === "COLLABORATEUR" ? true : false}>
                    {row.validerTL === false ?
                      <CheckCircleIcon className={classess.iconCheck} onClick={openModalValider.bind(this, row)} />
                      :
                      <RemoveCircleIcon onClick={props.openAlertAnnulerBesoin.bind(this, row)} className={classess.iconAnnuler} />
                    }

                  </TableCell>
                  : JSON.parse(localStorage.user).role === "MANAGER" ?
                    <TableCell hidden={JSON.parse(localStorage.user).role === "COLLABORATEUR" ? true : false}>
                      {row.validerMG === false ?
                        <CheckCircleIcon className={classess.iconCheck} onClick={validerByManager.bind(this, row)} />
                        :
                        <RemoveCircleIcon onClick={props.annulerByManager.bind(this, row)} className={classess.iconAnnuler} />
                      }

                    </TableCell>
                    :
                    <TableCell > </TableCell>
                }
                <TableCell hidden={JSON.parse(localStorage.user).role === "SERVICEFORMATIONS" || (JSON.parse(localStorage.user).id !== row.idUser && JSON.parse(localStorage.user).role === "COLLABORATEUR")} >
                  <DeleteForeverIcon onClick={props.openAlertRemoveBesoin.bind(this, row)} className={classess.iconRemove} />
                </TableCell>


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

      <ComponentModalInfos open={open} handleClose={handleClose} besoinToModal={besoinToModal} modulesToModal={modulesToModal} />
      <ComponentModalValidate addProjet={props.addProjet} open={openValider} handleClose={handleClose} projets={props.projets} onChangeProjet={onChangeProjet} onChangeTrimestre={onChangeTrimestre} onValiderBesoin={onValiderBesoin} />
      <ComponentModalValidateByMG addProjet={props.addProjet} open={openValiderMG} handleClose={closeValiderMG} projets={props.projets} onChangeProjet={onChangeProjet} onChangeTrimestre={onChangeTrimestre} onValiderBesoinByManager={onValiderBesoinByManager} />
    </>

  );
}
