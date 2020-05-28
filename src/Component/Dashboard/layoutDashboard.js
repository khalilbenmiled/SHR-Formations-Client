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
            projets : [],
            stompClient : null
        }
    }
    disconnect() {
        this.props.history.push({
            pathname: "/"
        })
    }

    componentDidMount() {
        // var socket = new SockJS('http://localhost:8686/gs-guide-websocket');
        // var stompClient = Stomp.over(socket);
        // stompClient.connect({}, function (frame) {
        //     console.log('Connected: ' + frame);
        //     stompClient.subscribe('/topic/greetings', function (greeting) {
              
        //         console.log(greeting.body);
        //     });
        // });


        // this.setState({
        //     stompClient:stompClient
        // })


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