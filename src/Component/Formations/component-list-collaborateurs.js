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
    const rows = props.listParticipants
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(6);
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);
    const classes = useStyles1();
    const [participantSelected, setParticipantSelected] = React.useState([]);




    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = event => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const participantChecked = (e) => {
        if (e.target.checked) {
            const tabs = participantSelected
            tabs.push(JSON.parse(e.target.value))
            setParticipantSelected(tabs)
            props.participantsSelected(participantSelected)
        } else {
            const tabs = participantSelected
            const index = tabs.findIndex(p => p.id === JSON.parse(e.target.value).id)
            tabs.splice(index, 1)
            setParticipantSelected(tabs)
            props.participantsSelected(participantSelected)
        }
    }


    return (
        <>

            <TableContainer className="tableContainerStyles" component={Paper} style={{ marginTop: "30px", width: "100%", height: "250px" }}>
                <Table size="small" className="tableTheme" aria-label="custom pagination table" >
                    <TableHead className="tableHead" style={{ backgroundColor: "#B51B10" }}>
                        <TableRow>
                            <TableCell style={{ fontSize: 16, color: 'white' }}>BU</TableCell>
                            <TableCell style={{ fontSize: 16, color: 'white' }}>Nom</TableCell>
                            <TableCell style={{ fontSize: 16, color: 'white' }}>Prenom</TableCell>
                            <TableCell style={{ fontSize: 16, color: 'white' }}>Email</TableCell>
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
                                <TableCell> {row.nom} </TableCell>
                                <TableCell> {row.prenom} </TableCell>
                                <TableCell> {row.email} </TableCell>
                                <TableCell>
                                    <input value={JSON.stringify(row)} onChange={participantChecked} className={classes.checkBox} type="checkBox" name="actionRadio" />
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


        </>

    );
}
