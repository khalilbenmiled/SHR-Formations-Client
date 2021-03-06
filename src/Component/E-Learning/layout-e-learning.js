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
            alerAddQTF: false,
            quizCollaborateurs: [],
            scores: [],
            listDocs: [],
            alertAddDocs: false,
            loadingUpload: false,
            loadingList: false,
            scoreNow: "",
            showQuiz: false,
            listQuizWithFormation: [],
            alertDocsDeleted : false,
            alertDateQuiz : false
        }
    }

    componentWillMount() {
        if (JSON.parse(localStorage.user).role !== "SERVICEFORMATIONS" && JSON.parse(localStorage.user).role !== "COLLABORATEUR") {
            this.props.history.push({
                pathname: "/404NOTFOUND"
            })
        }
    }


    componentDidMount() {
        axios.get(process.env.REACT_APP_PROXY_SessionsFormations + "/formations/").then(res => {
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

        axios.get(process.env.REACT_APP_PROXY_ELearning + "/quiz").then(res => {
            if (res.data.Resultats) {
                this.setState({
                    listQuiz: res.data.Resultats.sort((a, b) => (a.Quiz.id < b.Quiz.id) ? 1 : -1),
                    showQuiz: true
                })
            }
        })

        this.setState({
            loadingList: true
        })
        axios.get(process.env.REACT_APP_PROXY_ELearning + "/docs/").then(res => {
            if (res.data.Docs) {
                this.setState({
                    listDocs: res.data.Docs,
                    loadingList: false
                })
            } else {
                this.setState({
                    loadingList: false
                })
            }

        })

        if (JSON.parse(localStorage.user).role === "COLLABORATEUR") {
            const obj = {
                id: JSON.parse(localStorage.user).id
            }
            axios.post(process.env.REACT_APP_PROXY_ELearning + "/quiz/byCollaborateur",
                querystring.stringify(obj), {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            }).then(res => {
                this.setState({
                    quizCollaborateurs: res.data.Quiz
                })
            })

            axios.post(process.env.REACT_APP_PROXY_ELearning + "/quiz/getListScoreByCollaborateur",
                querystring.stringify(obj), {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            }).then(res => {
                if (res.data.Scores) {
                    this.setState({
                        scores: res.data.Scores
                    })
                }

            })
        }


        if (JSON.parse(localStorage.user).role === "SERVICEFORMATIONS") {
            axios.get(process.env.REACT_APP_PROXY_ELearning + "/quiz/getListScore").then(res => {
                if (res.data.Scores) {
                    this.setState({
                        scores: res.data.Scores
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

    closeAletQuiz() {
        this.setState({
            alertQuiz: false
        })
    }

    ajouterQuiz(quiz) {

        console.log(quiz.date)

        axios.post(process.env.REACT_APP_PROXY_ELearning + "/quiz/", quiz).then(res => {
            if (res.data.Quiz) {

                axios.get(process.env.REACT_APP_PROXY_ELearning + "/quiz").then(res => {
                    if (res.data.Resultats) {
                        this.setState({
                            listQuiz: res.data.Resultats.sort((a, b) => (a.Quiz.id < b.Quiz.id) ? 1 : -1),
                            alertQuiz: true
                        })
                    }
                })

            }

        })
    }

    deleteQuiz(quiz) {

        axios.delete(process.env.REACT_APP_PROXY_ELearning + "/quiz/" + quiz.id).then(res => {
            if (res.data.Success) {
                axios.get(process.env.REACT_APP_PROXY_ELearning + "/quiz").then(res => {
                    if (res.data.Resultats) {
                        this.setState({
                            listQuiz: res.data.Resultats.sort((a, b) => (a.Quiz.id < b.Quiz.id) ? 1 : -1),
                            alertDeleteQuiz: true
                        })
                    }
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

        axios.post(process.env.REACT_APP_PROXY_ELearning + "/quiz/addQTF",
            querystring.stringify(obj), {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        }).then(res => {
            if (res.data.Quiz) {
                axios.get(process.env.REACT_APP_PROXY_ELearning + "/quiz").then(res => {
                    if (res.data.Resultats) {
                        this.setState({
                            listQuiz: res.data.Resultats.sort((a, b) => (a.Quiz.id < b.Quiz.id) ? 1 : -1),
                            alerAddQTF: true
                        })
                    }
                })
            }
        })
    }

    closeAletAddQTF() {
        this.setState({
            alerAddQTF: false
        })
    }

    passerQuiz(mesReponses, idQuiz) {
        const input = {
            mesReponses: mesReponses,
            idQuiz: idQuiz,
            idCollaborateur: JSON.parse(localStorage.user).id
        }
        axios.post(process.env.REACT_APP_PROXY_ELearning + "/quiz/calculScore", input).then(res => {
            const tabs = this.state.quizCollaborateurs
            const index = tabs.findIndex(q => q.id === idQuiz)
            tabs.splice(index, 1)
            this.setState({
                quizCollaborateurs: tabs,
                scoreNow: res.data.Score.resultat
            })


            const obj = {
                id: JSON.parse(localStorage.user).id
            }
            axios.post(process.env.REACT_APP_PROXY_ELearning + "/quiz/getListScoreByCollaborateur",
                querystring.stringify(obj), {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            }).then(res => {
                if (res.data.Scores) {
                    this.setState({
                        scores: res.data.Scores
                    })
                }
            })

        })
    }

    rateFormation(idFormation, star) {
        const input = {
            idFormation: idFormation,
            star: star
        }
        axios.post(process.env.REACT_APP_PROXY_SessionsFormations + "/formations/rate",
            querystring.stringify(input), {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        }).then(res => {
            console.log(res.data)
        })
    }

    addParcour(idCollaborateur, idFormation) {
        const inputParcour = {
            idCollaborateur: idCollaborateur,
            idFormation: idFormation,
        }

        axios.post(process.env.REACT_APP_PROXY_Collaborateurs + "/parcours/",
            querystring.stringify(inputParcour), {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        }).then(res => {
            console.log(res.data)
        })
    }

    upload(formData) {
        this.setState({
            loadingUpload: true
        })
        axios.post(process.env.REACT_APP_PROXY_ELearning + "/docs/uploadFile",
            formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        }).then(res => {
            if (res.data.Docs) {
                const tabs = this.state.listDocs
                tabs.push(res.data.Docs)
                this.setState({
                    listDocs: tabs,
                    alertAddDocs: true,
                    loadingUpload: false
                })
            }


        })
    }

    closeAletDocs() {
        this.setState({
            alertAddDocs: false
        })
    }

    deleteDocs(id) {
        this.setState({
            loadingList: true
        })
        axios.delete(process.env.REACT_APP_PROXY_ELearning + "/docs/" + id).then(res => {
            
            if (res.data.Success) {
                axios.get(process.env.REACT_APP_PROXY_ELearning + "/docs/").then(res => {
                    if (res.data.Docs) {
                        this.setState({
                            listDocs: res.data.Docs,
                            loadingList: false,
                            alertDocsDeleted : true
                        })
                    } else {
                        this.setState({
                            loadingList: false
                        })
                    }

                })

            }
        })
    }

    closeAlertDocsDeleted () {
        this.setState({
            alertDocsDeleted : false
        })
    }

    modifierDateQuiz(input) {
        axios.post(process.env.REACT_APP_PROXY_ELearning+"/quiz/modifierDate" , input).then(res=>{
            console.log(res.data)
            if(res.data.Quiz) {
                axios.get(process.env.REACT_APP_PROXY_ELearning + "/quiz").then(res => {
                    if (res.data.Resultats) {
                        this.setState({
                            listQuiz: res.data.Resultats.sort((a, b) => (a.Quiz.id < b.Quiz.id) ? 1 : -1),
                            alertDateQuiz : true
                        })
                    }
                })
            }
        })
    }

    closeAlertDateQuiz () {
        this.setState({
            alertDateQuiz : false
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
                                quizCollaborateurs={this.state.quizCollaborateurs}
                                passerQuiz={this.passerQuiz.bind(this)}
                                scores={this.state.scores}
                                rateFormation={this.rateFormation.bind(this)}
                                listDocs={this.state.listDocs}
                                upload={this.upload.bind(this)}
                                loadingUpload={this.state.loadingUpload}
                                loadingList={this.state.loadingList}
                                addParcour={this.addParcour.bind(this)}
                                showQuiz={this.state.showQuiz}
                                deleteDocs={this.deleteDocs.bind(this)}
                                modifierDateQuiz={this.modifierDateQuiz.bind(this)}
                            />
                        </div>
                    </div>
                </div>
                <Snackbar open={this.state.alertQuiz} autoHideDuration={5000} onClose={this.closeAletQuiz.bind(this)}>
                    <Alert onClose={this.closeAletQuiz.bind(this)} icon={<CheckCircleIcon style={{ color: "white" }} />} style={{ backgroundColor: "#4CAF50", color: "white", width: 400, fontSize: 16 }}>
                        Quiz ajouté !
                    </Alert>
                </Snackbar>

                <Snackbar open={this.state.alertAddDocs} autoHideDuration={5000} onClose={this.closeAletDocs.bind(this)}>
                    <Alert onClose={this.closeAletDocs.bind(this)} icon={<CheckCircleIcon style={{ color: "white" }} />} style={{ backgroundColor: "#4CAF50", color: "white", width: 400, fontSize: 16 }}>
                        Document ajouté !
                    </Alert>
                </Snackbar>

                <Snackbar open={this.state.alertDeleteQuiz} autoHideDuration={5000} onClose={this.closeAletDeleteQuiz.bind(this)}>
                    <Alert onClose={this.closeAletDeleteQuiz.bind(this)} icon={<CheckCircleIcon style={{ color: "white" }} />} style={{ backgroundColor: "#4CAF50", color: "white", width: 400, fontSize: 16 }}>
                        Quiz supprimé !
                    </Alert>
                </Snackbar>

                <Snackbar open={this.state.alerAddQTF} autoHideDuration={5000} onClose={this.closeAletAddQTF.bind(this)}>
                    <Alert onClose={this.closeAletAddQTF.bind(this)} icon={<CheckCircleIcon style={{ color: "white" }} />} style={{ backgroundColor: "#4CAF50", color: "white", width: 400, fontSize: 16 }}>
                        Quiz ajouté !
                    </Alert>
                </Snackbar>

                <Snackbar open={this.state.alertDateQuiz} autoHideDuration={5000} onClose={this.closeAlertDateQuiz.bind(this)}>
                    <Alert onClose={this.closeAlertDateQuiz.bind(this)} icon={<CheckCircleIcon style={{ color: "white" }} />} style={{ backgroundColor: "#4CAF50", color: "white", width: 400, fontSize: 16 }}>
                        Date quiz modifié !
                    </Alert>
                </Snackbar>

                
                <Snackbar open={this.state.alertDocsDeleted} autoHideDuration={5000} onClose={this.closeAlertDocsDeleted.bind(this)}>
                    <Alert onClose={this.closeAlertDocsDeleted.bind(this)} icon={<CheckCircleIcon style={{ color: "white" }} />} style={{ backgroundColor: "#4CAF50", color: "white", width: 400, fontSize: 16 }}>
                        Docs supprimé !
                    </Alert>
                </Snackbar>
            </>
        )
    }
}

export default LayoutCabinetsFormateurs