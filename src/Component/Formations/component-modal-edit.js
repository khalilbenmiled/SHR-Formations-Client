import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import CancelIcon from '@material-ui/icons/Cancel';
import { Button } from '@material-ui/core';
import { TextField } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import EventIcon from '@material-ui/icons/Event';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import fr from "date-fns/locale/fr";
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import Moment from 'moment';
import 'moment/locale/fr'

const useStyles = makeStyles(theme => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        "&:focus": {
            outline: "none"
        },
        borderRadius: "20px",
        width: 800,
        height: '55vh',
        boxShadow: theme.shadows[5],

    },
    titre: {
        color: "#3D707E"
    },
    cancelcon: {
        width: "30px",
        height: "30px",
        color: "#fff",
        cursor: "pointer",
        marginTop: "13px"
    },
    buttonAnnuler: {
        backgroundColor: "#E67A0A",
        color: "white",
        "&:focus": {
            outline: "none"
        },
        "&:hover": {
            backgroundColor: "#E67A0A",
            color: "white"
        }
    },
    buttonConfirmer: {
        backgroundColor: "#B51B10",
        color: "white",
        "&:focus": {
            outline: "none"
        },
        "&:hover": {
            backgroundColor: "#B51B10",
            color: "white"
        }
    },
}));

export default function TransitionsModal(props) {
    const classes = useStyles();
    // const [trimestre, setTrimestre] = React.useState("");
    const [nbrParticipantsSelected, setNbrParticipantsSelected] = React.useState(props.formation.maxParticipants);
    const [quarterS, setQuarterS] = React.useState("");
    const [dateDebutDisabled, setDateDebutDisabled] = React.useState(true);
    const [dateFinDisabled, setDateFinDisabled] = React.useState(true);
    const [selectedDateDebut, setSelectedDateDebut] = React.useState(null);
    const [selectedDateFin, setSelectedDateFin] = React.useState(null);


    const quarter = [
        { title: "Trimestre 1" },
        { title: "Trimestre 2" },
        { title: "Trimestre 3" },
        { title: "Trimestre 4" }
    ]

    const onChangerNbrParticipants = (e) => {
        setNbrParticipantsSelected(e.target.value)
        props.modifierNbrParticipantsSelected(e.target.value)
    }

    function disableWeekends(date) {
        return date.getDay() === 0
    }

    const quarterSelected = (e, value) => {
        if (value != null) {
            setQuarterS(value.title)
            setDateDebutDisabled(false)
            // props.quarterSelected(value.title === "Trimestre 1" ? "1" : value.title === "Trimestre 2" ? "2" : value.title === "Trimestre 3" ? "3" : value.title === "Trimestre 4" ? "4" : 0)

        } else {
            setQuarterS("")
            setSelectedDateDebut(null)
            setSelectedDateFin(null)
            setDateDebutDisabled(true)
            setDateFinDisabled(true)
        }
    }

    const onChangeDuree = (e) => {
        // setDureeS(e.target.value)
        // props.onChangeDuree(e.target.value)
    }

    const handleDateDebutChange = (date) => {
        Moment.locale("fr");
        setSelectedDateDebut(date);
        setDateFinDisabled(false)
        props.modfiferDateDebutSelected(Moment(date).format("DD/MM/YYYY HH:mm"))
    };

    const handleDateFinChange = (date) => {
        Moment.locale("fr");
        setSelectedDateFin(date);
        props.modifierDateFinSelected(Moment(date).format("DD/MM/YYYY HH:mm"))
    };

    function minDateDebutFunction(quarter) {

        let date = new Date()
        var month = date.getMonth() + 1
        if (quarter === "Trimestre 1") {

            if (Math.ceil(month / 3) > 1) {
                return "01.01." + (date.getFullYear() + 1).toString()
            } else {
                return "01.01." + date.getFullYear().toString()
            }

        } else if (quarter === "Trimestre 2") {
            if (Math.ceil(month / 3) > 2) {
                return "04.01." + (date.getFullYear() + 1).toString()
            } else {
                return "04.01." + date.getFullYear().toString()
            }

        } else if (quarter === "Trimestre 3") {
            if (Math.ceil(month / 3) > 3) {
                return "07.01." + (date.getFullYear() + 1).toString()
            } else {
                return "07.01." + date.getFullYear().toString()
            }

        } else if (quarter === "Trimestre 4") {
            if (Math.ceil(month / 3) > 4) {
                return "10.01." + (date.getFullYear() + 1).toString()
            } else {
                return "10.01." + date.getFullYear().toString()
            }

        }
    }
    function maxDateFinFunction(quarter) {

        if (selectedDateDebut === null) {
            return
        } else {
            let date = selectedDateDebut
            var month = date.getMonth() + 1
            if (quarter === "Trimestre 1") {
                if (Math.ceil(month / 3) > 1) {
                    return "03.31." + (date.getFullYear() + 1).toString()
                } else {
                    return "03.31." + date.getFullYear().toString()
                }

            } else if (quarter === "Trimestre 2") {
                if (Math.ceil(month / 3) > 2) {
                    return "06.30." + (date.getFullYear() + 1).toString()
                } else {
                    return "06.30." + date.getFullYear().toString()
                }

            } else if (quarter === "Trimestre 3") {
                if (Math.ceil(month / 3) > 3) {
                    return "09.30." + (date.getFullYear() + 1).toString()
                } else {
                    return "09.30." + date.getFullYear().toString()
                }

            } else if (quarter === "Trimestre 4") {
                if (Math.ceil(month / 3) > 4) {
                    return "12.31." + (date.getFullYear() + 1).toString()
                } else {
                    return "12.31." + date.getFullYear().toString()
                }

            }
        }

    }

    function maxDateDebutFunction(quarter) {

        let date = new Date()
        var month = date.getMonth() + 1
        if (quarter === "Trimestre 1") {
            if (Math.ceil(month / 3) > 1) {
                return "03.31." + (date.getFullYear() + 1).toString()
            } else {
                return "03.31." + date.getFullYear().toString()
            }

        } else if (quarter === "Trimestre 2") {
            if (Math.ceil(month / 3) > 2) {
                return "06.30." + (date.getFullYear() + 1).toString()
            } else {
                return "06.30." + date.getFullYear().toString()
            }

        } else if (quarter === "Trimestre 3") {
            if (Math.ceil(month / 3) > 3) {
                return "09.30." + (date.getFullYear() + 1).toString()
            } else {
                return "09.30." + date.getFullYear().toString()
            }

        } else if (quarter === "Trimestre 4") {
            if (Math.ceil(month / 3) > 4) {
                return "12.31." + (date.getFullYear() + 1).toString()
            } else {
                return "12.31." + date.getFullYear().toString()
            }

        }
    }
    const handleClose = () => {

        setSelectedDateDebut(null)
        setSelectedDateFin(null)
        setNbrParticipantsSelected(props.formation.maxParticipants)
        setDateDebutDisabled(true)
        setDateFinDisabled(true)
        console.log(nbrParticipantsSelected)
        props.handleClose();
    };

    const modifierFormation = () => {
        props.modifierFormation(props.formation)
        handleClose()
    }

    const verif = () => {
        if(selectedDateDebut !== null && selectedDateFin === null) {
            return 0
        }else {
            return 1
        }
    }


    return (
        <div >
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={props.open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={props.open}>
                    <div className={classes.paper}>

                        <div className="col-lg-12 col-md-12 " >

                            <div className="row modalHeader" style={{ marginBottom: "10px" }}>
                                <div className="col-lg-11 col-md-11">
                                    <h4 className="titreInfos">Modifier formation {props.formation.nomTheme}</h4>
                                </div>
                                <div className="col-lg-1 col-md-1" align="center">
                                    <CancelIcon onClick={handleClose} className={classes.cancelcon} />
                                </div>
                            </div>

                            <div className="row" style={{ paddingTop: "20px", backgroundColor: "#FAFAFA", marginBottom: "50px", margin: "auto", boxShadow: "0px 0px 1px" }}>
                                <div className="col-lg-12 col-md-12">

                                    <div className="row">
                                        <div className="col-lg-12 col-md-12">
                                            <div className={classes.rootSession}>
                                                <div className="row">
                                                    <div style={{ color: "#3D707E", fontSize: "20px", fontWeight: "bold" }} className="col-lg-4 col-md-4 offset-lg-4 offset-md-4 ">

                                                    </div>
                                                </div>
                                                <div className="row" style={{ paddingTop: "20px" }}>
                                                    <div className="col-lg-5 col-md-5 offset-lg-1 offset-md-1">
                                                        <div style={{ width: 420 }} className="input-group mb-3">
                                                            <div style={{ height: 40 }} className="input-group-prepend" >
                                                                <label style={{ width: 120 }} className="input-group-text" >Trimestre</label>
                                                            </div>
                                                            <Autocomplete
                                                                size="small"
                                                                options={quarter}
                                                                onChange={quarterSelected}
                                                                getOptionLabel={option => option.title}
                                                                style={{ width: 200, backgroundColor: "white" }}
                                                                renderInput={params => <TextField {...params} label="Trimestre" variant="outlined" />}
                                                            />
                                                        </div>
                                                    </div>


                                                    <div className="col-lg-5 col-md-5 ">
                                                        <div style={{ width: 420 }} className="input-group mb-3">
                                                            <div style={{ height: 40 }} className="input-group-prepend" >
                                                                <label style={{ width: 120 }} className="input-group-text" >Participants</label>
                                                            </div>
                                                            <div className="input-group-prepend">
                                                                <TextField value={props.actualNbrParticipant} type="number" style={{ width: 200, backgroundColor: "white" }} size="small" label="Nombres de participants" variant="outlined" onChange={onChangerNbrParticipants} />
                                                            </div>
                                                        </div>

                                                    </div>
                                                </div>

                                                <div className="row" style={{ paddingTop: "20px" }}>
                                                    <div className="col-lg-5 col-md-5 offset-lg-1 offset-md-1">
                                                        <div style={{ width: 320 }} className="input-group mb-3">
                                                            <div style={{ height: 40 }} className="input-group-prepend" >
                                                                <label style={{ width: 120 }} className="input-group-text" >Date debut</label>
                                                            </div>
                                                            <MuiPickersUtilsProvider locale={fr} utils={DateFnsUtils}>

                                                                <KeyboardDatePicker
                                                                    size="small"
                                                                    autoOk
                                                                    disabled={dateDebutDisabled}
                                                                    disableToolbar
                                                                    disablePast
                                                                    minDate={minDateDebutFunction(quarterS)}
                                                                    maxDate={maxDateDebutFunction(quarterS)}

                                                                    shouldDisableDate={disableWeekends}
                                                                    keyboardIcon={<EventIcon style={{ outline: "none", "&:focus": { outline: "none" } }} />}
                                                                    inputVariant="outlined"
                                                                    format="d MMM yyyy"
                                                                    style={{ width: 200, backgroundColor: "white" }}
                                                                    label="Date debut"
                                                                    value={selectedDateDebut}

                                                                    onChange={handleDateDebutChange}
                                                                    KeyboardButtonProps={{
                                                                        'aria-label': 'change date',
                                                                    }}
                                                                />

                                                            </MuiPickersUtilsProvider>
                                                        </div>

                                                    </div>
                                                    <div className="col-lg-5 col-md-5">
                                                        <div style={{ width: 320 }} className="input-group mb-3">
                                                            <div style={{ height: 40 }} className="input-group-prepend" >
                                                                <label style={{ width: 120 }} className="input-group-text" >Date fin</label>
                                                            </div>
                                                            <MuiPickersUtilsProvider locale={fr} utils={DateFnsUtils}>

                                                                <KeyboardDatePicker
                                                                    size="small"
                                                                    disabled={dateFinDisabled}
                                                                    autoOk
                                                                    shouldDisableDate={disableWeekends}
                                                                    disableToolbar
                                                                    disablePast
                                                                    keyboardIcon={<EventIcon style={{ outline: "none", "&:focus": { outline: "none" } }} />}
                                                                    inputVariant="outlined"
                                                                    format="d MMM yyyy"
                                                                    style={{ width: 200, backgroundColor: "white" }}
                                                                    label="Date fin"
                                                                    minDate={selectedDateDebut}
                                                                    maxDate={maxDateFinFunction(quarterS)}
                                                                    minDateMessage="Date doit etre supérieur au date début"
                                                                    value={selectedDateFin}
                                                                    onChange={handleDateFinChange}
                                                                    KeyboardButtonProps={{
                                                                        'aria-label': 'change date',
                                                                    }}
                                                                />

                                                            </MuiPickersUtilsProvider>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div hidden className="row" style={{ paddingTop: "20px" }}>

                                                    <div hidden className="col-lg-5 col-md-5 ">
                                                        <div style={{ width: 420 }} className="input-group mb-3">
                                                            <div style={{ height: 40 }} className="input-group-prepend" >
                                                                <label style={{ width: 120 }} className="input-group-text" >Durée</label>
                                                            </div>
                                                            <TextField type="number" style={{ width: 200, backgroundColor: "white" }} size="small" label="Durée" variant="outlined" onChange={onChangeDuree} />
                                                        </div>

                                                    </div>
                                                </div>



                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>


                            <div style={{ paddingTop: "20px", marginLeft: 560, display: "flex", flexDirection: "row", justifyContent: "space-between", width: 170 }}>
                                <Button size="small" variant="contained" className={classes.buttonAnnuler} onClick={props.handleClose}> Annuler</Button>
                                <Button disabled = {verif() === 0 ? true : false} size="small" variant="contained" className={classes.buttonConfirmer} onClick={modifierFormation}> Modifier</Button>
                            </div>

                        </div>

                    </div>
                </Fade>
            </Modal>
        </div>
    );
}





