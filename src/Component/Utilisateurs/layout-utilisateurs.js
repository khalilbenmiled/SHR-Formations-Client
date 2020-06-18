import React, { Component } from "react"
import LayoutNavbar from "../NavBar/layoutNavbar"
import axios from "axios"
import querystring from 'querystring'
import { Snackbar } from "@material-ui/core"
import Alert from "@material-ui/lab/Alert"
import ComponentTabs from "./component-tabs"
import WarningIcon from '@material-ui/icons/Warning';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CircularProgress from '@material-ui/core/CircularProgress';


class LayoutCabinetsFormateurs extends Component {

    constructor(props) {
        super(props)
        this.state = {
            users: [],
            alertError: false,
            msg: "",
            listTeamLead: [],
            listManager: [],
            alertUser: false,
            progressShow: false,
            alertDeleteUser: false,
            listTeamLeadSelected: [],
            alertUpdateUser: false,
            listFreeTeamLead: [],
            alertActivate : false
        }
    }

    componentWillMount() {
        if (JSON.parse(localStorage.user).role !== "SERVICEFORMATIONS") {
            this.props.history.push({
                pathname: "/404NOTFOUND"
            })
        }
    }
    componentDidMount() {
        axios.get(process.env.REACT_APP_PROXY_Utilisateurs + "/users").then(res => {
            if (res.data.Users) {
                this.setState({
                    users: res.data.Users
                })
            }

        })

        axios.get(process.env.REACT_APP_PROXY_Utilisateurs + "/users/tl").then(res => {
            if (res.data.Users) {
                this.setState({
                    listTeamLead: res.data.Users
                })
            }
        })

        axios.get(process.env.REACT_APP_PROXY_Utilisateurs + "/users/getFreeTL").then(res => {
            if (res.data.TeamLeads) {
                this.setState({
                    listFreeTeamLead: res.data.TeamLeads
                })
            }
        })

        axios.get(process.env.REACT_APP_PROXY_Utilisateurs + "/users/mg").then(res => {
            if (res.data.Users) {
                this.setState({
                    listManager: res.data.Users
                })
            }
        })


    }

    disconnect() {
        this.props.history.push({
            pathname: "/"
        })
    }

    addUtilisateur(user) {
        this.setState({
            progressShow: true
        })
        axios.post(process.env.REACT_APP_PROXY_Utilisateurs + "/users", user.user).then(res => {
            console.log(res.data)
            if (res.data.Error) {
                this.setState({
                    alertError: true,
                    msg: res.data.Error
                })
            } else {
                const tabs = this.state.users
                tabs.push(res.data.Collaborateur)
                this.setState({
                    users: tabs,
                    progressShow: false
                })
                if (user.user.role === "MANAGER") {
                    const tabs = this.state.listManager
                    tabs.push(res.data.Collaborateur)
                    this.setState({
                        listManager: tabs
                    })
                    const obj = {
                        listTeamLead: this.state.listTeamLeadSelected,
                        idManager: res.data.Collaborateur.id
                    }
                    axios.post(process.env.REACT_APP_PROXY_Besoins + "/teamlead/affecterTLMG", obj).then(res => {
                        this.setState({
                            alertUser: true,
                            listTeamLeadSelected: []
                        })
                        axios.get(process.env.REACT_APP_PROXY_Utilisateurs + "/users/getFreeTL").then(res => {
                            if (res.data.TeamLeads) {
                                this.setState({
                                    listFreeTeamLead: res.data.TeamLeads
                                })
                            }
                        })
                    })
                }

                if (user.user.role === "COLLABORATEUR") {
                    const input = {
                        idCollaborateur: res.data.Collaborateur.id,
                        idTeamLead: user.teamlead === "" ? 0 : user.teamlead.id
                    }
                    axios.post(process.env.REACT_APP_PROXY_Collaborateurs + "/collaborateurs/", querystring.stringify(input), {
                        headers: {
                            "Content-Type": "application/x-www-form-urlencoded"
                        }
                    }).then(res => {
                        if (res.data.Collaborateur) {
                            this.setState({
                                alertUser: true
                            })
                        }
                    })
                }
                if (user.user.role === "TEAMLEAD") {
                    const tabs = this.state.listTeamLead
                    tabs.push(res.data.Collaborateur)
                    this.setState({
                        listTeamLead: tabs
                    })
                    const tabs2 = this.state.listFreeTeamLead
                    tabs2.push(res.data.Collaborateur)
                    this.setState({
                        listFreeTeamLead: tabs2
                    })

                    const input = {
                        idTL: res.data.Collaborateur.id,
                        idMG: user.manager === "" ? 0 : user.manager.id
                    }
                    axios.post(process.env.REACT_APP_PROXY_Besoins + "/teamlead/", querystring.stringify(input), {
                        headers: {
                            "Content-Type": "application/x-www-form-urlencoded"
                        }
                    }).then(res => {
                        if (res.data.TeamLead) {
                            this.setState({
                                alertUser: true
                            })
                        }

                    })
                }

            }
        })
    }

    closeError() {
        this.setState({
            alertError: false
        })
    }

    closeAlertUser() {
        this.setState({
            alertUser: false
        })
    }

    activateUser(id) {
       
        const input = {
            id: id
        }

        axios.post(process.env.REACT_APP_PROXY_Utilisateurs + "/users/activate", querystring.stringify(input), {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        }).then(res => {
            if(res.data.User){
                const tabs = this.state.users
                const index = tabs.findIndex(u => u.id === res.data.User.id)
                tabs.splice(index, 1,res.data.User)
                this.setState({
                    users : tabs,
                    alertActivate : true
                })
            }
        })
    }

    deleteUser(user) {
        axios.delete(process.env.REACT_APP_PROXY_Utilisateurs + "/users/" + user.id).then(res => {
            if (res.data.User) {
                const tabs = this.state.users
                const index = tabs.findIndex(u => u.id === res.data.User.id)
               
                tabs.splice(index, 1,res.data.User)
                this.setState({
                    users: tabs,
                    alertDeleteUser: true
                })

                // if (user.role === "COLLABORATEUR") {
                //     axios.delete(process.env.REACT_APP_PROXY_Collaborateurs+"/collaborateurs/" + user.id).then(res => {
                //         if (res.data.Success) {
                //             this.setState({
                //                 alertDeleteUser: true
                //             })
                //         }
                //     })
                // }
                // if (user.role === "TEAMLEAD") {
                //     axios.delete(process.env.REACT_APP_PROXY_Besoins+"/teamlead/" + user.id).then(res => {
                //         if (res.data.Success) {
                //             this.setState({
                //                 alertDeleteUser: true
                //             })
                //         }
                //     })
                // }

                // if (user.role === "MANAGER") {
                //     axios.delete(process.env.REACT_APP_PROXY_Besoins+"/teamlead/manager/" + user.id).then(res => {
                //         if (res.data.Success) {
                //             this.setState({
                //                 alertDeleteUser: true
                //             })
                //         }
                //     })
                // }
            }
        })
    }

    closeAlertDeleteUser() {
        this.setState({
            alertDeleteUser: false
        })
    }

    teamleadSelected(listTeamlead) {
        this.setState({
            listTeamLeadSelected: listTeamlead
        })
    }
    updateManagerTeamLead(user) {

        const obj = {
            listTeamLead: this.state.listTeamLeadSelected,
            idManager: user.id
        }
        axios.post(process.env.REACT_APP_PROXY_Besoins + "/teamlead/affecterTLMG", obj).then(res => {
            this.setState({
                alertUpdateUser: true,
                listTeamLeadSelected: []
            })
        })

    }

    closeAlertUpdateUser() {
        this.setState({
            alertUpdateUser: false
        })
    }

    updateTeamLeadManager(user, manager) {

        const input = {
            idTL: user.id,
            idMG: manager.id
        }
        axios.post(process.env.REACT_APP_PROXY_Besoins + "/teamlead/setManager", querystring.stringify(input), {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        }).then(res => {
            if (res.data.TeamLead) {
                this.setState({
                    alertUpdateUser: true
                })
            }
        })
    }

    updateCollaborateur(user, teamlead) {
        const input = {
            idC: user.id,
            idTL: teamlead.id
        }
        axios.post(process.env.REACT_APP_PROXY_Collaborateurs + "/collaborateurs/setCollaborateur", querystring.stringify(input), {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        }).then(res => {
            if (res.data.Collaborateur) {
                this.setState({
                    alertUpdateUser: true
                })
            }
        })
    }

    closeAlertActivate() {
        this.setState({
            alertActivate : false
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
                                users={this.state.users}
                                addUtilisateur={this.addUtilisateur.bind(this)}
                                listTeamLead={this.state.listTeamLead}
                                listManager={this.state.listManager}
                                deleteUser={this.deleteUser.bind(this)}
                                teamleadSelected={this.teamleadSelected.bind(this)}
                                updateManagerTeamLead={this.updateManagerTeamLead.bind(this)}
                                listFreeTeamLead={this.state.listFreeTeamLead}
                                updateTeamLeadManager={this.updateTeamLeadManager.bind(this)}
                                updateCollaborateur={this.updateCollaborateur.bind(this)}
                                activateUser={this.activateUser.bind(this)}
                            />
                        </div>
                    </div>
                    <CircularProgress hidden={!this.state.progressShow ? true : false} style={{ color: "red", position: "absolute", top: "90%", left: "55%" }} />
                </div>

                <Snackbar open={this.state.alertError} autoHideDuration={2200} onClose={this.closeError.bind(this)}>
                    <Alert onClose={this.closeError.bind(this)} icon={<WarningIcon style={{ color: "white" }} />} style={{ backgroundColor: "#FF9800", color: "white" }}>
                        {this.state.msg}
                    </Alert>
                </Snackbar>

                <Snackbar open={this.state.alertUser} autoHideDuration={5000} onClose={this.closeAlertUser.bind(this)}>
                    <Alert onClose={this.closeAlertUser.bind(this)} icon={<CheckCircleIcon style={{ color: "white" }} />} style={{ backgroundColor: "#4CAF50", color: "white", width: 400, fontSize: 16 }}>
                        Utilisateur enregistrer avec succès
                    </Alert>
                </Snackbar>

                <Snackbar open={this.state.alertDeleteUser} autoHideDuration={5000} onClose={this.closeAlertDeleteUser.bind(this)}>
                    <Alert onClose={this.closeAlertDeleteUser.bind(this)} icon={<CheckCircleIcon style={{ color: "white" }} />} style={{ backgroundColor: "#4CAF50", color: "white", width: 400, fontSize: 16 }}>
                        Utilisateur désactiver avec succès
                    </Alert>
                </Snackbar>

                <Snackbar open={this.state.alertUpdateUser} autoHideDuration={5000} onClose={this.closeAlertUpdateUser.bind(this)}>
                    <Alert onClose={this.closeAlertUpdateUser.bind(this)} icon={<CheckCircleIcon style={{ color: "white" }} />} style={{ backgroundColor: "#4CAF50", color: "white", width: 400, fontSize: 16 }}>
                        Utilisateur modifié
                    </Alert>
                </Snackbar>

                <Snackbar open={this.state.alertActivate} autoHideDuration={5000} onClose={this.closeAlertActivate.bind(this)}>
                    <Alert onClose={this.closeAlertActivate.bind(this)} icon={<CheckCircleIcon style={{ color: "white" }} />} style={{ backgroundColor: "#4CAF50", color: "white", width: 400, fontSize: 16 }}>
                        Utilisateur activer de nouveau
                    </Alert>
                </Snackbar>

            </>

        )
    }
}

export default LayoutCabinetsFormateurs