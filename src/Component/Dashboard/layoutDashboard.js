import React, { Component } from "react"
import ComponentTabs from "./component-tabs"
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

                <div className="container content layoutBesoins">
                    <div className="row">
                        <div className="col-lg-12 col-md-12">
                            <ComponentTabs />
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default LayoutDashboard