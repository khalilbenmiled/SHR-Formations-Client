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
            alertCF: false,
            modifierDateDebut: null,
            modifierDateFin: null,
            modifierNbrParticipants: null,
            alertFormationModifier: false

        }
    }

    componentDidMount() {

        var socket = new SockJS("http://localhost:8383/notifications");
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
            axios.post(process.env.REACT_APP_PROXY_SessionsFormations + "/formations/byUser", querystring.stringify(input), {
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
                            etat: formation.etat,
                            deleted : formation.deleted

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
            axios.get(process.env.REACT_APP_PROXY_Besoins + "/besoinsPublier/all").then(res => {
                if (res.data.Besoins) {
                    this.setState({
                        listBesoins: res.data.Besoins
                    })
                }
            })

            const tabs = []
            const tabs2 = []
            axios.get(process.env.REACT_APP_PROXY_SessionsFormations + "/formations").then(res => {
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
        axios.post(process.env.REACT_APP_PROXY_SessionsFormations + "/sessions/byQuarter",
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
        axios.post(process.env.REACT_APP_PROXY_SessionsFormations + "/sessions", session).then(res => {
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
            axios.post(process.env.REACT_APP_PROXY_Besoins + "/besoins/setPlanifier", input).then(res => {
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

        axios.post(process.env.REACT_APP_PROXY_SessionsFormations + "/formations/", obj).then(res => {
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
        axios.post(process.env.REACT_APP_PROXY_Besoins + "/besoins/deleteBP", querystring.stringify(input), {
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

    affecterCF(input) {
        axios.post(process.env.REACT_APP_PROXY_SessionsFormations + "/formations/setFormateurCabinet", querystring.stringify(input), {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        }).then(res => {
            if (res.data.Formation) {
                const tabs = this.state.listFormations
                const index = tabs.findIndex(f => f.id === res.data.Formation.id)
                var dateDebut = new Date(res.data.Formation.dateDebut)
                var dateFin = new Date(res.data.Formation.dateFin)
                Moment.locale("fr");
                const obj = {
                    id: res.data.Formation.id,
                    nomTheme: res.data.Formation.nomTheme,
                    typeTheme: res.data.Formation.typeTheme,
                    dateDebut: Moment(dateDebut).format("DD-MM-YYYY").toString(),
                    dateFin: Moment(dateFin).format("DD-MM-YYYY").toString(),
                    listModules: res.data.Formation.listModules,
                    listParticipants: res.data.Formation.listParticipants,
                    maxParticipants: res.data.Formation.maxParticipants,
                    duree: res.data.Formation.duree,
                    idCF: res.data.Formation.idCF,
                    etat: res.data.Formation.etat
                }
                tabs.splice(index, 1, obj)
                this.setState({
                    listFormations: tabs,
                    alertCF: true
                })
            }
        })
    }

    closeAlertCF() {
        this.setState({
            alertCF: false
        })
    }

    modfiferDateDebutSelected(date) {
        this.setState({
            modifierDateDebut: date
        })
    }

    modifierDateFinSelected(date) {
        this.setState({
            modifierDateFin: date
        })
    }

    modifierNbrParticipantsSelected(nbr) {
        this.setState({
            modifierNbrParticipants: nbr
        })
    }

    modifierFormation(formation) {

        const obj = {
            id: formation.id,
            dateDebut: this.state.modifierDateDebut === null ? null : this.state.modifierDateDebut.toString(),
            dateFin: this.state.modifierDateFin === null ? null : this.state.modifierDateFin.toString(),
            maxParticipants: this.state.modifierNbrParticipants,
        }

        axios.post(process.env.REACT_APP_PROXY_SessionsFormations + "/formations/modifier", obj).then(res => {
            if (res.data.Formation) {
                const tabs = this.state.listFormations
                const index = tabs.findIndex(f => f.id === res.data.Formation.id)
                const obj = {
                    id: res.data.Formation.id,
                    nomTheme: res.data.Formation.nomTheme,
                    typeTheme: res.data.Formation.typeTheme,
                    dateDebut: Moment(res.data.Formation.dateDebut).format("DD-MM-YYYY").toString() ,
                    dateFin: Moment(res.data.Formation.dateFin).format("DD-MM-YYYY").toString(),
                    listModules: res.data.Formation.listModules,
                    listParticipants: res.data.Formation.listParticipants,
                    maxParticipants: res.data.Formation.maxParticipants,
                    duree: res.data.Formation.duree,
                    idCF: res.data.Formation.idCF,
                    etat: res.data.Formation.etat

                }
                tabs.splice(index, 1, obj)
                this.setState({
                    listFormations: tabs,
                    alertFormationModifier: true
                })
            }
         
        })

    }

    closeAlertFormationModifier() {
        this.setState({
            alertFormationModifier : false
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
                                affecterCF={this.affecterCF.bind(this)}
                                modfiferDateDebutSelected={this.modfiferDateDebutSelected.bind(this)}
                                modifierDateFinSelected={this.modifierDateFinSelected.bind(this)}
                                modifierNbrParticipantsSelected={this.modifierNbrParticipantsSelected.bind(this)}
                                modifierFormation={this.modifierFormation.bind(this)}

                            />
                        </div>
                    </div>
                </div>
                <Snackbar open={this.state.alertFormation} autoHideDuration={5000} onClose={this.closeAlertFormation.bind(this)}>
                    <Alert onClose={this.closeAlertFormation.bind(this)} icon={<CheckCircleIcon style={{ color: "white" }} />} style={{ backgroundColor: "#4CAF50", color: "white", width: 400, fontSize: 16 }}>
                        Formation enregistrée avec succès
                    </Alert>
                </Snackbar>

                <Snackbar open={this.state.alertFormationModifier} autoHideDuration={5000} onClose={this.closeAlertFormationModifier.bind(this)}>
                    <Alert onClose={this.closeAlertFormationModifier.bind(this)} icon={<CheckCircleIcon style={{ color: "white" }} />} style={{ backgroundColor: "#4CAF50", color: "white", width: 400, fontSize: 16 }}>
                        Formation modifiée avec succès
                    </Alert>
                </Snackbar>

                <Snackbar open={this.state.alertAjouterSession} autoHideDuration={5000} onClose={this.closeAlertSession.bind(this)}>
                    <Alert onClose={this.closeAlertSession.bind(this)} icon={<CheckCircleIcon style={{ color: "white" }} />} style={{ backgroundColor: "#4CAF50", color: "white", width: 400, fontSize: 16 }}>
                        Session enregistrer avec succès
                    </Alert>
                </Snackbar>

                <Snackbar open={this.state.alertCF} autoHideDuration={5000} onClose={this.closeAlertCF.bind(this)}>
                    <Alert onClose={this.closeAlertCF.bind(this)} icon={<CheckCircleIcon style={{ color: "white" }} />} style={{ backgroundColor: "#4CAF50", color: "white", width: 400, fontSize: 16 }}>
                        Cabinet / formateur ajoute à cette formation
                    </Alert>
                </Snackbar>
            </>
        )
    }
}
export default LayoutFormations