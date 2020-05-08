import React, { Component } from "react"
import LayoutNavbar from "../NavBar/layoutNavbar"
import ComponentTabs from "./component-tabs"
import axios from "axios"
import querystring from 'querystring'
import Moment from 'moment';
import 'moment/locale/fr'
import { Snackbar } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import CheckCircleIcon from '@material-ui/icons/CheckCircle';


class LayoutCabinetsFormateurs extends Component {

    constructor(props) {
        super(props)
        this.state = {
            formations: [],
            listQuiz: [],
            alertQuiz: false,
            alertDeleteQuiz: false,
            alerAddQTF: false
        }
    }



    componentDidMount() {
        axios.get("http://localhost:8585/formations").then(res => {
            const tabs = []
            if (res.data.Formations) {
                res.data.Formations.map(formation => {
                    var dateDebut = new Date(formation.dateDebut)
                    var dateFin = new Date(formation.dateFin)
                    Moment.locale("fr");
                    var new_date = Moment(dateFin, "YYYY-MM-DD").add(0, "days")


                    tabs.push({
                        id: formation.id,
                        nomTheme: formation.nomTheme,
                        typeTheme: formation.typeTheme,
                        dateDebut: Moment(dateDebut).format("DD-MM-YYYY").toString(),
                        dateFin: Moment(new_date).format("DD-MM-YYYY").toString(),
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
                })
            }
        })

        axios.get("http://localhost:8787/quiz").then(res => {
            if (res.data.Quiz) {
                this.setState({
                    listQuiz: res.data.Quiz
                })
            }

        })
    }

    disconnect() {
        this.props.history.push({
            pathname: "/"
        })
    }

    closeAletQuiz() {
        this.setState({
            alertQuiz: false
        })
    }

    ajouterQuiz(quiz) {

        axios.post("http://localhost:8787/quiz/", quiz).then(res => {
            if (res.data.Quiz) {
                const listQuiz = this.state.listQuiz
                listQuiz.push(res.data.Quiz)
                this.setState({
                    listQuiz: listQuiz,
                    alertQuiz: true
                })
            }

        })
    }

    deleteQuiz(quiz) {

        axios.delete("http://localhost:8787/quiz/" + quiz.id).then(res => {
            if (res.data.Success) {
                const tabs = this.state.listQuiz
                const index = tabs.indexOf(q => q.id === quiz.id)
                tabs.splice(index, 1)
                this.setState({
                    listQuiz: tabs,
                    alertDeleteQuiz: true
                })
            }
        })
    }

    closeAletDeleteQuiz() {
        this.setState({
            alertDeleteQuiz: false
        })
    }

    addQTF(obj) {
        console.log(obj)
        axios.post("http://localhost:8787/quiz/addQTF",
            querystring.stringify(obj), {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        }).then(res => {
            if (res.data.Quiz) {
                const tabs = this.state.listQuiz
                tabs.push(res.data.Quiz)
                this.setState({
                    listQuiz: tabs,
                    alerAddQTF: true
                })
            }
        })
    }

    closeAletAddQTF() {
        this.setState({
            alerAddQTF: false
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
                                ajouterQuiz={this.ajouterQuiz.bind(this)}
                                formations={this.state.formations}
                                listQuiz={this.state.listQuiz}
                                deleteQuiz={this.deleteQuiz.bind(this)}
                                addQTF={this.addQTF.bind(this)}
                            />
                        </div>
                    </div>
                </div>
                <Snackbar open={this.state.alertQuiz} autoHideDuration={5000} onClose={this.closeAletQuiz.bind(this)}>
                    <Alert onClose={this.closeAletQuiz.bind(this)} icon={<CheckCircleIcon style={{ color: "white" }} />} style={{ backgroundColor: "#4CAF50", color: "white", width: 400, fontSize: 16 }}>
                        Quiz ajouter !
                    </Alert>
                </Snackbar>

                <Snackbar open={this.state.alertDeleteQuiz} autoHideDuration={5000} onClose={this.closeAletDeleteQuiz.bind(this)}>
                    <Alert onClose={this.closeAletDeleteQuiz.bind(this)} icon={<CheckCircleIcon style={{ color: "white" }} />} style={{ backgroundColor: "#4CAF50", color: "white", width: 400, fontSize: 16 }}>
                        Quiz supprimer !
                    </Alert>
                </Snackbar>

                <Snackbar open={this.state.alerAddQTF} autoHideDuration={5000} onClose={this.closeAletAddQTF.bind(this)}>
                    <Alert onClose={this.closeAletAddQTF.bind(this)} icon={<CheckCircleIcon style={{ color: "white" }} />} style={{ backgroundColor: "#4CAF50", color: "white", width: 400, fontSize: 16 }}>
                        Quiz ajouter !
                    </Alert>
                </Snackbar>
            </>
        )
    }
}

export default LayoutCabinetsFormateurs