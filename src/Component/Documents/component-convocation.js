import React from 'react';
import { TextField, Button } from '@material-ui/core';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import fr from "date-fns/locale/fr";
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import EventIcon from '@material-ui/icons/Event';
import Moment from 'moment';
import 'moment/locale/fr'
import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';
import { PDFViewer } from '@react-pdf/renderer';
import { makeStyles } from '@material-ui/core/styles';
import logo from "../../images/logo.jpg"


const useStyles = makeStyles(theme => ({
    buttonStyles: {
        border: "1px solid #B51B10",
        marginLeft: "360px",
        marginTop: "5px",
        marginBottom: "5px",
        color: "#B51B10",
        width: "200px",
        "&:focus": {
            outline: "none"
        }
    },

}));

const BORDER_COLOR = '#bfbfbf'
const BORDER_STYLE = 'solid'
const COL1_WIDTH = 40
const COLN_WIDTH = (100 - COL1_WIDTH) / 4
const styles = StyleSheet.create({
    page: {
        flexDirection: 'column',
        backgroundColor: 'white',
        borderWidth: 0.5,
        borderColor: 'black',
        borderStyle: 'solid',
    },
    sectionHeader: {
        flexDirection: 'row',
        width: "100%",
        borderBottomWidth: 3,
        borderBottomColor: '#B51B10',
        borderBottomStyle: 'solid',
        color: "black",
        paddingLeft : "70px"
    },
    title: {
        borderBottomWidth: 1,
        borderBottomColor: '#B51B10',
        borderBottomStyle: 'solid',
        padding: "20px 180px"
    },
    titleText: {
        color: "#B51B10",
        fontWeight: "bold"
    },
    infos: {
        paddingTop: "50px",
        paddingLeft: "160px",
        width: "65%",
        flexDirection: 'row',
    },
    infosLabel: {
        fontSize: 22,
        fontWeight: "900px",

    },
    infosData: {
        width: "75%",
        fontSize: 11,

    },
    logo: {
        width: "35%",
        paddingLeft : "20px"
    },
    logoImg: {
        width: "150px",
        height: "100px"
    },
    sectionBody: {
        flexDirection: 'column',
        borderBottomWidth: 3,
        borderBottomColor: '#B51B10',
        borderBottomStyle: 'solid',
        width : "100%"
    },
    collaborateur : {
        marginTop : "30px",
        textAlign : "center",
        fontSize: 16,
        fontWeight: "900px",
        textDecoration : "underline"
    },
    corp : {
        marginTop : "15px",
        textAlign : "center",
        fontSize: 14,
    },
    formationNom : {
        fontSize: 18,
        fontWeight: "900px",
        textAlign : "center",
        marginTop : "15px"
    },
    date : {
        fontSize : 14,
        textAlign : "center"
    },  
    soprahr : {
        textAlign : "center",
        marginTop : "60px",
        fontSize : 16,
        fontWeight : "900px"
    },
    adresse : {
        textAlign : "center",
        fontSize : 14,
    },
    cordialement : {
        fontSize : 12,
        marginTop : "50px",
        marginLeft : "70px",
        marginBottom : "20px"
    },
    table: {
        display: "table",
        width: "98%",
        margin: "40px 5px",
        borderStyle: BORDER_STYLE,
        borderColor: BORDER_COLOR,
        borderWidth: 1,
        borderRightWidth: 0,
        borderBottomWidth: 0
    },
    tableRowHeader: {
        margin: "auto",
        flexDirection: "row",
        backgroundColor: "#B51B10",
        color: "white"
    },
    tableRow: {
        margin: "auto",
        flexDirection: "row"
    },
    tableCol1Header: {
        width: COL1_WIDTH + '%',
        borderStyle: BORDER_STYLE,
        borderColor: BORDER_COLOR,
        borderBottomColor: '#000',
        borderWidth: 1,
        borderLeftWidth: 0,
        borderTopWidth: 0
    },
    tableColHeader: {
        width: COLN_WIDTH + "%",
        borderStyle: BORDER_STYLE,
        borderColor: BORDER_COLOR,
        borderBottomColor: '#000',
        borderWidth: 1,
        borderLeftWidth: 0,
        borderTopWidth: 0
    },
    tableCol1: {
        width: COL1_WIDTH + '%',
        borderStyle: BORDER_STYLE,
        borderColor: BORDER_COLOR,
        borderWidth: 1,
        borderLeftWidth: 0,
        borderTopWidth: 0
    },
    tableCol: {
        flexDirection: "column",
        width: COLN_WIDTH + "%",
        borderStyle: BORDER_STYLE,
        borderColor: BORDER_COLOR,
        borderWidth: 1,
        borderLeftWidth: 0,
        borderTopWidth: 0
    },
    tableCellHeader: {
        margin: 5,
        fontSize: 12,
        fontWeight: 500
    },
    tableCell: {
        margin: 5,
        fontSize: 10
    },
    cellID: {
        flexDirection: "column",

    },
    textID: {
        flexGrow: 4,
    }
});

export default function TransitionsModal(props) {
    const classes = useStyles();
    const [selectedDateDebut, setSelectedDateDebut] = React.useState(null);
    const [selectedDateFin, setSelectedDateFin] = React.useState(null);
    const [nomFormation, setNomFormation] = React.useState("");
    const [dateDebut, setDateDebut] = React.useState("");
    const [dateFin, setDateFin] = React.useState("");
    const [nom, setNom] = React.useState("");
    const [prenom, setPrenom] = React.useState("");
    const [showPDF, setShowPDF] = React.useState(false);

    function disableWeekends(date) {
        return date.getDay() === 0
    }

    const handleDateDebutChange = (date) => {
        Moment.locale("fr");
        setSelectedDateDebut(date);
        setDateDebut(Moment(date).format("DD/MM/YYYY"))
    };

    const handleDateFinChange = (date) => {
        Moment.locale("fr");
        setSelectedDateFin(date);
        setDateFin(Moment(date).format("DD/MM/YYYY"))
    };

    const onChangeNomFormation = (e) => {
        setNomFormation(e.target.value)
    }

    const onChangeNom = (e) => {
        setNom(e.target.value)
    }

    const onChangePrenom = (e) => {
        setPrenom(e.target.value)
    }

    const onClickPDF = (e) => {
        setShowPDF(true)
    }

    const verifPDF = () => {
        if(nom === "" || prenom === ""  || nomFormation === "" ||dateDebut === "" || dateFin === ""){
            return 0
        }else {
            return 1
        }
    }

    return (
        <div className="row" >
            <div className="col-lg-12 col-md-12">
                <div className="row" style={{ paddingTop: "30px", width: "99%", backgroundColor: "#FAFAFA", margin: "auto", boxShadow: "0px 0px 1px" }}>
                    <div className="col-lg-4 col-md-4">
                        <div className="input-group mb-3 " >
                            <div className="input-group-prepend">
                                <label style={{ width: 100 }} className="input-group-text" >Formation </label>
                            </div>
                            <TextField onChange={onChangeNomFormation} style={{ width: 200 , backgroundColor : "white" }} size="small" label="Formation" variant="outlined" />
                        </div>
                    </div>

                    <div className="col-lg-4 col-md-4">
                        <div className="input-group mb-3 " >
                            <div className="input-group-prepend">
                                <label style={{ width: 100 }} className="input-group-text" >Du </label>
                            </div>
                            <MuiPickersUtilsProvider locale={fr} utils={DateFnsUtils}>

                                <KeyboardDatePicker
                                    size="small"
                                    autoOk
                                    disableToolbar
                                    disablePast
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

                    <div className="col-lg-4 col-md-4">
                        <div className="input-group mb-3 " >
                            <div className="input-group-prepend">
                                <label style={{ width: 100 }} className="input-group-text" >Au </label>
                            </div>
                            <MuiPickersUtilsProvider locale={fr} utils={DateFnsUtils}>

                                <KeyboardDatePicker
                                    size="small"
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

                    <div className="col-lg-4 col-md-4">
                        <div className="input-group mb-3 " >
                            <div className="input-group-prepend">
                                <label style={{ width: 100 }} className="input-group-text" >Nom </label>
                            </div>
                            <TextField onChange={onChangeNom} style={{ width: 200 , backgroundColor : "white" }} size="small" label="Nom" variant="outlined" />
                        </div>
                    </div>

                    <div className="col-lg-4 col-md-4">
                        <div className="input-group mb-3 " >
                            <div className="input-group-prepend">
                                <label style={{ width: 100 }} className="input-group-text" >Prenom </label>
                            </div>
                            <TextField onChange={onChangePrenom}  style={{ width: 200 , backgroundColor : "white" }} size="small" label="Prenom" variant="outlined" />
                        </div>
                    </div>

                    <div className="col-lg-4 col-md-4">
                     
                    </div>

                    <div className="col-lg-4 col-md-4">
                        <Button disabled = {verifPDF() === 0 ? true : false} onClick={onClickPDF} className={classes.buttonStyles} size="small" variant="outlined" >
                            Valider
                        </Button>
                    </div>
                </div>

                <div hidden={showPDF === true ? false : true } className="row" style={{  paddingTop: "30px", width: "99%", backgroundColor: "#FAFAFA", margin: " 20px auto", boxShadow: "0px 0px 1px" }}>

                    <div className="col-lg-12 col-md-12">
                        <PDFViewer style={{ width: "100%", height: "200mm", marginTop: "30px" }}>
                            <Document title="Convocation">
                                <Page size="A4" style={styles.page} >
                                    <View style={styles.sectionHeader}>
                                        <View style={styles.infos}>
                                            <View style={styles.infosLabel}>
                                                <Text>Convocation</Text>
                                            </View>
                                        </View>
                                        <View style={styles.logo}>
                                            <Image style={styles.logoImg} source={logo} />
                                        </View>
                                    </View>

                                    <View style={styles.sectionBody}>
                                        <Text style={styles.collaborateur}>{nom} {prenom}</Text>
                                        <Text style={styles.corp}>Vous etes convoqué à la session de formation intitulé</Text>
                                        <Text style={styles.formationNom}>{nomFormation}</Text>
                                        <Text style={styles.date}>Du {dateDebut} Au {dateFin}</Text>
                                        <Text style={styles.soprahr}>SOPRA HR SOFTWARE</Text>
                                        <Text style={styles.adresse}>Rue du Lac de Constance, Tunis</Text>
                                        <Text style={styles.cordialement}>Veuillez recevoir, l'expression de nos sincères salutations.</Text>
                                        
                                    </View>
                                </Page>
                            </Document>
                        </PDFViewer>
                    </div>

                </div>
            </div>
        </div>
    );
}
