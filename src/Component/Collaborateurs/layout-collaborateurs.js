import React, { Component } from "react"
import LayoutNavbar from "../NavBar/layoutNavbar"
import ComponentTabs from "./component-tabs"
import axios from "axios"
import querystring from 'querystring'


class LayoutCabinetsFormateurs extends Component {

    constructor(props) {
        super(props)
        this.state = {
            infosCollaborateur: {
                teamlead: {
                    nom: "",
                    prenom: ""
                },
                manager: {
                    nom: "",
                    prenom: ""
                }
            },
            user: "",
            mesScores: [],
            allParcours: [],
            parcours: null,
            allScores : [],
           
        }
    }


    componentDidMount() {
        if (JSON.parse(localStorage.user).role === "COLLABORATEUR") {

            const obj = {
                id: JSON.parse(localStorage.user).id
            }
            axios.post(process.env.REACT_APP_PROXY_Utilisateurs + "/users/getInfosCollaborateur",
                querystring.stringify(obj), {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            }).then(res => {
                if (!res.data.Error) {
                    const infos = {
                        teamlead: res.data.TeamLead,
                        manager: res.data.Manager === null ? { nom: "", prenom: "" } : res.data.Manager
                    }
                    this.setState({
                        infosCollaborateur: infos,
                        user: JSON.parse(localStorage.user)
                    })
                }
            })

            const input = {
                idCollaborateur: JSON.parse(localStorage.user).id
            }
            axios.post(process.env.REACT_APP_PROXY_Collaborateurs + "/parcours/byCollaborateur",
                querystring.stringify(input), {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            }).then(res => {
               console.log(res.data)
                if (res.data.Results) {
                   
                    this.setState({
                        parcours: res.data.Results
                    })

                    const objQuiz = {
                        id: JSON.parse(localStorage.user).id
                    }
                    axios.post(process.env.REACT_APP_PROXY_ELearning + "/quiz/getListScoreByCollaborateur",
                        querystring.stringify(objQuiz), {
                        headers: {
                            "Content-Type": "application/x-www-form-urlencoded"
                        }
                    }).then(res => {
                        if (res.data.Scores) {
                            console.log(res.data.Scores)
                            this.setState({
                                mesScores: res.data.Scores
                            })
                        }

                    })
                } else {
                    this.setState({
                        parcours: null
                    })
                }
            })

        


        }

    
        // if (JSON.parse(localStorage.user).role === "SERVICEFORMATIONS") {
            
        //     axios.get(process.env.REACT_APP_PROXY_Collaborateurs+"/parcours/allParcours").then(res => {
         
        //         if (res.data.Results) {
                    
        //             this.setState({
        //                 allParcours: res.data.Results,
                       
        //             })

        //             axios.get(process.env.REACT_APP_PROXY_ELearning + "/quiz/getListScore").then(res=>{
        //                 if(res.data.Scores){
        //                     this.setState({
        //                         allScores : res.data.Scores
        //                     })
        //                 }
        //             })
        //         }else {
        //             this.setState({
        //                 allParcours: null
                       
        //             })
        //         }
        //     })
        // }
    }

    disconnect() {
        this.props.history.push({
            pathname: "/"
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
                                infosCollaborateur={this.state.infosCollaborateur}
                                user={this.state.user}
                                parcours={this.state.parcours}
                                mesScores={this.state.mesScores}
                                allParcours={this.state.allParcours}
                                allScores={this.state.allScores}
                             
                            />
                        </div>
                    </div>
                </div>

            </>
        )
    }
}

export default LayoutCabinetsFormateurs