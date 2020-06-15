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
import PersonIcon from '@material-ui/icons/Person';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import axios from "axios"
import querystring from 'querystring'
import ComponentModalUserProcess from "./component-modal-user-process"
import ComponentModalUserProcess2 from "./component-modal-user-process2"


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
  showUsers: {
    color: "#3D707E",
    marginLeft: "-3px",
    cursor: "pointer"
  },
  buttonValider: {

    marginRight: theme.spacing(1),
    backgroundColor: "#3D707E",
    color: "white",
    marginLeft: "186px",
    marginTop: "5px",
    "&:focus": {
      outline: "none"
    },
    "&:hover": {
      backgroundColor: "#3D707E",
      color: "white",
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
  const rows = props.besoins

  const id = props.id
  const classes = useStyles1();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(6);
  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  const [infos, setInfos] = React.useState("");
  const [participants, setParticipants] = React.useState([]);

  const [openModal1, setOpenModal1] = React.useState(false);
  const [openModal2, setOpenModal2] = React.useState(false);


  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const besoinChecked = (e) => {

    if (e.target.checked) {
      props.besoinDisabled(id, 1)
      props.besoinSelected(JSON.parse(e.target.value))
      const input = {
        id: JSON.parse(e.target.value).id
      }

      axios.post(process.env.REACT_APP_PROXY_Besoins+"/besoins/listParticipantsBesoins",
        querystring.stringify(input), {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(res => {
        if (res.data.Participants) {
          const tabs = participants
          participants.push(res.data.Participants)
          setParticipants(tabs.flat())
          props.afficherListParticipant(participants)
        }
      })

    } else {
      props.besoinDisabled(id, -1)
      props.besoinUnselected(JSON.parse(e.target.value))
      if (JSON.parse(e.target.value).listParticipants.length === 0) {
        const index = participants.findIndex(p => p.id === JSON.parse(e.target.value).idUser)
        participants.splice(index, 1)
        setParticipants(participants)
        props.afficherListParticipant(participants)
      } else {
        JSON.parse(e.target.value).listParticipants.map(p => {
          const index = participants.findIndex(part => part.id === p.idParticipant)
          participants.splice(index, 1)
          return null
        })
        setParticipants(participants)
        props.afficherListParticipant(participants)
      }
    }

  }


  const handleClose = () => {
    setOpenModal1(false)
    setOpenModal2(false)
  }

  const openUser = (besoin) => {

    const user = {
      id: besoin.idUser
    }
    axios.post(process.env.REACT_APP_PROXY_Besoins+"/besoinsPublier/userInfos",
      querystring.stringify(user), {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    }).then(res => {
      if (!res.data.Error) {
        if (res.data.Collaborateur === null) {
          const obj = {
            teamlead: res.data.TeamLead,
            manager: res.data.Manager
          }
          setInfos(obj)
          setOpenModal1(false)
          setOpenModal2(true)
        } else {
          const obj = {
            collaborateur: res.data.Collaborateur,
            teamlead: res.data.TeamLead,
            manager: res.data.Manager
          }
          setInfos(obj)
          setOpenModal1(true)
          setOpenModal2(false)

        }
      }
    })

  }

  const deleteBesoin = (besoin) => {

    props.deleteBesoin(besoin.id , id)
  }

  return (
    <div>
      <TableContainer className="tableContainerStyles" component={Paper} style={{ marginTop: "30px", width: "100%" }}>
        <Table size="small" className="tableTheme" aria-label="custom pagination table" >
          <TableHead className="tableHead" style={{ backgroundColor: "#B51B10" }}>
            <TableRow>
              <TableCell style={{ fontSize: 16, color: 'white' }}>BU</TableCell>
              <TableCell style={{ fontSize: 16, color: 'white' }}>Modules</TableCell>

              <TableCell colSpan={5} style={{ fontSize: 16, color: 'white' }}></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : rows
            ).map((row, index) => (

              <TableRow key={index}>
                <TableCell>{row.bu}</TableCell>
                <TableCell >
                  {row.theme.listModules.map((module, index) => (
                    <li key={index}> {module.nom} : {module.description} <br /></li>
                  ))}
                </TableCell>

                <TableCell>
                  <PersonIcon className={classes.user} onClick={openUser.bind(this, row)} />
                </TableCell>

                <TableCell>
                  <DeleteForeverIcon onClick={deleteBesoin.bind(this, row)} className={classes.iconRemove} />
                </TableCell>

                <TableCell>
                  <input value={JSON.stringify(row)} onChange={besoinChecked} className={classes.checkBox} type="checkBox" name="actionRadio" />
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



      {openModal1 ?
        <ComponentModalUserProcess open={openModal1} handleClose={handleClose} infos={infos} />
        : openModal2 ?
          <ComponentModalUserProcess2 open={openModal2} handleClose={handleClose} infos={infos} />
          :
          ""
      }

    </div>

  );
}
