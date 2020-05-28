import React, { Component } from "react"
import ComponentTabs from "./component-tabs"
import LayoutNavbar from "../NavBar/layoutNavbar"
import axios from "axios"
import querystring from 'querystring'
import { Snackbar } from "@material-ui/core"
import Alert from "@material-ui/lab/Alert"
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import Moment from 'moment';
import 'moment/locale/fr'
import SockJS from "sockjs-client"
import Stomp from "stomp-websocket"

class LayoutFormations extends Component {

    constructor(props) {
        super(props)
        this.state = {
            listBesoins: [],
            listBesoinsSelected: [],
            quarterSelected: "",
            sessions: [],
            sessionSelected: "",
            dateDebutSelected: "",
            dateFinSelected: "",
            reset: false,
            alertFormation: false,
            participants: [],
            formations: [],
            listFormations: [],
            alertAjouterSession: false,
            formateurCabinet: 0,
            closePanel: false,
            nbrParticipants: 0,
            stompClient: null,
        }
    }

    componentDidMount() {

        var socket = new SockJS('http://localhost:8383/notifications');
        var stompClient = Stomp.over(socket);

        this.setState({
            stompClient: stompClient
        })

        if (JSON.parse(localStorage.user).role !== "SERVICEFORMATIONS") {

            const input = {
                id: JSON.parse(localStorage.user).id
            }
            const tabs = []
            const tabs2 = []
            axios.post("http://localhost:8585/formations/byUser", querystring.stringify(input), {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            }).then(res => {
                if (res.data.Formations) {
                    res.data.Formations.map(formation => {
                        var dateDebut = new Date(formation.dateDebut)
                        var dateFin = new Date(formation.dateFin)
                        Moment.locale("fr");
                        var new_date = Moment(dateFin, "YYYY-MM-DD").add(1, "days")
                        tabs.push({
                            id: formation.id,
                            title: formation.nomTheme,
                            start: Moment(dateDebut).format("YYYY-MM-DD").toString(),
                            end: Moment(new_date).format("YYYY-MM-DD").toString(),
                            backgroundColor: formation.typeTheme === "SOFTSKILLS" ? "#ED7E0A" : formation.typeTheme === "TECHNIQUE" ? "#B51B10" : "#027796",
                            textColor: "white",
                        })

                        tabs2.push({
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
                    this.setState({
                        formations: tabs,
                        listFormations: tabs2
                    })
                }
            })
        } else {
            axios.get("http://localhost:8686/besoinsPublier/all").then(res => {
                if (res.data.Besoins) {
                    this.setState({
                        listBesoins: res.data.Besoins
                    })
                }
            })

            const tabs = []
            const tabs2 = []
            axios.get("http://localhost:8585/formations").then(res => {
                if (res.data.Formations) {
                    res.data.Formations.map(formation => {
                        var dateDebut = new Date(formation.dateDebut)
                        var dateFin = new Date(formation.dateFin)
                        Moment.locale("fr");
                        var new_date = Moment(dateFin, "YYYY-MM-DD").add(1, "days")
                        tabs.push({
                            id: formation.id,
                            title: formation.nomTheme,
                            start: Moment(dateDebut).format("YYYY-MM-DD").toString(),
                            end: Moment(new_date).format("YYYY-MM-DD").toString(),
                            backgroundColor: formation.typeTheme === "SOFTSKILLS" ? "#ED7E0A" : formation.typeTheme === "TECHNIQUE" ? "#B51B10" : "#027796",
                            textColor: "white",
                        })

                        tabs2.push({
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
                    this.setState({
                        formations: tabs,
                        listFormations: tabs2
                    })
                }
            })
        }
    }


    disconnect() {
        this.props.history.push({
            pathname: "/"
        })
    }

    besoinSelected(besoin) {

        const tabs = this.state.listBesoinsSelected
        tabs.push(besoin)
        this.setState({
            listBesoinsSelected: tabs
        })
    }

    besoinUnselected(besoin) {
        const tabs = this.state.listBesoinsSelected
        const index = tabs.findIndex(b => b.id === besoin.id)
        tabs.splice(index, 1)
        this.setState({
            listBesoinsSelected: tabs
        })

    }

    quarterSelected(quarterSelected) {

        this.setState({
            quarterSelected: quarterSelected
        })

        const obj = {
            quarter: quarterSelected
        }
        axios.post("http://localhost:8585/sessions/byQuarter",
            querystring.stringify(obj), {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        }).then(res => {

            if (res.data.Sessions) {
                this.setState({
                    sessions: res.data.Sessions
                })
            }
        })
    }

    dateDebutSelected(date) {
        this.setState({
            dateDebutSelected: date
        })
    }

    dateFinSelected(date) {
        this.setState({
            dateFinSelected: date
        })
    }

    ajouterSession(nom, description) {
        const session = {
            nom: nom,
            description: description,
            trimestre: this.state.quarterSelected
        }
        axios.post("http://localhost:8585/sessions", session).then(res => {
            const sessions = this.state.sessions
            sessions.push(res.data.Session)
            this.setState({
                sessions: sessions,
                alertAjouterSession: true
            })
        })
    }

    sessionSelected(sessionSelected) {
        this.setState({
            sessionSelected: sessionSelected
        })
    }

    onChangeDuree(duree) {
        this.setState({
            duree: duree
        })
    }

    ajouterSessionFormation() {

        // var idSession = this.state.sessionSelected.id
        const tabs = []
        var nomTheme = this.state.listBesoinsSelected[0].theme.nom
        var typeTheme = this.state.listBesoinsSelected[0].theme.type

        this.state.listBesoinsSelected.map(besoin => {
            tabs.push(besoin.theme.listModules)
            const input = {
                id: besoin.id,
                listParticipants: this.state.participants
            }
            axios.post("http://localhost:8686/besoins/setPlanifier", input).then(res => {
                if (res.data.Besoin) {
                    console.log(res.data.Besoin)
                }
            })
            return null
        })

        var listModules = tabs.filter((ele, ind) => ind === tabs.findIndex(elem => elem.nom === ele.nom))

        const obj = {
            nomTheme: nomTheme,
            typeTheme: typeTheme,
            dateDebut: this.state.dateDebutSelected.toString(),
            dateFin: this.state.dateFinSelected.toString(),
            maxParticipants: this.state.nbrParticipants,
            duree: "0",
            idSession: "0",
            quarter: this.state.quarterSelected,
            listModules: listModules,
            listParticipants: this.state.participants,
            idCF: this.state.formateurCabinet
        }

        axios.post("http://localhost:8585/formations/", obj).then(res => {
            if (res.data.Formation) {
                this.state.participants.map(participant => {
                    Moment.locale("fr");
                    var now_date = Moment().format("DD/MM/YYYY HH:mm")
                    const obj = {
                      idCollaborateur: participant.id,
                      message: "Vous etes inscrit à une formation, consulter votre calendrier",
                      opened: false,
                      date: now_date
                    }
                    this.state.stompClient.send("/app/valider", {}, JSON.stringify(obj));
                    return null
                })
                this.setState({
                    alertFormation: true
                })
            }

        })

    }


    closeAlertFormation() {
        this.setState({
            alertFormation: false
        })
    }

    participantsSelected(participants) {
        this.setState({
            participants: participants,
        })

    }

    onChangerNbrParticipants(nb) {
        this.setState({
            nbrParticipants: nb
        })
    }



    modulesFormationSelected(modules) {
        this.setState({
            modulesFormationSelected: modules
        })
    }

    closeAlertSession() {
        this.setState({
            alertAjouterSession: false
        })
    }

    refreshCalendrier(formations) {
        this.setState({
            formations: formations
        })
    }

    formateurSelected(formateur) {
        this.setState({
            formateurCabinet: formateur.id
        })
    }

    cabinetSelected(cabinet) {
        this.setState({
            formateurCabinet: cabinet.id
        })
    }

    deleteBesoin(idBesoin, idBesoinPublier) {

        const input = {
            idB: idBesoin,
            idBP: idBesoinPublier
        }
        axios.post("http://localhost:8686/besoins/deleteBP", querystring.stringify(input), {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        }).then(res => {
            if (res.data.BesoinPublier) {
                const tabs = this.state.listBesoins
                const index = tabs.findIndex(b => b.id === idBesoinPublier)
                tabs.splice(index, 1, res.data.BesoinPublier)
                this.setState({
                    listBesoins: tabs
                })

            } else if (res.data.Delete) {
                const tabs = this.state.listBesoins
                const index = tabs.findIndex(b => b.id === idBesoinPublier)
                tabs.splice(index, 1)
                this.setState({
                    listBesoins: tabs,
                    closePanel: true
                })
            }
        })
    }


    render() {
        return (
            <>
                <LayoutNavbar disconnect={this.disconnect.bind(this)} />
                <div className="container content layoutBesoins">
                    <div className="row">
                        <div className="col-lg-12 col-md-12"  >
                            <ComponentTabs
                                listBesoins={this.state.listBesoins}
                                besoinSelected={this.besoinSelected.bind(this)}
                                quarterSelected={this.quarterSelected.bind(this)}
                                listBesoinsSelected={this.state.listBesoinsSelected}
                                besoinUnselected={this.besoinUnselected.bind(this)}
                                dateDebutSelected={this.dateDebutSelected.bind(this)}
                                dateFinSelected={this.dateFinSelected.bind(this)}
                                ajouterSession={this.ajouterSession.bind(this)}
                                sessions={this.state.sessions}
                                sessionSelected={this.sessionSelected.bind(this)}
                                onChangeDuree={this.onChangeDuree.bind(this)}
                                ajouterSessionFormation={this.ajouterSessionFormation.bind(this)}
                                participantsSelected={this.participantsSelected.bind(this)}
                                formations={this.state.formations}
                                listFormations={this.state.listFormations}
                                refreshCalendrier={this.refreshCalendrier.bind(this)}
                                formateurSelected={this.formateurSelected.bind(this)}
                                cabinetSelected={this.cabinetSelected.bind(this)}
                                deleteBesoin={this.deleteBesoin.bind(this)}
                                closePanel={this.state.closePanel}
                                onChangerNbrParticipants={this.onChangerNbrParticipants.bind(this)}

                            />
                        </div>
                    </div>
                </div>
                <Snackbar open={this.state.alertFormation} autoHideDuration={5000} onClose={this.closeAlertFormation.bind(this)}>
                    <Alert onClose={this.closeAlertFormation.bind(this)} icon={<CheckCircleIcon style={{ color: "white" }} />} style={{ backgroundColor: "#4CAF50", color: "white", width: 400, fontSize: 16 }}>
                        Formation enregistrer avec succès
                    </Alert>
                </Snackbar>

                <Snackbar open={this.state.alertAjouterSession} autoHideDuration={5000} onClose={this.closeAlertSession.bind(this)}>
                    <Alert onClose={this.closeAlertSession.bind(this)} icon={<CheckCircleIcon style={{ color: "white" }} />} style={{ backgroundColor: "#4CAF50", color: "white", width: 400, fontSize: 16 }}>
                        Session enregistrer avec succès
                    </Alert>
                </Snackbar>
            </>
        )
    }
}
export default LayoutFormations