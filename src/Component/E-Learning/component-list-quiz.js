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
import { TableHead, Snackbar } from '@material-ui/core';
// import EditIcon from '@material-ui/icons/Edit';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import VisibilityIcon from '@material-ui/icons/Visibility';
import ComponentModalInfos from "./component-modal-infos"
import ComponentModalEdit from "./component-modal-edit"
import ComponentModalAddQTF from "./component-modal-addQTF"
import axios from "axios"
// import querystring from 'querystring'
import Alert from '@material-ui/lab/Alert';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import AddToQueueIcon from '@material-ui/icons/AddToQueue';

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
  const rows = props.listQuiz
  const allFormations = props.formations
  const classes = useStyles1();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(4);
  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);
  const [openInfos, setOpenInfos] = React.useState(false);
  const [openEdit, setOpenEdit] = React.useState(false);
  const [alertQuiz, setAlertQuiz] = React.useState(false);
  const [quizInfos, setQuizInfos] = React.useState("");
  const [listQuestions, setListQuestions] = React.useState([]);
  const [openAddQTF, setOpenAddQTF] = React.useState(false);
  const [idQuiz, setIdQuiz] = React.useState("");
  // const [formations, setFormations] = React.useState([]);



  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const openModalInfos = (quiz) => {
    setQuizInfos(quiz)
    setListQuestions(quiz.listQuestions)
    setOpenInfos(true)
  }

  const closeModalInfos = () => {
    setOpenInfos(false)
  }

  // const openModalEdit = (quiz) => {
  //   setQuizInfos(quiz)
  //   setOpenEdit(true)
  // }

  const closeModalEdit = () => {
    setOpenEdit(false)
  }

  const updateQuestion = (question) => {
    axios.put("http://localhost:8787/quiz/", question).then(res => {
      if (res.data.Question) {
        const tabs = listQuestions
        const index = tabs.findIndex(q => q.id === res.data.Question.id)
        tabs.splice(index, 1, res.data.Question)
        setListQuestions(tabs)
        setOpenInfos(false)
        setAlertQuiz(true)
      }
    })
  }

  const closeAlertQuiz = () => {
    setAlertQuiz(false)
  }

  const openModalDeleteQuiz = (quiz) => {
    props.openModalDeleteQuiz(quiz)
  }

  const openModalAddQuizToFormation = (quiz) => {
    // const obj = {
    //   id: quiz.idFormation
    // }
    // axios.post("http://localhost:8585/formations/getFormationsWithouThistId",
    //   querystring.stringify(obj), {
    //   headers: {
    //     "Content-Type": "application/x-www-form-urlencoded"
    //   }
    // }).then(res => {
    //   if (res.data.Formations) {
    //     setFormations(res.data.Formations)
    //   }
    // })
    setIdQuiz(quiz.id)
    setOpenAddQTF(true)
  }

  const closeModalAddQTF = () => {
    setOpenAddQTF(false)
  }

  const addQTF = (idFormation) => {
    const obj = {
      idQ: idQuiz,
      idF: idFormation
    }
    props.addQTF(obj)
  }

  const getFormationNom = (row) => {
    return allFormations.find(f => f.id === row.idFormation).nomTheme
  }

  const getFormationDu = (row) => {
    return allFormations.find(f => f.id === row.idFormation).dateDebut
  }

  const getFormationAu = (row) => {
    return allFormations.find(f => f.id === row.idFormation).dateFin
  }



  return (
    <>

      <TableContainer className="tableContainerStyles" component={Paper} style={{ marginTop: "30px", width: "100%" }}>
        <Table size="small" className="tableTheme" aria-label="custom pagination table" >
          <TableHead className="tableHead" style={{ backgroundColor: "#B51B10" }}>
            <TableRow>
              <TableCell style={{ fontSize: 16, color: 'white' }}>Identifiant</TableCell>
              <TableCell style={{ fontSize: 16, color: 'white' }}>Nom</TableCell>
              <TableCell style={{ fontSize: 16, color: 'white' }}>Formation</TableCell>
              <TableCell style={{ fontSize: 16, color: 'white' }}>Du</TableCell>
              <TableCell style={{ fontSize: 16, color: 'white' }}>Au</TableCell>
              <TableCell colSpan={4} style={{ fontSize: 16, color: 'white' }}></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : rows
            ).map((row, index) => (
              <TableRow key={index}>
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.nomQuiz}</TableCell>
                <TableCell>{getFormationNom(row)}</TableCell>
                <TableCell>{getFormationDu(row)}</TableCell>
                <TableCell>{getFormationAu(row)}</TableCell>
                <TableCell><VisibilityIcon onClick={openModalInfos.bind(this, row)} className={classes.iconInfo} /></TableCell>
                {/* <TableCell> <EditIcon onClick={openModalEdit.bind(this, row)} className={classes.iconCheck} /></TableCell> */}
                <TableCell> <AddToQueueIcon onClick={openModalAddQuizToFormation.bind(this, row)} className={classes.iconCheck} /> </TableCell>
                <TableCell> <DeleteForeverIcon onClick={openModalDeleteQuiz.bind(this, row)} className={classes.iconAnnuler} /> </TableCell>


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
        quizInfos={quizInfos}
        listQuestions={listQuestions}
        updateQuestion={updateQuestion}
      />
      <ComponentModalEdit
        open={openEdit}
        handleClose={closeModalEdit}
        nomQuiz={quizInfos.nomQuiz}
        nbrQuestion={quizInfos.nbrQuestion}
        formations={props.formations}
      />

      <ComponentModalAddQTF
        open={openAddQTF}
        handleClose={closeModalAddQTF}
        formations={props.formations}
        addQTF={addQTF}
      />


      <Snackbar open={alertQuiz} autoHideDuration={5000} onClose={closeAlertQuiz}>
        <Alert onClose={closeAlertQuiz} icon={<CheckCircleIcon style={{ color: "white" }} />} style={{ backgroundColor: "#4CAF50", color: "white", width: 400, fontSize: 16 }}>
          Question modifier !
        </Alert>
      </Snackbar>
    </>

  );
}
