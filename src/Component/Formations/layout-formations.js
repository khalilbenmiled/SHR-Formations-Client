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

class LayoutFormations extends Component {

    constructor(props) {
        super(props)
        this.state = {
            listBesoins: [],
            listBesoinsSelected: [],
            quarterSelected: "",
            nbrParticipants: 0,
            sessions: [],
            sessionSelected: "",
            dateDebutSelected: "",
            dateFinSelected: "",
            reset: false,
            alertFormation: false,
            participants: [],
            formations : []
        }
    }

    componentDidMount() {
        axios.get("http://localhost:8686/besoinsPublier/all").then(res => {
            if (res.data.Besoins) {
                this.setState({
                    listBesoins: res.data.Besoins
                })
            }
        })

        const tabs = []
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
                        textColor: "white"
                    })
                    return null

                })
                this.setState({
                    formations : tabs
                })
            }
        })
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
                sessions: sessions
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

        var idSession = this.state.sessionSelected.id
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
        console.log(listModules)
        const obj = {
            nomTheme: nomTheme,
            typeTheme: typeTheme,
            dateDebut: this.state.dateDebutSelected.toString(),
            dateFin: this.state.dateFinSelected.toString(),
            maxParticipants: this.state.nbrParticipants,
            duree: this.state.duree,
            idSession: idSession,
            quarter: this.state.quarterSelected,
            listModules: listModules,
            listParticipants: this.state.participants
        }
        axios.post("http://localhost:8585/formations/", obj).then(res => {
            console.log(res.data)

        })

        this.setState({
            alertFormation: true
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
        this.setState({
            nbrParticipants: participants.length
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
                                nbrParticipants={this.state.nbrParticipants}
                                besoinUnselected={this.besoinUnselected.bind(this)}
                                dateDebutSelected={this.dateDebutSelected.bind(this)}
                                dateFinSelected={this.dateFinSelected.bind(this)}
                                ajouterSession={this.ajouterSession.bind(this)}
                                sessions={this.state.sessions}
                                sessionSelected={this.sessionSelected.bind(this)}
                                onChangeDuree={this.onChangeDuree.bind(this)}
                                ajouterSessionFormation={this.ajouterSessionFormation.bind(this)}
                                participantsSelected={this.participantsSelected.bind(this)}
                                formations = {this.state.formations}
                            />
                        </div>
                    </div>
                </div>
                <Snackbar open={this.state.alertFormation} autoHideDuration={5000} onClose={this.closeAlertFormation.bind(this)}>
                    <Alert onClose={this.closeAlertFormation.bind(this)} icon={<CheckCircleIcon style={{ color: "white" }} />} style={{ backgroundColor: "#4CAF50", color: "white", width: 400, fontSize: 16 }}>
                        Formation enregistrer avec succès
                    </Alert>
                </Snackbar>
            </>
        )
    }
}
export default LayoutFormations