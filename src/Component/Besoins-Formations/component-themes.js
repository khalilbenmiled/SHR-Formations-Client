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
import ComponentModalAction from "./component-modal-action"

const useStyles1 = makeStyles(theme => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
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
  const rows =  props.themes.sort((a, b) => (a.nom < b.nom ? -1 : 1)) ;
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
 
  return (
    <TableContainer className="tableContainerStyles" component={Paper} style={{width : 700 }}>
      <Table size="small" className="tableTheme" aria-label="custom pagination table" >
        <TableHead  style={{backgroundColor: "#3D707E"}}>
            <TableRow>
                <TableCell style={{fontSize : 18 , color : 'white'}}>Nom</TableCell>
                <TableCell style={{fontSize : 18 , color : 'white' }}>Type</TableCell>
                <TableCell align="left" style={{fontSize : 18 , color : 'white' }}>

                </TableCell>
            </TableRow>
        </TableHead>
        <TableBody>
          {(rowsPerPage > 0
            ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : rows
          ).map((row , index) => (
            <TableRow key={row.id}   >
            
              <TableCell id={row.id} > {row.nom}</TableCell>
              <TableCell id={row.id} >{row.type}</TableCell>
              <TableCell id={row.id} >
                  <input className="checkStyle" type="radio" name="actionRadio" onChange={props.actionSelected} value={JSON.stringify(row)}/>                  
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
                <TableCell> 
                    <ComponentModalAction addAction={props.addAction} />    </TableCell>
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
  
  );
}
