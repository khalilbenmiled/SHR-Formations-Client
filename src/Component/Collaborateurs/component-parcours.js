import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Avatar, Card, CardContent } from '@material-ui/core';
import Moment from 'moment';
import 'moment/locale/fr'


const useStyles = makeStyles(theme => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        "&:focus": {
            outline: "none"
        },
        borderRadius: "20px",
        width: 920,
        height: '70vh',
        boxShadow: theme.shadows[5],

    },
    titre: {
        color: "#3D707E",
        fontSize: "16px"
    },
    buttonStyles: {
        color: "#B51B10",
        "&:focus": {
            outline: "none"
        }
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
    cancelcon: {
        width: "30px",
        height: "30px",
        color: "#fff",
        cursor: "pointer",
        marginTop: "13px"
    },
    rootCard3: {
        height: "130px",
        backgroundColor: "rgba(181,27,16,0.8)",
        color: "white"
    },
    rootCard1: {
        height: "130px",
        backgroundColor: "rgba(230,122,10,0.8)",
        color: "white"
    },

    rootCard2: {
        height: "130px",
        backgroundColor: "rgba(61,112,126,0.8)",
        color: "white"
    },
    rootCard: {
        height: "130px"
    },
    avatar: {
        position: "relative",
        left: "130px",
        top: "47px",
        width: "50px",
        height: "50px",
        border: "4px solid #B51B10",
        backgroundColor: "#FAFAFA",
        color: "#B51B10",
        fontWeight: "bold"
    },
    password: {
        fontSize: "14px",
        textDecoration: "underline",
        color: "#F3AA5D",
        cursor: "pointer",
        "&:hover": {
            fontWeight: "bold"
        }
    }
}));

export default function TransitionsModal(props) {
    const classes = useStyles();

    const getScore = (row) => {
        return props.mesScores.find(score => score.Score.quiz.idFormation === row.id).Score.resultat
    }

    const getDateDebut = (row) => {
        Moment.locale("fr");
        var date = new Date(row.dateDebut)
        return Moment(date).format("DD-MM-YYYY").toString()
    }

    const getDateFin = (row) => {
        Moment.locale("fr");
        var date = new Date(row.dateFin)
        return Moment(date).format("DD-MM-YYYY").toString()
    }

    return (
        <div className="row" >
            <div className="col-lg-12 col-md-12">
                {props.parcours.Formations.map((formation, index) => (
                    <div key={index} className="row" style={{ height: "150px", backgroundColor: index % 2 === 0 ? "#E1E1E1" : "#F5F5F5" }}>
                        <div className="col-lg-2 col-md-2" style={{ borderRight: "4px solid #B51B10" }}>
                            <Avatar className={classes.avatar}>{index + 1}</Avatar>
                            <div>
                                <label>Formation </label> <br />
                                <label>{formation.nomTheme} </label>
                            </div>
                        </div>

                        <div className="col-lg-10 col-md-10" style={{ padding: "10px 35px" }}>
                            <div className="row">
                                <div className="col-lg-4 col-md-4">
                                    <Card className={classes.rootCard2}>
                                        <CardContent style={{ fontSize: "16px", margin: "10px 35px" }}>
                                            <div className="row" >
                                                <div className="col-lg-12 col-md-12">
                                                    Formation {formation.nomTheme}
                                                </div>
                                            </div>

                                            <div className="row">
                                                <div className="col-lg-12 col-md-12">
                                                    Type {formation.typeTheme === "SOFTWARE" ? "PRODUIT" : formation.typeTheme}
                                                </div>
                                            </div>

                                            <div className="row">
                                                <div className="col-lg-12 col-md-12">
                                                    Du {getDateDebut(formation)}
                                        </div>
                                            </div>

                                            <div className="row">
                                                <div className="col-lg-12 col-md-12">
                                                    AU {getDateFin(formation)}
                                        </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </div>

                                <div className="col-lg-4 col-md-4">
                                    <Card className={classes.rootCard1}>
                                        <CardContent>
                                            <div className="row">
                                                <div className="col-lg-12 col-md-12" style={{ fontSize: "20px", padding: "35px 60px" }}>
                                                    Score {getScore(formation)}%
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </div>

                                <div className="col-lg-4 col-md-4">
                                    <Card className={classes.rootCard3}>
                                        <CardContent>

                                        </CardContent>
                                    </Card>
                                </div>
                            </div>

                        </div>
                    </div>
                ))}

                {/* 
                <div className="row" style={{ height: "150px" ,backgroundColor : "#F5F5F5"}}>
                    <div className="col-lg-2 col-md-2" style={{ borderRight: "4px solid #B51B10" }}>
                        <Avatar className={classes.avatar}>1</Avatar>
                        <div>
                            <label>Formation </label>
                            <label>Nom formation </label>
                        </div>
                    </div>

                    <div className="col-lg-10 col-md-10" style={{ padding: "10px 35px" }}>
                        <div className="row">
                            <div className="col-lg-4 col-md-4">
                                <Card className={classes.rootCard2}>
                                    <CardContent style={{ fontSize: "16px", margin: "10px 35px" }}>
                                        <div className="row" >
                                            <div className="col-lg-12 col-md-12">
                                                Formation Java
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-lg-12 col-md-12">
                                                Type Technique
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-lg-12 col-md-12">
                                                Du 12/12/2020
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-lg-12 col-md-12">
                                                AU 18/12/2020
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>

                            <div className="col-lg-4 col-md-4">
                                <Card className={classes.rootCard1}>
                                    <CardContent>
                                        <div className="row">
                                            <div className="col-lg-12 col-md-12" style={{ fontSize: "20px", padding: "35px 60px" }}>
                                                Score 55%
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>

                            <div className="col-lg-4 col-md-4">
                                <Card className={classes.rootCard3}>
                                    <CardContent>

                                    </CardContent>
                                </Card>
                            </div>
                        </div>

                    </div>
                </div> */}


            </div>
        </div>
    );
}
