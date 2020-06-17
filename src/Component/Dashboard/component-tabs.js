import React from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import ComponentBarChart from "./component-barChart"
import Autocomplete from '@material-ui/lab/Autocomplete';
import { TextField } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import axios from "axios"
import querystring from 'querystring'
import ComponentPieChart from "./component-pieChart"
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import LocalLibraryIcon from '@material-ui/icons/LocalLibrary';
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


function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <Typography
            component="div"
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            {value === index && <Box p={3}>{children}</Box>}
        </Typography>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};



const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor: theme.palette.background.paper,
        width: '100%',

    },
    rootCard: {
        boxShadow: "0px 0px 3px",
        margin: "8px 0"
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
    buttonDetails: {
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
    buttonPublier: {
        cursor: "pointer",
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

export default function FullWidthTabs(props) {

    const classes = useStyles();
    const theme = useTheme();
    const [value, setValue] = React.useState(0);
    const [dataBesoins, setDataBesoins] = React.useState([]);
    const [dataFormations, setDataFormations] = React.useState([]);
    const [dataTypeTheme, setDataTypeTheme] = React.useState([]);
    const [dataProjet, setDataProjet] = React.useState([]);

    const [buSelected, setBuSelected] = React.useState("");
    const [quarterSelected, setQuarterSelected] = React.useState(0);
    const [anneeSelected, setAnneeSelected] = React.useState(0);
    const [themeSelected, setThemeSelected] = React.useState("");

    const [themeFormationSelected, setThemeFormationSelected] = React.useState("");
    const [selectedDateDebut, setSelectedDateDebut] = React.useState(null);
    const [selectedDateFin, setSelectedDateFin] = React.useState(null);
    const [typeFormation, setTypeFormation] = React.useState("");
    const [listFormations, setListFormations] = React.useState([]);
    const [dataRatingFormation, setDataRatingFormation] = React.useState([]);



    const bu = [
        { title: "CS" },
        { title: "Prodops" },
        { title: "RD" },
    ]

    const trimester = [
        { title: "Trimestre 1", value: 1 },
        { title: "Trimestre 2", value: 2 },
        { title: "Trimestre 3", value: 3 },
        { title: "Trimestre 4", value: 4 }
    ]

    const typeTheme = [
        { title: "TECHNIQUE", value: "TECHNIQUE" },
        { title: "PRODUIT", value: "SOFTWARE" },
        { title: "SOFTSKILLS", value: "SOFTSKILLS" }
    ]

    React.useEffect(() => {
        axios.get(process.env.REACT_APP_PROXY_SessionsFormations + "/formations").then(res => {
            if (res.data.Formations) {
                const tabs = []
                res.data.Formations.map(formation => {
                    var dateDebut = new Date(formation.dateDebut)
                    var dateFin = new Date(formation.dateFin)
                    Moment.locale("fr");
                    tabs.push({
                        id: formation.id,
                        nomTheme: formation.nomTheme,
                        typeTheme: formation.typeTheme,
                        dateDebut: Moment(dateDebut).format("DD-MM-YYYY").toString(),
                        dateFin: Moment(dateFin).format("DD-MM-YYYY").toString(),
                        listModules: formation.listModules,
                        listParticipants: formation.listParticipants,
                        maxParticipants: formation.maxParticipants,
                        duree: formation.duree,
                        idCF: formation.idCF,
                        etat: formation.etat

                    })
                    return null
                })
                setListFormations(tabs)
            }
        })
        if (JSON.parse(localStorage.user).role === "SERVICEFORMATIONS") {
            const inputBesoin = {
                bu: "",
                theme: "",
                quarter: 0,
                annee : 0
            }
            filterBesoins(inputBesoin)

            const inputFormation = {
                theme: "",
                type: "",
                dateDebut: "",
                dateFin: "",
            }
            filterFormations(inputFormation)

        } else {
            const inputBesoin = {
                bu: "",
                theme: "",
                quarter: 0,
                annee : 0,
                id: JSON.parse(localStorage.user).id
            }
            filterBesoins(inputBesoin)

            const inputFormation = {
                theme: "",
                type: "",
                dateDebut: "",
                dateFin: "",
                id: JSON.parse(localStorage.user).id
            }
            filterFormations(inputFormation)
        }

        const inputTypeTheme = {
            type: ""
        }
        filterTypeTheme(inputTypeTheme)

        const inputProjet = {
            projet: ""
        }
        filterProjet(inputProjet)

    }, [])

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleChangeIndex = index => {
        setValue(index);
    };

    const onChangeTypeThemeBesoin = (e, value) => {
        if (value != null) {
            const input = {
                type: value.value
            }
            filterTypeTheme(input)
        } else {
            const input = {
                type: ""
            }
            filterTypeTheme(input)
        }
    }

    const onChangeTrimesterBesoin = (e, value) => {
        if (value != null) {
            setQuarterSelected(value.value)
            const input = {
                bu: buSelected,
                quarter: value.value,
                theme: themeSelected,
                annee : anneeSelected
            }
            filterBesoins(input)
        } else {
            setQuarterSelected(0)
            const input = {
                bu: buSelected,
                quarter: 0,
                theme: themeSelected,
                annee : anneeSelected
            }
            filterBesoins(input)
        }

    }

    const onChangeAnnee = (e,value) => {
        if(value !== null){
            setAnneeSelected(value)
            const input = {
                theme : themeSelected,
                quarter : quarterSelected,
                bu : buSelected,
                annee : value
            }
            filterBesoins(input)
        }else {
            setAnneeSelected(0)
            const input = {
                annee : 0,
                bu : buSelected,
                quarter : quarterSelected,
                theme : themeSelected
            }
            filterBesoins(input)
        }
    }

    const onChangeThemeBesoin = (e, value) => {

        if (value !== null) {
            setThemeSelected(value.nom)
            const input = {
                theme: value.nom,
                quarter: quarterSelected,
                bu: buSelected,
                annee : anneeSelected
            }
            filterBesoins(input)
        } else {
            setThemeSelected("")
            const input = {
                theme: "",
                quarter: quarterSelected,
                bu: buSelected,
                annee : anneeSelected
            }
            filterBesoins(input)
        }


    }


    const onChangeBuBesoin = (e, value) => {

        if (value !== null) {
            setBuSelected(value.title)
            const input = {
                bu: value.title,
                quarter: quarterSelected,
                theme: themeSelected,
                annee : anneeSelected
            }
            filterBesoins(input)
        } else {
            setBuSelected("")
            const input = {
                bu: "",
                quarter: quarterSelected,
                theme: themeSelected,
                annee : anneeSelected
            }
            filterBesoins(input)
        }


    }

    const onChangeThemeFormation = (e, value) => {
        if (value != null) {
            setThemeFormationSelected(value.nom)
            const input = {
                theme: value.nom,
                type: typeFormation,
                dateDebut: selectedDateDebut,
                dateFin: selectedDateFin
            }
            filterFormations(input)
        } else {
            setThemeFormationSelected("")
            const input = {
                theme: "",
                type: typeFormation,
                dateDebut: selectedDateDebut,
                dateFin: selectedDateFin
            }
            filterFormations(input)
        }
    }

    const handleDateDebutChange = (date) => {
        if (date != null) {
            Moment.locale("fr");
            setSelectedDateDebut(Moment(date).format("YYYY-MM-DD"));
            const input = {
                dateDebut: Moment(date).format("YYYY-MM-DD"),
                dateFin: selectedDateFin,
                theme: themeFormationSelected,
                type: typeFormation
            }
            filterFormations(input)
        } else {
            setSelectedDateDebut(null);
            const input = {
                dateDebut: "",
                dateFin: selectedDateFin,
                theme: themeFormationSelected,
                type: typeFormation
            }
            filterFormations(input)
        }

    };

    const handleDateFinChange = (date) => {
        if (date != null) {
            Moment.locale("fr");
            setSelectedDateFin(Moment(date).format("YYYY-MM-DD"));
            const input = {
                theme: themeFormationSelected,
                type: typeFormation,
                dateDebut: selectedDateDebut,
                dateFin: Moment(date).format("YYYY-MM-DD")
            }
            filterFormations(input)
        } else {
            setSelectedDateFin(null);
            const input = {
                theme: themeFormationSelected,
                type: typeFormation,
                dateDebut: selectedDateDebut,
                dateFin: ""
            }
            filterFormations(input)
        }

    };

    const onChangeTypeFormation = (e, value) => {
        if (value != null) {
            setTypeFormation(value.value)
            const input = {
                theme: themeFormationSelected,
                type: value.value,
                dateDebut: selectedDateDebut,
                dateFin: selectedDateFin
            }
            filterFormations(input)
        } else {
            const input = {
                theme: themeFormationSelected,
                type: "",
                dateDebut: selectedDateDebut,
                dateFin: selectedDateFin
            }
            filterFormations(input)
        }
    }

    const onChangeProjetBesoin = (e, value) => {
        if (value != null) {
            const input = {
                projet: value.nom
            }
            filterProjet(input)
        } else {
            const input = {
                projet: ""
            }
            filterProjet(input)
        }
    }

    const filterBesoins = (input) => {
 
        if (JSON.parse(localStorage.user).role === "SERVICEFORMATIONS") {

            axios.post(process.env.REACT_APP_PROXY_Besoins + "/besoins/reporting/byFilter", querystring.stringify(input), {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            }).then(res => {
                if (res.data.Results) {

                    var NomArray = Object.keys(res.data.Results)

                    const tabsNom = []
                    const tabsDataAll = []
                    const tabsDataPlanifier = []
                    const tabsDataNonPlanifier = []
                    NomArray.map((key, index) => {
                        tabsNom.push(key)
                        tabsDataAll.push(res.data.Results[key].Results.length)
                        tabsDataPlanifier.push(res.data.Results[key].ResultsPlanifier === null ? 0 : res.data.Results[key].ResultsPlanifier.length)
                        tabsDataNonPlanifier.push(res.data.Results[key].ResultsNonPlanifier === null ? 0 : res.data.Results[key].ResultsNonPlanifier.length)
                        return null
                    })

                    const data = {
                        labels: tabsNom,
                        datasets: [
                            {
                                label: 'Besoins demandés',
                                backgroundColor: 'rgba(237,126,10,0.8)',
                                borderColor: 'rgba(237,126,132,1)',
                                borderWidth: 1,
                                hoverBackgroundColor: 'rgba(237,126,10,1)',
                                hoverBorderColor: 'rgba(237,126,10,1)',
                                data: tabsDataAll
                            },
                            {
                                label: 'Besoins Planifiés',
                                backgroundColor: 'rgba(2,119,150,0.8)',
                                borderColor: 'rgba(2,119,150,1)',
                                borderWidth: 1,
                                hoverBackgroundColor: 'rgba(2,119,150,1)',
                                hoverBorderColor: 'rgba(2,119,150,1)',
                                data: tabsDataPlanifier
                            },
                            {
                                label: 'Besoins Non Planifié',
                                backgroundColor: 'rgba(181, 27, 16, 0.8)',
                                borderColor: 'rgba(181, 27, 16, 1)',
                                borderWidth: 1,
                                hoverBackgroundColor: 'rgba(181, 27, 16, 1)',
                                hoverBorderColor: 'rgba(181, 27, 16, 1)',

                                data: tabsDataNonPlanifier
                            },
                        ]
                    };

                    setDataBesoins(data)

                }
            })
        } else if (JSON.parse(localStorage.user).role === "COLLABORATEUR") {
            console.log(input)
            const obj = {
                bu: input.bu,
                quarter: input.quarter,
                theme: input.theme,
                annee : input.annee,
                id: JSON.parse(localStorage.user).id
            }
            axios.post(process.env.REACT_APP_PROXY_Besoins + "/besoins/reporting/byFilterCollaborateur", querystring.stringify(obj), {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            }).then(res => {
                if (res.data.Results) {

                    var NomArray = Object.keys(res.data.Results)

                    const tabsNom = []
                    const tabsDataAll = []
                    const tabsDataPlanifier = []
                    const tabsDataNonPlanifier = []
                    NomArray.map((key, index) => {
                        tabsNom.push(key)
                        tabsDataAll.push(res.data.Results[key].Results.length)
                        tabsDataPlanifier.push(res.data.Results[key].ResultsPlanifier === null ? 0 : res.data.Results[key].ResultsPlanifier.length)
                        tabsDataNonPlanifier.push(res.data.Results[key].ResultsNonPlanifier === null ? 0 : res.data.Results[key].ResultsNonPlanifier.length)
                        return null
                    })

                    const data = {
                        labels: tabsNom,
                        datasets: [
                            {
                                label: 'Besoins demandés',
                                backgroundColor: 'rgba(237,126,10,0.8)',
                                borderColor: 'rgba(237,126,132,1)',
                                borderWidth: 1,
                                hoverBackgroundColor: 'rgba(237,126,10,1)',
                                hoverBorderColor: 'rgba(237,126,10,1)',
                                data: tabsDataAll
                            },
                            {
                                label: 'Besoins Planifiés',
                                backgroundColor: 'rgba(2,119,150,0.8)',
                                borderColor: 'rgba(2,119,150,1)',
                                borderWidth: 1,
                                hoverBackgroundColor: 'rgba(2,119,150,1)',
                                hoverBorderColor: 'rgba(2,119,150,1)',
                                data: tabsDataPlanifier
                            },
                            {
                                label: 'Besoins Non Planifié',
                                backgroundColor: 'rgba(181, 27, 16, 0.8)',
                                borderColor: 'rgba(181, 27, 16, 1)',
                                borderWidth: 1,
                                hoverBackgroundColor: 'rgba(181, 27, 16, 1)',
                                hoverBorderColor: 'rgba(181, 27, 16, 1)',

                                data: tabsDataNonPlanifier
                            },
                        ]
                    };

                    setDataBesoins(data)

                }
            })
        } else if (JSON.parse(localStorage.user).role === "TEAMLEAD") {

            const obj = {
                bu: input.bu,
                quarter: input.quarter,
                theme: input.theme,
                annee : input.annee,
                id: JSON.parse(localStorage.user).id
            }
            axios.post(process.env.REACT_APP_PROXY_Besoins + "/besoins/reporting/byFilterTeamLead", querystring.stringify(obj), {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            }).then(res => {

                if (res.data.Results) {

                    var NomArray = Object.keys(res.data.Results)

                    const tabsNom = []
                    const tabsDataAll = []
                    const tabsDataPlanifier = []
                    const tabsDataNonPlanifier = []
                    NomArray.map((key, index) => {
                        tabsNom.push(key)
                        tabsDataAll.push(res.data.Results[key].Results.length)
                        tabsDataPlanifier.push(res.data.Results[key].ResultsPlanifier === null ? 0 : res.data.Results[key].ResultsPlanifier.length)
                        tabsDataNonPlanifier.push(res.data.Results[key].ResultsNonPlanifier === null ? 0 : res.data.Results[key].ResultsNonPlanifier.length)
                        return null
                    })

                    const data = {
                        labels: tabsNom,
                        datasets: [
                            {
                                label: 'Besoins demandés',
                                backgroundColor: 'rgba(237,126,10,0.8)',
                                borderColor: 'rgba(237,126,132,1)',
                                borderWidth: 1,
                                hoverBackgroundColor: 'rgba(237,126,10,1)',
                                hoverBorderColor: 'rgba(237,126,10,1)',
                                data: tabsDataAll
                            },
                            {
                                label: 'Besoins Planifiés',
                                backgroundColor: 'rgba(2,119,150,0.8)',
                                borderColor: 'rgba(2,119,150,1)',
                                borderWidth: 1,
                                hoverBackgroundColor: 'rgba(2,119,150,1)',
                                hoverBorderColor: 'rgba(2,119,150,1)',
                                data: tabsDataPlanifier
                            },
                            {
                                label: 'Besoins Non Planifié',
                                backgroundColor: 'rgba(181, 27, 16, 0.8)',
                                borderColor: 'rgba(181, 27, 16, 1)',
                                borderWidth: 1,
                                hoverBackgroundColor: 'rgba(181, 27, 16, 1)',
                                hoverBorderColor: 'rgba(181, 27, 16, 1)',

                                data: tabsDataNonPlanifier
                            },
                        ]
                    };

                    setDataBesoins(data)

                }
            })
        } else {
            const obj = {
                bu: input.bu,
                quarter: input.quarter,
                theme: input.theme,
                annee: input.annee,
                id: JSON.parse(localStorage.user).id
            }
            axios.post(process.env.REACT_APP_PROXY_Besoins + "/besoins/reporting/byFilterManager", querystring.stringify(obj), {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            }).then(res => {

                if (res.data.Results) {

                    var NomArray = Object.keys(res.data.Results)

                    const tabsNom = []
                    const tabsDataAll = []
                    const tabsDataPlanifier = []
                    const tabsDataNonPlanifier = []
                    NomArray.map((key, index) => {
                        tabsNom.push(key)
                        tabsDataAll.push(res.data.Results[key].Results.length)
                        tabsDataPlanifier.push(res.data.Results[key].ResultsPlanifier === null ? 0 : res.data.Results[key].ResultsPlanifier.length)
                        tabsDataNonPlanifier.push(res.data.Results[key].ResultsNonPlanifier === null ? 0 : res.data.Results[key].ResultsNonPlanifier.length)
                        return null
                    })

                    const data = {
                        labels: tabsNom,
                        datasets: [
                            {
                                label: 'Besoins demandés',
                                backgroundColor: 'rgba(237,126,10,0.8)',
                                borderColor: 'rgba(237,126,132,1)',
                                borderWidth: 1,
                                hoverBackgroundColor: 'rgba(237,126,10,1)',
                                hoverBorderColor: 'rgba(237,126,10,1)',
                                data: tabsDataAll
                            },
                            {
                                label: 'Besoins Planifiés',
                                backgroundColor: 'rgba(2,119,150,0.8)',
                                borderColor: 'rgba(2,119,150,1)',
                                borderWidth: 1,
                                hoverBackgroundColor: 'rgba(2,119,150,1)',
                                hoverBorderColor: 'rgba(2,119,150,1)',
                                data: tabsDataPlanifier
                            },
                            {
                                label: 'Besoins Non Planifié',
                                backgroundColor: 'rgba(181, 27, 16, 0.8)',
                                borderColor: 'rgba(181, 27, 16, 1)',
                                borderWidth: 1,
                                hoverBackgroundColor: 'rgba(181, 27, 16, 1)',
                                hoverBorderColor: 'rgba(181, 27, 16, 1)',

                                data: tabsDataNonPlanifier
                            },
                        ]
                    };

                    setDataBesoins(data)

                }
            })
        }

    }

    const filterFormations = (input) => {

        if (JSON.parse(localStorage.user).role === "SERVICEFORMATIONS") {
            axios.post(process.env.REACT_APP_PROXY_SessionsFormations + "/formations/reporting/etat", querystring.stringify(input), {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            }).then(res => {
                if (res.data.Results) {
                    var NomArray = Object.keys(res.data.Results)
                    const tabsNom = []
                    const tabsDataAll = []
                    const tabsDataEnCours = []
                    const tabsDataProgrammer = []
                    const tabsDataTerminer = []

                    NomArray.map((key, index) => {
                        tabsNom.push(key)
                        tabsDataAll.push(res.data.Results[key].All.length)
                        tabsDataEnCours.push(res.data.Results[key].EnCours === null ? 0 : res.data.Results[key].EnCours.length)
                        tabsDataProgrammer.push(res.data.Results[key].Programmé === null ? 0 : res.data.Results[key].Programmé.length)
                        tabsDataTerminer.push(res.data.Results[key].Terminer === null ? 0 : res.data.Results[key].Terminer.length)
                        return null
                    })

                    const data = {
                        labels: tabsNom,
                        datasets: [
                            {
                                label: 'Tous les formations',
                                backgroundColor: 'rgba(237,126,10,0.8)',
                                borderColor: 'rgba(237,126,132,1)',
                                borderWidth: 1,
                                hoverBackgroundColor: 'rgba(237,126,10,1)',
                                hoverBorderColor: 'rgba(237,126,10,1)',
                                data: tabsDataAll
                            },
                            {
                                label: 'Formation en cours',
                                backgroundColor: 'rgba(2,119,150,0.8)',
                                borderColor: 'rgba(2,119,150,1)',
                                borderWidth: 1,
                                hoverBackgroundColor: 'rgba(2,119,150,1)',
                                hoverBorderColor: 'rgba(2,119,150,1)',
                                data: tabsDataEnCours
                            },
                            {
                                label: 'Formation programmée',
                                backgroundColor: 'rgba(181, 27, 16, 0.8)',
                                borderColor: 'rgba(181, 27, 16, 1)',
                                borderWidth: 1,
                                hoverBackgroundColor: 'rgba(181, 27, 16, 1)',
                                hoverBorderColor: 'rgba(181, 27, 16, 1)',

                                data: tabsDataProgrammer
                            },
                            {
                                label: 'Formation terminée',
                                backgroundColor: 'rgba(0, 128, 16, 0.8)',
                                borderColor: 'rgba(0, 128, 16, 1)',
                                borderWidth: 1,
                                hoverBackgroundColor: 'rgba(0, 128, 16, 1)',
                                hoverBorderColor: 'rgba(0, 128, 16, 1)',

                                data: tabsDataTerminer
                            },
                        ]
                    };

                    setDataFormations(data)
                }
            })
        } else if (JSON.parse(localStorage.user).role === "COLLABORATEUR") {
            const obj = {
                theme: input.theme,
                type: input.type,
                dateDebut: input.dataDebut,
                dateFin: input.dateFin,
                id: JSON.parse(localStorage.user).id
            }
            axios.post(process.env.REACT_APP_PROXY_SessionsFormations + "/formations/reporting/etatByCollaborateur", querystring.stringify(obj), {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            }).then(res => {
                if (res.data.Results) {
                    var NomArray = Object.keys(res.data.Results)
                    const tabsNom = []
                    const tabsDataAll = []
                    const tabsDataEnCours = []
                    const tabsDataProgrammer = []
                    const tabsDataTerminer = []

                    NomArray.map((key, index) => {
                        tabsNom.push(key)
                        tabsDataAll.push(res.data.Results[key].All.length)
                        tabsDataEnCours.push(res.data.Results[key].EnCours === null ? 0 : res.data.Results[key].EnCours.length)
                        tabsDataProgrammer.push(res.data.Results[key].Programmé === null ? 0 : res.data.Results[key].Programmé.length)
                        tabsDataTerminer.push(res.data.Results[key].Terminer === null ? 0 : res.data.Results[key].Terminer.length)
                        return null
                    })

                    const data = {
                        labels: tabsNom,
                        datasets: [
                            {
                                label: 'Tous les formations',
                                backgroundColor: 'rgba(237,126,10,0.8)',
                                borderColor: 'rgba(237,126,132,1)',
                                borderWidth: 1,
                                hoverBackgroundColor: 'rgba(237,126,10,1)',
                                hoverBorderColor: 'rgba(237,126,10,1)',
                                data: tabsDataAll
                            },
                            {
                                label: 'Formation en cours',
                                backgroundColor: 'rgba(2,119,150,0.8)',
                                borderColor: 'rgba(2,119,150,1)',
                                borderWidth: 1,
                                hoverBackgroundColor: 'rgba(2,119,150,1)',
                                hoverBorderColor: 'rgba(2,119,150,1)',
                                data: tabsDataEnCours
                            },
                            {
                                label: 'Formation programmée',
                                backgroundColor: 'rgba(181, 27, 16, 0.8)',
                                borderColor: 'rgba(181, 27, 16, 1)',
                                borderWidth: 1,
                                hoverBackgroundColor: 'rgba(181, 27, 16, 1)',
                                hoverBorderColor: 'rgba(181, 27, 16, 1)',

                                data: tabsDataProgrammer
                            },
                            {
                                label: 'Formation terminée',
                                backgroundColor: 'rgba(0, 128, 16, 0.8)',
                                borderColor: 'rgba(0, 128, 16, 1)',
                                borderWidth: 1,
                                hoverBackgroundColor: 'rgba(0, 128, 16, 1)',
                                hoverBorderColor: 'rgba(0, 128, 16, 1)',

                                data: tabsDataTerminer
                            },
                        ]
                    };

                    setDataFormations(data)
                }
            })
        } else if (JSON.parse(localStorage.user).role === "TEAMLEAD") {
            const obj = {
                theme: input.theme,
                type: input.type,
                dateDebut: input.dataDebut,
                dateFin: input.dateFin,
                id: JSON.parse(localStorage.user).id
            }
            axios.post(process.env.REACT_APP_PROXY_SessionsFormations + "/formations/reporting/etatByTL", querystring.stringify(obj), {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            }).then(res => {
                if (res.data.Results) {
                    var NomArray = Object.keys(res.data.Results)
                    const tabsNom = []
                    const tabsDataAll = []
                    const tabsDataEnCours = []
                    const tabsDataProgrammer = []
                    const tabsDataTerminer = []

                    NomArray.map((key, index) => {
                        tabsNom.push(key)
                        tabsDataAll.push(res.data.Results[key].All.length)
                        tabsDataEnCours.push(res.data.Results[key].EnCours === null ? 0 : res.data.Results[key].EnCours.length)
                        tabsDataProgrammer.push(res.data.Results[key].Programmé === null ? 0 : res.data.Results[key].Programmé.length)
                        tabsDataTerminer.push(res.data.Results[key].Terminer === null ? 0 : res.data.Results[key].Terminer.length)
                        return null
                    })

                    const data = {
                        labels: tabsNom,
                        datasets: [
                            {
                                label: 'Tous les formations',
                                backgroundColor: 'rgba(237,126,10,0.8)',
                                borderColor: 'rgba(237,126,132,1)',
                                borderWidth: 1,
                                hoverBackgroundColor: 'rgba(237,126,10,1)',
                                hoverBorderColor: 'rgba(237,126,10,1)',
                                data: tabsDataAll
                            },
                            {
                                label: 'Formation en cours',
                                backgroundColor: 'rgba(2,119,150,0.8)',
                                borderColor: 'rgba(2,119,150,1)',
                                borderWidth: 1,
                                hoverBackgroundColor: 'rgba(2,119,150,1)',
                                hoverBorderColor: 'rgba(2,119,150,1)',
                                data: tabsDataEnCours
                            },
                            {
                                label: 'Formation programmée',
                                backgroundColor: 'rgba(181, 27, 16, 0.8)',
                                borderColor: 'rgba(181, 27, 16, 1)',
                                borderWidth: 1,
                                hoverBackgroundColor: 'rgba(181, 27, 16, 1)',
                                hoverBorderColor: 'rgba(181, 27, 16, 1)',

                                data: tabsDataProgrammer
                            },
                            {
                                label: 'Formation terminée',
                                backgroundColor: 'rgba(0, 128, 16, 0.8)',
                                borderColor: 'rgba(0, 128, 16, 1)',
                                borderWidth: 1,
                                hoverBackgroundColor: 'rgba(0, 128, 16, 1)',
                                hoverBorderColor: 'rgba(0, 128, 16, 1)',

                                data: tabsDataTerminer
                            },
                        ]
                    };

                    setDataFormations(data)
                }
            })
        } else {
            const obj = {
                theme: input.theme,
                type: input.type,
                dateDebut: input.dataDebut,
                dateFin: input.dateFin,
                id: JSON.parse(localStorage.user).id
            }
            axios.post(process.env.REACT_APP_PROXY_SessionsFormations + "/formations/reporting/etatByManager", querystring.stringify(obj), {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            }).then(res => {
                if (res.data.Results) {
                    var NomArray = Object.keys(res.data.Results)
                    const tabsNom = []
                    const tabsDataAll = []
                    const tabsDataEnCours = []
                    const tabsDataProgrammer = []
                    const tabsDataTerminer = []

                    NomArray.map((key, index) => {
                        tabsNom.push(key)
                        tabsDataAll.push(res.data.Results[key].All.length)
                        tabsDataEnCours.push(res.data.Results[key].EnCours === null ? 0 : res.data.Results[key].EnCours.length)
                        tabsDataProgrammer.push(res.data.Results[key].Programmé === null ? 0 : res.data.Results[key].Programmé.length)
                        tabsDataTerminer.push(res.data.Results[key].Terminer === null ? 0 : res.data.Results[key].Terminer.length)
                        return null
                    })

                    const data = {
                        labels: tabsNom,
                        datasets: [
                            {
                                label: 'Tous les formations',
                                backgroundColor: 'rgba(237,126,10,0.8)',
                                borderColor: 'rgba(237,126,132,1)',
                                borderWidth: 1,
                                hoverBackgroundColor: 'rgba(237,126,10,1)',
                                hoverBorderColor: 'rgba(237,126,10,1)',
                                data: tabsDataAll
                            },
                            {
                                label: 'Formation en cours',
                                backgroundColor: 'rgba(2,119,150,0.8)',
                                borderColor: 'rgba(2,119,150,1)',
                                borderWidth: 1,
                                hoverBackgroundColor: 'rgba(2,119,150,1)',
                                hoverBorderColor: 'rgba(2,119,150,1)',
                                data: tabsDataEnCours
                            },
                            {
                                label: 'Formation programmée',
                                backgroundColor: 'rgba(181, 27, 16, 0.8)',
                                borderColor: 'rgba(181, 27, 16, 1)',
                                borderWidth: 1,
                                hoverBackgroundColor: 'rgba(181, 27, 16, 1)',
                                hoverBorderColor: 'rgba(181, 27, 16, 1)',

                                data: tabsDataProgrammer
                            },
                            {
                                label: 'Formation terminée',
                                backgroundColor: 'rgba(0, 128, 16, 0.8)',
                                borderColor: 'rgba(0, 128, 16, 1)',
                                borderWidth: 1,
                                hoverBackgroundColor: 'rgba(0, 128, 16, 1)',
                                hoverBorderColor: 'rgba(0, 128, 16, 1)',

                                data: tabsDataTerminer
                            },
                        ]
                    };

                    setDataFormations(data)
                }
            })
        }

    }

    const filterTypeTheme = (input) => {
        axios.post(process.env.REACT_APP_PROXY_Besoins + "/besoins/reporting/byTypeTheme", querystring.stringify(input), {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        }).then(res => {
            if (res.data.Results) {
                var NomArray = Object.keys(res.data.Results)
                const tabsNom = []
                const tabsData = []

                const tabsColor = []
                NomArray.map((key, index) => {
                    tabsNom.push(key)
                    tabsData.push(res.data.Results[key].All.length)
                    tabsColor.push(res.data.Results[key].Color)
                    return null
                })

                const data = {
                    labels: tabsNom,
                    datasets: [{
                        data: tabsData,
                        backgroundColor: tabsColor,
                    }]
                };

                setDataTypeTheme(data)
            }
        })

    }

    const filterProjet = (input) => {
        axios.post(process.env.REACT_APP_PROXY_Besoins + "/besoins/reporting/byProjet", querystring.stringify(input), {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        }).then(res => {
            if (res.data.Results) {
                var NomArray = Object.keys(res.data.Results)
                const tabsNom = []
                const tabsData = []

                const tabsColor = []
                NomArray.map((key, index) => {
                    tabsNom.push(key)
                    tabsData.push(res.data.Results[key].All.length)
                    tabsColor.push(res.data.Results[key].Color)
                    return null
                })

                const data = {
                    labels: tabsNom,
                    datasets: [{
                        data: tabsData,
                        backgroundColor: tabsColor,
                    }]
                };

                setDataProjet(data)
            }
        })

    }

    const onChangeFormation = (e, value) => {
        if (value != null) {
            const input = {
                id: value.id
            }

            axios.post(process.env.REACT_APP_PROXY_SessionsFormations + "/formations/reporting/rating", querystring.stringify(input), {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            }).then(res => {
                console.log(res.data.Formation.rating)
                if (res.data.Formation.rating != null) {
                    const tabs = []
                    tabs.push(res.data.Formation.rating.star1)
                    tabs.push(res.data.Formation.rating.star2)
                    tabs.push(res.data.Formation.rating.star3)
                    tabs.push(res.data.Formation.rating.star4)
                    tabs.push(res.data.Formation.rating.star5)


                    const data = {
                        labels: ["Mediocre", "Mauvaise", "Passable", "Bonne", "Excellente"],
                        datasets: [{
                            data: tabs,
                            backgroundColor: ["rgba(80, 28, 96, 0.8)", "rgba(181, 27, 16, 0.8)", "rgba(237,126,10,0.8)", "rgba(2,119,150,0.8)", "rgba(0, 128, 16, 0.8)"],
                        }]
                    };
                    setDataRatingFormation(data)
                } else {
                    setDataRatingFormation([])
                }

            })
        } else {
            setDataRatingFormation([])
        }
    }

    function disableWeekends(date) {
        return date.getDay() === 0
    }

    function range (start , date)  {
        const ans = []
        const end = date.getFullYear();
        for (let i = start ; i <= end+10 ; i++){
        
            ans.push(i.toString())
        }
        return ans
    }





    return (
        <div className={classes.root} >
            <AppBar position="static" color="default">
                <Tabs
                    value={value}
                    onChange={handleChange}
                    inkbarstyle={{ background: '#B51B10' }}
                    style={{ color: "#B51B10" }}
                    variant="fullWidth"
                    aria-label="full width tabs example"
                >
                    <Tab style={{ outline: "none" }} label="Besoins" icon={<HelpOutlineIcon />} />
                    <Tab style={{ outline: "none" }} label="Formations" icon={<LocalLibraryIcon />} />



                </Tabs>
            </AppBar>
            <SwipeableViews
                axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                index={value}
                onChangeIndex={handleChangeIndex}
            >

                <TabPanel value={value} index={0} dir={theme.direction} >
                    <div className="row" style={{ marginTop: "10px", padding: "20px 10px", backgroundColor: "#F5F5F5", boxShadow: "0px 0px 2px" }} >
                        <div className="col-lg-12 col-md-12" style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                            <Autocomplete
                                size="small"
                                hidden = {JSON.parse(localStorage.user).role !== "SERVICEFORMATIONS" ? true : false}
                                options={bu}
                                onChange={onChangeBuBesoin}
                                getOptionLabel={(option) => option.title}
                                style={{ backgroundColor: "white", width: 220 }}
                                renderInput={(params) => <TextField {...params} label="BU" variant="outlined" />}
                            />
                            <Autocomplete
                                size="small"
                                options={trimester}
                                onChange={onChangeTrimesterBesoin}
                                getOptionLabel={(option) => option.title}
                                style={{ backgroundColor: "white", width: 220 }}
                                renderInput={(params) => <TextField {...params} label="Trimestre" variant="outlined" />}
                            />
                            <Autocomplete
                                size="small"
                                options={range(2014,new Date())}
                                onChange={onChangeAnnee}
                                getOptionLabel={(option) => option}
                                style={{ backgroundColor: "white", width: 220 }}
                                renderInput={(params) => <TextField {...params} label="Année" variant="outlined" />}
                            />
                            <Autocomplete
                                size="small"
                                options={props.themes}
                                onChange={onChangeThemeBesoin}
                                getOptionLabel={(option) => option.nom}
                                style={{ backgroundColor: "white", width: 220 }}
                                renderInput={(params) => <TextField {...params} label="Theme" variant="outlined" />}
                            />
                        </div>
                    </div>
                    <div className="row" style={{ marginTop: "10px", padding: "20px 20px", backgroundColor: "#F5F5F5", boxShadow: "0px 0px 2px" }}>
                        <div className="col-lg-12 col-md-12">

                            <Card>
                                <ComponentBarChart data={dataBesoins} />
                            </Card>
                        </div>

                    </div>

                    <div hidden={JSON.parse(localStorage.user).role !== "SERVICEFORMATIONS" ? true : false} className="row" style={{ marginTop: "20px" }} >
                        <div className="col-lg-5 col-md-5 offset-lg-1 offset-md-1" style={{ marginRight: "20px", padding: "20px 20px", backgroundColor: "#F5F5F5", boxShadow: "0px 0px 2px" }}>
                            <Autocomplete
                                size="small"
                                options={typeTheme}
                                onChange={onChangeTypeThemeBesoin}
                                getOptionLabel={(option) => option.title}
                                style={{ backgroundColor: "white", width: 200, margin: "10px 100px" }}
                                renderInput={(params) => <TextField {...params} label="Type theme" variant="outlined" />}
                            />
                            <Card>
                                <ComponentPieChart data={dataTypeTheme} />
                            </Card>
                        </div>

                        <div className="col-lg-5 col-md-5" style={{ padding: "20px 20px", backgroundColor: "#F5F5F5", boxShadow: "0px 0px 2px" }}>
                            <Autocomplete
                                size="small"
                                options={props.projets}
                                onChange={onChangeProjetBesoin}
                                getOptionLabel={(option) => option.nom}
                                style={{ backgroundColor: "white", width: 200, margin: "10px 100px" }}
                                renderInput={(params) => <TextField {...params} label="Type projet" variant="outlined" />}
                            />
                            <Card>
                                <ComponentPieChart data={dataProjet} />
                            </Card>
                        </div>

                    </div>

                </TabPanel>

                <TabPanel value={value} index={1} dir={theme.direction}>
                    <div className="row" style={{ marginTop: "10px", padding: "20px 20px", backgroundColor: "#F5F5F5", boxShadow: "0px 0px 2px" }} >
                        <div className="col-lg-12 col-md-12">
                            <div className="row">
                                <div className="col-lg-4 col-md-4">
                                    <Autocomplete
                                        size="small"
                                        options={props.themes}
                                        onChange={onChangeThemeFormation}
                                        getOptionLabel={(option) => option.nom}
                                        style={{ backgroundColor: "white", width: 300 }}
                                        renderInput={(params) => <TextField {...params} label="Theme" variant="outlined" />}
                                    />
                                </div>
                                <div className="col-lg-4 col-md-4">

                                    <MuiPickersUtilsProvider locale={fr} utils={DateFnsUtils}>

                                        <KeyboardDatePicker
                                            size="small"
                                            clearable
                                            autoOk
                                            disableToolbar
                                            shouldDisableDate={disableWeekends}
                                            keyboardIcon={<EventIcon style={{ outline: "none", "&:focus": { outline: "none" } }} />}
                                            inputVariant="outlined"
                                            format="d MMM yyyy"
                                            style={{ backgroundColor: "white" }}
                                            label="Du"
                                            value={selectedDateDebut}
                                            onChange={handleDateDebutChange}
                                            KeyboardButtonProps={{
                                                'aria-label': 'change date',
                                            }}
                                        />

                                    </MuiPickersUtilsProvider>
                                </div>
                                <div className="col-lg-4 col-md-4" >
                                    <MuiPickersUtilsProvider locale={fr} utils={DateFnsUtils}>

                                        <KeyboardDatePicker
                                            size="small"
                                            clearable
                                            autoOk
                                            disableToolbar
                                            shouldDisableDate={disableWeekends}
                                            keyboardIcon={<EventIcon style={{ outline: "none", "&:focus": { outline: "none" } }} />}
                                            inputVariant="outlined"
                                            format="d MMM yyyy"
                                            style={{ backgroundColor: "white" }}
                                            label="Au"
                                            value={selectedDateFin}
                                            onChange={handleDateFinChange}
                                            KeyboardButtonProps={{
                                                'aria-label': 'change date',
                                            }}
                                        />

                                    </MuiPickersUtilsProvider>
                                </div>
                            </div>

                            <div className="row" style={{ marginTop: "10px" }}>
                                <div className="col-lg-4 col-md-4">
                                    <Autocomplete
                                        size="small"
                                        options={typeTheme}
                                        onChange={onChangeTypeFormation}
                                        getOptionLabel={(option) => option.title}
                                        style={{ backgroundColor: "white", width: 300 }}
                                        renderInput={(params) => <TextField {...params} label="Type" variant="outlined" />}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row" style={{ marginTop: "10px", padding: "20px 20px", backgroundColor: "#F5F5F5", boxShadow: "0px 0px 2px" }} >
                        <div className="col-lg-12 col-md-12">
                            <Card>
                                <ComponentBarChart data={dataFormations} />
                            </Card>

                        </div>
                    </div>

                    <div hidden={JSON.parse(localStorage.user).role !== "SERVICEFORMATIONS" ? true : false} className="row" style={{ marginTop: "10px", padding: "20px 20px", backgroundColor: "#F5F5F5", boxShadow: "0px 0px 2px" }} >
                        <div className="col-lg-12 col-md-12">
                            <div className="row" style={{ marginBottom: "30px" }}>
                                <div className="col-lg-6 col-md-6 offset-lg-3 offset-md-3">
                                    <h4 style={{ marginLeft: "100px", color: "#3D707E" }}>Evaluation d'une formation</h4>
                                    <Autocomplete
                                        size="small"
                                        options={listFormations}
                                        onChange={onChangeFormation}
                                        getOptionLabel={(option) => option.nomTheme + "  - Du : " + option.dateDebut + " Au : " + option.dateFin}
                                        style={{ marginLeft: "50px", backgroundColor: "white", width: 400 }}
                                        renderInput={(params) => <TextField {...params} label="Formation" variant="outlined" />}
                                    />
                                </div>
                            </div>
                            <div className="col-lg-12 col-md-12">
                                <Card>
                                    <ComponentPieChart data={dataRatingFormation} />
                                </Card>
                            </div>
                        </div>
                    </div>

                </TabPanel>

                <TabPanel value={value} index={2} dir={theme.direction}>
                </TabPanel>

            </SwipeableViews>
        </div >


    );
}
