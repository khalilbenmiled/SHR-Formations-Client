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
import StarsIcon from '@material-ui/icons/Stars';

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
    const [themeSelected, setThemeSelected] = React.useState("");

    const bu = [
        { title: "CS" },
        { title: "Prodops" },
        { title: "RD" },
    ]

    const trimester = [
        { title: "Trimester 1", value: 1 },
        { title: "Trimester 2", value: 2 },
        { title: "Trimester 3", value: 3 },
        { title: "Trimester 4", value: 4 }
    ]

    const typeTheme = [
        { title: "TECHNIQUE", value: "TECHNIQUE" },
        { title: "PRODUIT", value: "SOFTWARE" },
        { title: "SOFTSKILLS", value: "SOFTSKILLS" }
    ]

    React.useEffect(() => {
        const inputBesoin = {
            bu: "",
            theme: "",
            quarter: 0
        }
        filterBesoins(inputBesoin)

        const inputFormation = {
            theme: ""
        }
        filterFormations(inputFormation)

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
                type : value.value
            }
            filterTypeTheme(input)
        }else {
            const input = {
                type : ""
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
                theme: themeSelected
            }
            filterBesoins(input)
        } else {
            setQuarterSelected(0)
            const input = {
                bu: buSelected,
                quarter: 0,
                theme: themeSelected
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
                bu: buSelected
            }
            filterBesoins(input)
        } else {
            setThemeSelected("")
            const input = {
                theme: "",
                quarter: quarterSelected,
                bu: buSelected
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
                theme: themeSelected
            }
            filterBesoins(input)
        } else {
            setBuSelected("")
            const input = {
                bu: "",
                quarter: quarterSelected,
                theme: themeSelected
            }
            filterBesoins(input)
        }


    }

    const onChangeThemeFormation = (e, value) => {
        if (value != null) {
            const input = {
                theme: value.nom
            }
            filterFormations(input)
        } else {
            const input = {
                theme: ""
            }
            filterFormations(input)
        }
    }

    const onChangeProjetBesoin = (e,value) => {
        if(value != null){
            const input = {
                projet : value.nom
            }
            filterProjet(input)
        }else {
            const input = {
                projet : ""
            }
            filterProjet(input)
        }
    }

    const filterBesoins = (input) => {
        axios.post("http://localhost:8686/besoins/reporting/byFilter", querystring.stringify(input), {
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

    const filterFormations = (input) => {
        axios.post("http://localhost:8585/formations/reporting/etat", querystring.stringify(input), {
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

                NomArray.map((key, index) => {
                    tabsNom.push(key)
                    tabsDataAll.push(res.data.Results[key].All.length)
                    tabsDataEnCours.push(res.data.Results[key].EnCours === null ? 0 : res.data.Results[key].EnCours.length)
                    tabsDataProgrammer.push(res.data.Results[key].Programmé === null ? 0 : res.data.Results[key].Programmé.length)
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
                    ]
                };

                setDataFormations(data)
            }
        })
    }

    const filterTypeTheme = (input) => {
        axios.post(" http://localhost:8686/besoins/reporting/byTypeTheme", querystring.stringify(input), {
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
        axios.post("http://localhost:8686/besoins/reporting/byProjet", querystring.stringify(input), {
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
                    <Tab style={{ outline: "none" }} label="Quiz" icon={<StarsIcon />} />

               
                </Tabs>
            </AppBar>
            <SwipeableViews
                axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                index={value}
                onChangeIndex={handleChangeIndex}
            >

                <TabPanel value={value} index={0} dir={theme.direction} >
                    <div className="row" style={{ marginTop: "10px", padding: "20px 20px", backgroundColor: "#F5F5F5", boxShadow: "0px 0px 2px" }} >
                        <div className="col-lg-12 col-md-12" style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                            <Autocomplete
                                size="small"
                                options={bu}
                                onChange={onChangeBuBesoin}
                                getOptionLabel={(option) => option.title}
                                style={{ backgroundColor: "white", width: 300 }}
                                renderInput={(params) => <TextField {...params} label="BU" variant="outlined" />}
                            />
                            <Autocomplete
                                size="small"
                                options={trimester}
                                onChange={onChangeTrimesterBesoin}
                                getOptionLabel={(option) => option.title}
                                style={{ backgroundColor: "white", width: 300 }}
                                renderInput={(params) => <TextField {...params} label="Trimester" variant="outlined" />}
                            />
                            <Autocomplete
                                size="small"
                                options={props.themes}
                                onChange={onChangeThemeBesoin}
                                getOptionLabel={(option) => option.nom}
                                style={{ backgroundColor: "white", width: 300 }}
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

                    <div className="row" style={{ marginTop: "20px" }} >
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
                                <ComponentPieChart data={dataTypeTheme}/>
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
                        <div className="col-lg-12 col-md-12" style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                            <Autocomplete
                                size="small"
                                options={props.themes}
                                onChange={onChangeThemeFormation}
                                getOptionLabel={(option) => option.nom}
                                style={{ backgroundColor: "white", width: 300 }}
                                renderInput={(params) => <TextField {...params} label="Theme" variant="outlined" />}
                            />
                        </div>
                    </div>
                    <div className="row" style={{ marginTop: "10px", padding: "20px 20px", backgroundColor: "#F5F5F5", boxShadow: "0px 0px 2px" }} >
                        <div className="col-lg-12 col-md-12">
                            <Card>
                                <ComponentBarChart data={dataFormations} />
                            </Card>

                        </div>
                    </div>

                </TabPanel>

                <TabPanel value={value} index={2} dir={theme.direction}>
                </TabPanel>

            </SwipeableViews>
        </div >


    );
}
