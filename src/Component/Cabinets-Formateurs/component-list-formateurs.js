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
import EditIcon from '@material-ui/icons/Edit';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { TableHead, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@material-ui/core';
import ComponentModalEditFormateur from "./component-modal-edit-formateur"



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
  const rows = props.formateurs
  const classes = useStyles1();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(4);
  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  const [formateurToDelete, setFormateurToDelete] = React.useState("");
  const [formateurToEdit, setFormateurToEdit] = React.useState("");
  const [openDelete, setOpenDelete] = React.useState(false);
  const [openEdit, setOpenEdit] = React.useState(false);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const openDeleteFormateur = (formateur) => {
    setOpenDelete(true)
    setFormateurToDelete(formateur)
  }

  const closeAlertDelete = () => {
    setOpenDelete(false)
  }

  const deleteFormateur = () => {
    props.deleteFormateur(formateurToDelete)
    setOpenDelete(false)
  }

  const openEditFormateur = (formateur) => {
    setFormateurToEdit(formateur)
    setOpenEdit(true)
  }

  const handleClose = () => {
    setOpenEdit(false)
  }





  return (
    <>

      <TableContainer className="tableContainerStyles" component={Paper} style={{ marginTop: "30px", width: "100%" }}>
        <Table size="small" className="tableTheme" aria-label="custom pagination table" >
          <TableHead className="tableHead" style={{ backgroundColor: "#B51B10" }}>
            <TableRow>
              <TableCell style={{ fontSize: 16, color: 'white' }}>Nom</TableCell>
              <TableCell style={{ fontSize: 16, color: 'white' }}>Prenom</TableCell>
              <TableCell style={{ fontSize: 16, color: 'white' }}>Email</TableCell>
              <TableCell style={{ fontSize: 16, color: 'white' }}>Adresse</TableCell>
              <TableCell style={{ fontSize: 16, color: 'white' }}>Telephone</TableCell>
              <TableCell colSpan={3} style={{ fontSize: 16, color: 'white' }}></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : rows
            ).map((row, index) => (
              <TableRow key={index}>
                <TableCell> {row.nom} </TableCell>
                <TableCell> {row.prenom} </TableCell>
                <TableCell> {row.email} </TableCell>
                <TableCell> {row.adresse} </TableCell>
                <TableCell> {row.tel} </TableCell>
                <TableCell> <EditIcon onClick={openEditFormateur.bind(this, row)} className={classes.iconCheck} /></TableCell>
                <TableCell> <DeleteForeverIcon onClick={openDeleteFormateur.bind(this, row)} className={classes.iconAnnuler} /> </TableCell>

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

      <ComponentModalEditFormateur open={openEdit} handleClose={handleClose} formateur={formateurToEdit} updateFormateur={props.updateFormateur}/>

      <Dialog
        open={openDelete}
        onClose={closeAlertDelete}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle className="titleDialog">Supprimer formateur</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Voulez-vous vraiment supprimer ce formateur ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button className="annulerBtn" onClick={closeAlertDelete} style={{ backgroundColor: "#E67A0A", color: "white" }}>
            Retour
          </Button>
          <Button className="supprimerBtn" onClick={deleteFormateur} style={{ backgroundColor: "#B51B10", color: "white" }} >
            Supprimer
          </Button>
        </DialogActions>
      </Dialog>
    </>

  );
}
