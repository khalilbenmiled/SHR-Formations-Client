import React, { Component } from "react"
import NavBar from "./navBar"
import axios from "axios"
import querystring from "query-string"
import SockJS from "sockjs-client"
import Stomp from "stomp-websocket"

class LayoutNavbar extends Component {


    constructor(props) {
        super(props)
        this.state = {
            user: "",
            mesNotifications: [],
            nbrOpened: 0
        }

    }



    componentDidMount() {
        const current = this
        var socket = new SockJS('http://localhost:8383/notifications');
        var stompClient = Stomp.over(socket);

        stompClient.connect({}, function (frame) {
            console.log('Connected: ' + frame);
            stompClient.subscribe('/topic/validerByTL', function (greeting) {
                const mesNotifications = JSON.parse(greeting.body).Notifications.filter(n => n.idCollaborateur === JSON.parse(localStorage.user).id && !n.opened)
                const allNotifications = JSON.parse(greeting.body).Notifications.filter(n => n.idCollaborateur === JSON.parse(localStorage.user).id)
                current.setState({
                    mesNotifications: allNotifications,
                    nbrOpened: mesNotifications.length
                })

            });
        });

        this.setState({
            user: JSON.parse(localStorage.user)
        })

        axios.get("http://localhost:8383/notifications/").then(res => {
            if (res.data.Notifications) {
                this.setState({
                    mesNotifications: res.data.Notifications.filter(n => n.idCollaborateur === JSON.parse(localStorage.user).id),
                    nbrOpened: res.data.Notifications.filter(n => n.idCollaborateur === JSON.parse(localStorage.user).id && !n.opened).length
                })
            }
        })


    }

    onLogOut() {

        const idUser = {
            id: JSON.parse(localStorage.user).id
        }
        axios.post("http://localhost:8181/users/logout",
            querystring.stringify(idUser), {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        }).then(res => {
            localStorage.clear()
            this.props.disconnect()
        })

    }

    setNotifications() {
        const obj = {
            id: JSON.parse(localStorage.user).id
        }
        axios.put("http://localhost:8383/notifications/", obj).then(res => {
            if (res.data.Notifications) {
                this.setState({
                    mesNotifications: res.data.Notifications,
                    nbrOpened: 0
                })
            }
        })
    }

    deleteNotifications() {
        const obj = {
            id: JSON.parse(localStorage.user).id
        }

        axios.post("http://localhost:8383/notifications/delete",obj).then(res => {
            if (res.data.Success) {
                this.setState({
                    mesNotifications: [],
                    nbrOpened: 0
                })
            }
        })
    }

    render() {
        return (
            <NavBar
                user={this.state.user}
                onLogOut={this.onLogOut.bind(this)}
                mesNotifications={this.state.mesNotifications}
                nbrOpened={this.state.nbrOpened}
                setNotifications={this.setNotifications.bind(this)}
                deleteNotifications={this.deleteNotifications.bind(this)}
            />
        )
    }
}
export default LayoutNavbar