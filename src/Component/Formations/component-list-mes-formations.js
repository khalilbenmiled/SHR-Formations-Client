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
import VisibilityIcon from '@material-ui/icons/Visibility';
import ComponentModalFormation from "./component-modal-formation"
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

  const rows = props.formations
  const classes = useStyles1();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(4);
  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);
  const [open, setOpen] = React.useState(false);
  const [formation, setFormation] = React.useState([]);
  const [participants, setParticipants] = React.useState([]);
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

  const handleClose = () => {
    setOpen(false)
  }

  const fetchParticipants = (id) => {
    const input = {
      id: id
    }

    axios.post(process.env.REACT_APP_PROXY_SessionsFormations+"/formations/participants",
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
    axios.post(process.env.REACT_APP_PROXY_FormateursCabinets+"/cabinets/cabinetOrFormateur",
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


      <ComponentModalFormation
        open={open}
        handleClose={handleClose}
        formation={formation}
        participants={participants}
        cabinetFormateur={cabinetFormateur}
      />

    </>

  );
}
