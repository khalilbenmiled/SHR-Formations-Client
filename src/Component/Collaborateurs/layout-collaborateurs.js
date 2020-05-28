import React, { Component } from "react"
import LayoutNavbar from "../NavBar/layoutNavbar"
import ComponentTabs from "./component-tabs"

class LayoutCabinetsFormateurs extends Component {

    constructor(props) {
        super(props)
        this.state = {
        }
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
                            <ComponentTabs />
                        </div>
                    </div>
                </div>

            </>
        )
    }
}

export default LayoutCabinetsFormateurs