import React, { Component } from "react"
import Dashboard from "./dashboard"
import LayoutNavbar from "../NavBar/layoutNavbar"
import "./dashboard.css"

class LayoutDashboard extends Component {

    disconnect() {
        this.props.history.push({
            pathname: "/"
        })
    }

    render() {
        return (
            <>
                <LayoutNavbar disconnect={this.disconnect.bind(this)} />
                <div className="content">
                    <Dashboard />
                </div>
            </>
        )
    }
}

export default LayoutDashboard