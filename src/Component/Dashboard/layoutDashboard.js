import React, { Component } from "react"
import ComponentTabs from "./component-tabs"
import LayoutNavbar from "../NavBar/layoutNavbar"
import "./dashboard.css"
import axios from "axios"


class LayoutDashboard extends Component {

    constructor(props) {
        super (props)
        this.state = {
            themes : [],
            projets : []
        }
    }
    disconnect() {
        this.props.history.push({
            pathname: "/"
        })
    }

    componentDidMount() {
        axios.get("http://localhost:8585/themes").then(res => {
            if (res.data.Theme) {
                this.setState({
                    themes: res.data.Theme,
                })
            }
        })
        axios.get("http://localhost:8686/projets").then(res=>{
            if(res.data.Projets){
                this.setState({
                    projets : res.data.Projets
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
                        <div className="col-lg-12 col-md-12">
                            <ComponentTabs themes={this.state.themes} projets={this.state.projets}/>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default LayoutDashboard