import React, { Component } from "react"
import LayoutNavbar from "../NavBar/layoutNavbar"
import axios from "axios"
import querystring from 'querystring'
import ComponentTabs from "./component-tabs"
import { Snackbar } from "@material-ui/core"
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import Alert from "@material-ui/lab/Alert"

class LayoutCabinetsFormateurs extends Component {

    constructor(props) {
        super(props)
        this.state = {
            themes: [],
            alertTheme: false,
            alertDelete: false,
            modules: [],
            alertModule: false,
            alertDeleteModule: false
        }
    }

    componentDidMount() {
        axios.get(process.env.REACT_APP_PROXY_SessionsFormations + "/themes").then(res => {
            if (res.data.Theme) {
                this.setState({
                    themes: res.data.Theme
                })
            }
        })
    }

    disconnect() {
        this.props.history.push({
            pathname: "/"
        })
    }

    addAction(theme) {
        axios.post(process.env.REACT_APP_PROXY_SessionsFormations + "/themes", theme).then(res => {
            const listThemes = this.state.themes
            listThemes.push(res.data.Theme)
            this.setState({
                themes: listThemes,
                alertTheme: true
            })
        })
    }

    deleteTheme(theme) {
        axios.delete(process.env.REACT_APP_PROXY_SessionsFormations + "/themes/" + theme.id).then(res => {
            if (res.data.Success) {
                const tabs = this.state.themes
                const index = tabs.findIndex(t => t.id === theme.id)
                tabs.splice(index, 1)
                this.setState({
                    themes: tabs,
                    alertDelete: true
                })
            }
        })
    }

    closeAlertTheme() {
        this.setState({
            alertTheme: false
        })
    }

    closeAlertDelete() {
        this.setState({
            alertDelete: false
        })
    }


    addModule(module, theme) {
        axios.post(process.env.REACT_APP_PROXY_SessionsFormations + "/modules", module).then(res => {


            const obj = {
                idTheme: theme.id,
                idModule: res.data.Module.id
            }
            axios.post(process.env.REACT_APP_PROXY_SessionsFormations + "/themes/affecterMAT",
                querystring.stringify(obj), {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            }).then(res => {

            })
            const listModules = this.state.modules
            listModules.push(res.data.Module)
            this.setState({
                modules: listModules,
                alertModule: true
            })


        })

    }

    deleteModule(module) {
        axios.delete(process.env.REACT_APP_PROXY_SessionsFormations + "/modules/" + module.id).then(res => {
            const tabs = this.state.modules
            const index = tabs.findIndex(m => m.id === module.id)
            tabs.splice(index, 1)
            this.setState({
                modules: tabs,
                alertDeleteModule: true
            })
        })
    }

    closeAlertModule() {
        this.setState({
            alertModule: false
        })
    }

    onChangeTheme(value) {

        if (value !== null) {
            const theme = {
                id: value.id
            }

            axios.post(process.env.REACT_APP_PROXY_SessionsFormations + "/themes/modules",
                querystring.stringify(theme), {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            }).then(res => {

                if (res.data.Modules) {
                    this.setState({
                        modules: res.data.Modules
                    })
                }

            })
        } else {
            this.setState({
                modules: []
            })
        }
    }


    closeAlertDeleteModule() {
        this.setState({
            alertDeleteModule: false
        })
    }

    modifierTheme(theme) {
        axios.post(process.env.REACT_APP_PROXY_SessionsFormations + "/themes/modifier", theme).then(res => {
            if(res.data.Theme) {
                const tabs = this.state.themes
                const index = tabs.findIndex(t=> t.id === res.data.Theme.id)
                tabs.splice(index, 1 , res.data.Theme)

                this.setState({
                    themes : tabs
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
                                themes={this.state.themes}
                                addAction={this.addAction.bind(this)}
                                deleteTheme={this.deleteTheme.bind(this)}
                                modules={this.state.modules}
                                addModule={this.addModule.bind(this)}
                                deleteModule={this.deleteModule.bind(this)}
                                onChangeTheme={this.onChangeTheme.bind(this)}
                                modifierTheme={this.modifierTheme.bind(this)}
                            />
                        </div>
                    </div>
                </div>

                <Snackbar open={this.state.alertTheme} autoHideDuration={5000} onClose={this.closeAlertTheme.bind(this)}>
                    <Alert onClose={this.closeAlertTheme.bind(this)} icon={<CheckCircleIcon style={{ color: "white" }} />} style={{ backgroundColor: "#4CAF50", color: "white", width: 400, fontSize: 16 }}>
                        Theme enregistrer avec succès
                    </Alert>
                </Snackbar>

                <Snackbar open={this.state.alertDelete} autoHideDuration={5000} onClose={this.closeAlertDelete.bind(this)}>
                    <Alert onClose={this.closeAlertDelete.bind(this)} icon={<CheckCircleIcon style={{ color: "white" }} />} style={{ backgroundColor: "#4CAF50", color: "white", width: 400, fontSize: 16 }}>
                        Theme supprimer avec succès
                    </Alert>
                </Snackbar>

                <Snackbar open={this.state.alertModule} autoHideDuration={5000} onClose={this.closeAlertModule.bind(this)}>
                    <Alert onClose={this.closeAlertModule.bind(this)} icon={<CheckCircleIcon style={{ color: "white" }} />} style={{ backgroundColor: "#4CAF50", color: "white", width: 400, fontSize: 16 }}>
                        Module enregistrer avec succès
                    </Alert>
                </Snackbar>

                <Snackbar open={this.state.alertDeleteModule} autoHideDuration={5000} onClose={this.closeAlertDeleteModule.bind(this)}>
                    <Alert onClose={this.closeAlertDeleteModule.bind(this)} icon={<CheckCircleIcon style={{ color: "white" }} />} style={{ backgroundColor: "#4CAF50", color: "white", width: 400, fontSize: 16 }}>
                        Module supprimer avec succès
                    </Alert>
                </Snackbar>
            </>
        )
    }
}

export default LayoutCabinetsFormateurs