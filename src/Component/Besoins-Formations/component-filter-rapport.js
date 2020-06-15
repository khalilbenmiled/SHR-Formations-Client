import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import MuiExpansionPanel from '@material-ui/core/ExpansionPanel';
import MuiExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import MuiExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import axios from 'axios';
import querystring from 'querystring'
import { Button } from '@material-ui/core';
import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';
import { PDFViewer } from '@react-pdf/renderer';
import "./besoins.css"
import logo from "../../images/logo.png"
import Moment from 'moment';
import 'moment/locale/fr'

const ExpansionPanel = withStyles({
  root: {
    overflowY: "hidden",
    border: '1px solid rgba(0, 0, 0, .125)',
    boxShadow: 'none',
    '&:not(:last-child)': {
      borderBottom: 0,
    },
    '&:before': {
      display: 'none',
    },
    '&$expanded': {
      margin: 'auto',
    },
  },
  expanded: {},
})(MuiExpansionPanel);

const ExpansionPanelSummary = withStyles({
  root: {
    overflowY: "hidden",
    backgroundColor: 'rgba(0, 0, 0, .03)',
    borderBottom: '1px solid rgba(0, 0, 0, .125)',
    marginBottom: -1,
    minHeight: 40,
    '&$expanded': {
      minHeight: 40,
      overflowY: "hidden"
    },
  },
  content: {
    '&$expanded': {
      margin: '12px 0',
    },
  },
  expanded: {},

})(MuiExpansionPanelSummary);

const ExpansionPanelDetails = withStyles(theme => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiExpansionPanelDetails);

export default function CustomizedExpansionPanels(props) {

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
      borderBottomWidth: 1,
      borderBottomColor: '#B51B10',
      borderBottomStyle: 'solid',
      color: "black",
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
      paddingTop: "30px",
      paddingLeft : "10px" , 
      width: "65%",
      flexDirection: 'row',
    },
    infosLabel : {
      fontSize: 12,
      fontWeight: "900px",
      width: "25%",
    
    },
    infosData : {
      width: "75%",
      fontSize: 11,
  
    },
    logo: {
      width: "35%",
      
    },
    logoImg: {
      width: "200px",
      height: "100px"
    },
    sectionBody: {
      margin: 10,
      padding: 10,
      height: "95%",
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
  const [expanded, setExpanded] = React.useState('panel1');
  const [themeNoms, setThemeNoms] = React.useState(props.themes);

  const [typeSelected, setTypeSelected] = React.useState("");
  const [themeSelected, setThemeSelected] = React.useState("");
  const [quarterSelected, setQuarterSelected] = React.useState(0);
  const [projetSelected, setProjetSelected] = React.useState("");
  const [TlSelected, setTlSelected] = React.useState("");
  const [MgSelected, setMgSelected] = React.useState("");
  const [BUSelected, setBUSelected] = React.useState("");

  const handleChange = panel => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };
  const typeTheme = [
    { title: "TECHNIQUE" },
    { title: "SOFTSKILLS" },
    { title: "SOFTWARE" }
  ]

  const quarter = [
    { title: "Q1" },
    { title: "Q2" },
    { title: "Q3" },
    { title: "Q4" }
  ]

  const TLMG = [
    { title: "Valider" },
    { title: "En attente" }
  ]

  const BU = [
    { title: "Prodops" },
    { title: "CS" },
    { title: "RD" }
  ]




  const onTypeSelect = (e, values) => {
    if (values != null) {
      setTypeSelected(values.title)
      const typeFormation = {
        type: values.title
      }
      axios.post(process.env.REACT_APP_PROXY_SessionsFormations+"/themes/type",
        querystring.stringify(typeFormation), {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(res => {
        setThemeNoms(res.data.Theme)
      })
    } else {
      setTypeSelected("")
      setThemeNoms(props.themes)
    }
  }

  const onThemeSelect = (e, values) => {
    if (values != null) {
      setThemeSelected(values.nom)
    } else {
      setThemeSelected("")
    }
  }

  const onQuarterSelect = (e, values) => {
    if (values != null) {
      setQuarterSelected(values.title === "Q1" ? "1" : values.title === "Q2" ? "2" : values.title === "Q3" ? "3" : values.title === "Q4" ? "4" : 0);
    } else {
      setQuarterSelected(0)
    }
  }

  const onProjetSelect = (e, values) => {
    if (values != null) {
      setProjetSelected(values.id)
    } else {
      setProjetSelected("")
    }
  }

  const onTlSelect = (e, values) => {
    if (values != null) {
      setTlSelected(values.title === "Valider" ? true : values.title === "En attente" ? false : "");
    } else {
      setTlSelected("")
    }
  }

  const onMgSelect = (e, values) => {
    if (values != null) {
      setMgSelected(values.title === "Valider" ? true : values.title === "En attente" ? false : "");
    } else {
      setMgSelected("")
    }
  }

  const onBUSelect = (e, values) => {
    if (values != null) {
      setBUSelected(values.title)
    } else {
      setBUSelected("")
    }
  }

  const filter = () => {
    props.filter(typeSelected, themeSelected, quarterSelected, projetSelected, TlSelected, MgSelected, BUSelected)

  }

  const getDate = () => {
    Moment.locale("fr");
    var now_date = Moment().format("DD-MM-YYYY")
    return now_date
  }


  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-lg-12 col-md-12">
          <div style={{ width: "90%", marginLeft: "50px", overflowX: "hidden", boxShadow: "0px 0px 20px 0px whitesmoke" }}>
            <ExpansionPanel square expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
              <ExpansionPanelSummary style={{ backgroundColor: "rgba(248,178,49,0.8)", height: "0px" }} aria-controls="panel1d-content" id="panel1d-header" expandIcon={<ExpandMoreIcon style={{ color: "#B51B10" }} />}>
                <Typography style={{ color: "#B51B10", fontWeight: "600", fontSize: "18px" }}>Filter</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails style={{ display: "flex", flexDirection: "column", border: "1px solid #F5F5F5", borderBottom: "3px solid #F8B231" }}>

                <div className="row" style={{ marginBottom: "20px" }}>
                  <div className="col-lg-4 col-md-4">
                    <Autocomplete
                      onChange={onTypeSelect}
                      disableCloseOnSelect={false}
                      size="small"
                      options={typeTheme}
                      getOptionLabel={option => option.title}
                      style={{ width: 220 }}
                      renderInput={params => <TextField {...params} label="Type theme" variant="outlined" />}
                    />
                  </div>

                  <div className="col-lg-4 col-md-4">
                    <Autocomplete
                      onChange={onThemeSelect}
                      size="small"
                      options={themeNoms}
                      getOptionLabel={option => option.nom}
                      style={{ width: 220 }}
                      renderInput={params => <TextField {...params} label="Nom theme" variant="outlined" />}
                    />
                  </div>

                  <div className="col-lg-4 col-md-4">
                    <Autocomplete
                      onChange={onQuarterSelect}
                      size="small"
                      options={quarter}
                      getOptionLabel={option => option.title}
                      style={{ width: 220 }}
                      renderInput={params => <TextField {...params} label="Trimester" variant="outlined" />}
                    />
                  </div>
                </div>
                <div className="row" >
                  <div className="col-lg-4 col-md-4">
                    <Autocomplete
                      size="small"
                      onChange={onProjetSelect}
                      options={props.projets}
                      getOptionLabel={option => option.nom}
                      style={{ width: 220 }}
                      renderInput={params => <TextField {...params} label="Projet" variant="outlined" />}
                    />
                  </div>

                  <div hidden={JSON.parse(localStorage.user).role === "MANAGER" ? true : false} className="col-lg-4 col-md-4">
                    <Autocomplete

                      size="small"
                      onChange={onTlSelect}
                      options={TLMG}
                      getOptionLabel={option => option.title}
                      style={{ width: 220 }}
                      renderInput={params => <TextField {...params} label="Team Lead" variant="outlined" />}
                    />
                  </div>

                  <div className="col-lg-4 col-md-4">
                    <Autocomplete
                      onChange={onMgSelect}
                      size="small"
                      options={TLMG}
                      getOptionLabel={option => option.title}
                      style={{ width: 220 }}
                      renderInput={params => <TextField {...params} label="Manager" variant="outlined" />}
                    />
                  </div>

                </div>

                <div hidden={JSON.parse(localStorage.user).role !== "SERVICEFORMATIONS" ? true : false} className="row" style={{ marginTop: "20px" }}>
                  <div className="col-lg-4 col-md-4">
                    <Autocomplete
                      onChange={onBUSelect}
                      size="small"
                      options={BU}
                      getOptionLabel={option => option.title}
                      style={{ width: 220 }}
                      renderInput={params => <TextField {...params} label="BU" variant="outlined" />}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-12" >
                    <Button size="small" style={{ marginTop: "20px", backgroundColor: "#B51B10", color: "white", "&:focus": { outline: "none" }, width: "200px" }} onClick={filter}>Filter</Button>
                  </div>
                </div>
              </ExpansionPanelDetails>
            </ExpansionPanel>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-12 col-md-12">
          <PDFViewer style={{ width: "100%", height: "200mm", marginTop: "30px" }}>
            <Document title="Rapport besoins">
              <Page size="A4" style={styles.page}>
                <View style={styles.sectionHeader}>
                  <View style={styles.infos}>
                    <View style={styles.infosLabel}>
                      <Text>Nom et Prenom : </Text>
                      <Text>Email : </Text>
                      <Text>BU : </Text>
                      <Text>Date : </Text>
                    </View>
                    <View style={styles.infosData}>
                      <Text>{JSON.parse(localStorage.user).nom} {JSON.parse(localStorage.user).prenom}</Text>
                      <Text> {JSON.parse(localStorage.user).email} </Text>
                      <Text> {JSON.parse(localStorage.user).bu}</Text>
                      <Text> {getDate()}</Text>
                    </View>
                  </View>
                  <View style={styles.logo}>
                    <Image style={styles.logoImg} src={logo} />
                  </View>
                </View>

                <View style={styles.title}>
                  <Text style={styles.titleText}>BESOINS DE FORMATIONS</Text>
                </View>

                <View style={styles.table}>
                  <View style={styles.tableRowHeader}>
                    <View style={styles.tableColHeader}>
                      <Text style={styles.tableCellHeader}>Action</Text>
                    </View>
                    <View style={styles.tableColHeader}>
                      <Text style={styles.tableCellHeader}>Type</Text>
                    </View>
                    <View style={styles.tableCol1Header}>
                      <Text style={styles.tableCellHeader}>Modules</Text>
                    </View>
                    <View style={styles.tableColHeader}>
                      <Text style={styles.tableCellHeader}>Nombre Prévus</Text>
                    </View>
                    <View style={styles.tableColHeader}>
                      <Text style={styles.tableCellHeader}>Quarter</Text>
                    </View>

                  </View>

                  {props.rapports.map((rapport, index) => (

                    <View style={styles.tableRow} key={index}>

                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>{rapport.theme}</Text>
                      </View>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>{rapport.besoins[0].theme.type}</Text>
                      </View>
                      <View style={styles.tableCol1}>
                        {rapport.listModules.map((module, i) => (
                          <Text key={i} style={styles.tableCell}> - {module.nom} : {module.description}</Text>
                        ))}
                      </View>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>{rapport.nbrPrevu}</Text>
                      </View>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>{rapport.quarter}</Text>
                      </View>
                    </View>

                  ))}
                </View>
              </Page>
            </Document>
          </PDFViewer>
        </div>
      </div>
    </div>


  );
}
