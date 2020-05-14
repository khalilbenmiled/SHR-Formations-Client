import React from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import ListAltIcon from '@material-ui/icons/ListAlt';
import ComponentBarChart from "./component-barChart"
import Autocomplete from '@material-ui/lab/Autocomplete';
import { TextField } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import axios from "axios"
import querystring from 'querystring'


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
    const [data, setData] = React.useState([]);

    const bu = [
        { title: "CS" },
        { title: "Prodops" },
        { title: "RD" },
    ]


    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleChangeIndex = index => {
        setValue(index);
    };

    const onChangeBu = (e, value) => {

        if (value !== null) {
            const input = {
                bu: value.title
            }

            axios.post("http://localhost:8686/besoins/reporting/byBu", querystring.stringify(input), {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            }).then(res => {
                if (res.data.Besoins) {

                    const tabs = []
                    res.data.Besoins.map(besoin => {
                        tabs.push(besoin.theme.nom)
                        return null
                    })

                    const data = {
                        labels: tabs,
                        datasets: [
                          {
                            label: 'My First dataset',
                            backgroundColor: 'rgba(255,99,132,0.2)',
                            borderColor: 'rgba(255,99,132,1)',
                            borderWidth: 1,
                            hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                            hoverBorderColor: 'rgba(255,99,132,1)',
                            data: [65, 59, 80]
                          }
                        ]
                      };

                      setData(data)

                }
            })
        }


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
                    <Tab style={{ outline: "none" }} label="Besoins" />
                    <Tab style={{ outline: "none" }} label="Consulter les besoins" icon={<ListAltIcon />} />
                    <Tab style={{ outline: "none" }} label="Rapports" icon={<ListAltIcon />} />
                </Tabs>
            </AppBar>
            <SwipeableViews
                axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                index={value}
                onChangeIndex={handleChangeIndex}
            >

                <TabPanel value={value} index={0} dir={theme.direction} >
                    <div className="row" >
                        <div className="col-lg-12 col-md-12" style={{ marginTop: "10px", padding: "20px 20px", backgroundColor: "#F5F5F5", boxShadow: "0px 0px 2px" }}>
                            <Autocomplete
                                id="combo-box-demo"
                                size="small"
                                options={bu}
                                onChange={onChangeBu}
                                getOptionLabel={(option) => option.title}
                                style={{ backgroundColor: "white", marginLeft: "300px", marginBottom: "20px", width: 300 }}
                                renderInput={(params) => <TextField {...params} label="BU" variant="outlined" />}
                            />
                            <Card>
                                <ComponentBarChart data={data} />
                            </Card>

                        </div>
                    </div>
                </TabPanel>

                <TabPanel value={value} index={1} dir={theme.direction}>

                </TabPanel>

                <TabPanel value={value} index={2} dir={theme.direction}>
                </TabPanel>

            </SwipeableViews>
        </div>


    );
}
