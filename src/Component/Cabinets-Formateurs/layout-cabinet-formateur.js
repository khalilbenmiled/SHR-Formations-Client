import React, { Component } from "react"
import LayoutNavbar from "../NavBar/layoutNavbar"
import ComponentTabs from "./component-tabs"
import axios from "axios"
import querystring from 'querystring'


class LayoutCabinetsFormateurs extends Component {

    constructor(props) {
        super(props)
        this.state = {
            domaines: [],
            cabinets: [],
            formateurs: []
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
        axios.get("http://localhost:8282/domaine").then(res => {
            if (res.data.domaines) {
                this.setState({
                    domaines: res.data.domaines
                })
            }
        })

        axios.get("http://localhost:8282/formateurs").then(res => {
            if (res.data.formateurs) {
                this.setState({
                    formateurs: res.data.formateurs
                })
            }
        })

        axios.get("http://localhost:8282/cabinets").then(res => {
            if (res.data.cabinets) {
                this.setState({
                    cabinets: res.data.cabinets
                })
            }
        })
    }
    disconnect() {
        this.props.history.push({
            pathname: "/"
        })
    }

    addDomaine(domaine) {
        axios.post("http://localhost:8282/domaine", domaine).then(res => {
            if (res.data.domaine) {
                const tabs = this.state.domaines
                tabs.push(res.data.domaine)
                this.setState({
                    domaines: tabs
                })
            }
        })
    }

    addCabinet(cabinet) {

        axios.post("http://localhost:8282/cabinets", cabinet).then(res => {
            if (res.data.cabinet) {
                const tabs = this.state.cabinets
                tabs.push(res.data.cabinet)
                this.setState({
                    cabinets: tabs
                })
            }
        })
    }

    deleteCabinet(cabinet) {
        const id = {
            id: cabinet.id
        }
        axios.post("http://localhost:8282/cabinets/delete",
            querystring.stringify(id), {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        }).then(res => {
            if (res.data.Success) {
                const tabs = this.state.cabinets
                const index = tabs.findIndex(ca => ca.id === cabinet.id)
                tabs.splice(index, 1)
                this.setState({
                    cabinets: tabs
                })
            }
        })
    }

    deleteFormateur(formateur) {
        const id = {
            id: formateur.id
        }
        axios.post("http://localhost:8282/formateurs/delete",
            querystring.stringify(id), {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        }).then(res => {
            if (res.data.Success) {
                const tabs = this.state.formateurs
                const index = tabs.findIndex(form => form.id === formateur.id)
                tabs.splice(index, 1)
                this.setState({
                    formateurs: tabs
                })
            }
        })
    }

    addFormateur(formateur) {
        axios.post("http://localhost:8282/formateurs", formateur).then(res => {
            if (res.data.formateur) {
                const tabs = this.state.formateurs
                tabs.push(res.data.formateur)
                this.setState({
                    formateurs: tabs
                })
            }
        })
    }

    updateFormateur(formateur) {
        axios.post("http://localhost:8282/formateurs/update", formateur).then(res => {
            if (res.data.Formateur) {
                const tabs = this.state.formateurs
                const index = tabs.findIndex(form => form.id === res.data.Formateur.id)
                tabs.splice(index, 1, res.data.Formateur)

                this.setState({
                    formateurs: tabs
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
                                addDomaine={this.addDomaine.bind(this)}
                                addCabinet={this.addCabinet.bind(this)}
                                domaines={this.state.domaines}
                                cabinets={this.state.cabinets}
                                deleteCabinet={this.deleteCabinet.bind(this)}
                                addFormateur={this.addFormateur.bind(this)}
                                formateurs={this.state.formateurs}
                                deleteFormateur={this.deleteFormateur.bind(this)}
                                updateFormateur={this.updateFormateur.bind(this)}
                            />
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default LayoutCabinetsFormateurs