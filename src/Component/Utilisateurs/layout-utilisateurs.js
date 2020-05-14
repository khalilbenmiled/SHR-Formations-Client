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
            listFreeTeamLead: []
        }
    }

    componentDidMount() {
        axios.get("http://localhost:8181/users").then(res => {
            if (res.data.Users) {
                this.setState({
                    users: res.data.Users
                })
            }

        })

        axios.get(" http://localhost:8181/users/tl").then(res => {
            if (res.data.Users) {
                this.setState({
                    listTeamLead: res.data.Users
                })
            }
        })

        axios.get("http://localhost:8181/users/getFreeTL").then(res => {
            if (res.data.TeamLeads) {
                this.setState({
                    listFreeTeamLead: res.data.TeamLeads
                })
            }
        })

        axios.get(" http://localhost:8181/users/mg").then(res => {
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
        axios.post("http://localhost:8181/users", user.user).then(res => {
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
                    axios.post("http://localhost:8686/teamlead/affecterTLMG", obj).then(res => {
                        this.setState({
                            alertUser: true,
                            listTeamLeadSelected: []
                        })
                        axios.get("http://localhost:8181/users/getFreeTL").then(res => {
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
                    axios.post("http://localhost:8383/collaborateurs/", querystring.stringify(input), {
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
                    axios.post("http://localhost:8686/teamlead/", querystring.stringify(input), {
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

    deleteUser(user) {
        axios.delete("http://localhost:8181/users/" + user.id).then(res => {
            if (res.data.Success) {
                const tabs = this.state.users
                const index = tabs.findIndex(u => u.id === user.id)
                tabs.splice(index, 1)
                this.setState({
                    users: tabs
                })

                if (user.role === "COLLABORATEUR") {
                    axios.delete("http://localhost:8383/collaborateurs/" + user.id).then(res => {
                        if (res.data.Success) {
                            this.setState({
                                alertDeleteUser: true
                            })
                        }
                    })
                }
                if (user.role === "TEAMLEAD") {
                    axios.delete("http://localhost:8686/teamlead/" + user.id).then(res => {
                        if (res.data.Success) {
                            this.setState({
                                alertDeleteUser: true
                            })
                        }
                    })
                }

                if (user.role === "MANAGER") {
                    axios.delete("http://localhost:8686/teamlead/manager/" + user.id).then(res => {
                        if (res.data.Success) {
                            this.setState({
                                alertDeleteUser: true
                            })
                        }
                    })
                }
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
        axios.post("http://localhost:8686/teamlead/affecterTLMG", obj).then(res => {
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
        axios.post("http://localhost:8686/teamlead/setManager", querystring.stringify(input), {
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
        axios.post("http://localhost:8383/collaborateurs/setCollaborateur", querystring.stringify(input), {
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
                        Utilisateur supprimé avec succès
                    </Alert>
                </Snackbar>

                <Snackbar open={this.state.alertUpdateUser} autoHideDuration={5000} onClose={this.closeAlertUpdateUser.bind(this)}>
                    <Alert onClose={this.closeAlertUpdateUser.bind(this)} icon={<CheckCircleIcon style={{ color: "white" }} />} style={{ backgroundColor: "#4CAF50", color: "white", width: 400, fontSize: 16 }}>
                        Utilisateur modifié
                    </Alert>
                </Snackbar>

            </>
        )
    }
}

export default LayoutCabinetsFormateurs