import React, { Component } from "react"
import LayoutNavbar from "../NavBar/layoutNavbar"
import ComponentTabs from "./component-tabs"
import axios from "axios"
import Moment from 'moment';
import 'moment/locale/fr'

class LayoutCabinetsFormateurs extends Component {

    constructor(props) {
        super(props)
        this.state = {
            formations: [],
            listQuiz: []
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
            this.setState({
                listQuiz: res.data.Quiz
            })
        })
    }

    disconnect() {
        this.props.history.push({
            pathname: "/"
        })
    }

    ajouterQuiz(quiz) {

        axios.post("http://localhost:8787/quiz/", quiz).then(res => {
            const listQuiz = this.state.listQuiz
            listQuiz.push(res.data.Quiz)
            this.setState({
                listQuiz: listQuiz
            })
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
                                listQuiz = {this.state.listQuiz}
                            />
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default LayoutCabinetsFormateurs