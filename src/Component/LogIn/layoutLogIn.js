import React, { Component } from "react"
import Login from "./login"
import axios from "axios"
import querystring from 'querystring'
import { Snackbar } from "@material-ui/core"
import Alert from '@material-ui/lab/Alert';
import WarningIcon from '@material-ui/icons/Warning';

class LayoutLogIn extends Component {

    constructor(props) {
        super(props)
        this.state = {
            email: "",
            password: "",
            user: "",
            openError : false,
            msg : ""
        }
    }

    handleClick () {
        this.setState({
            openError : true
        })
    }
    closeError () {
        this.setState({
            openError : false
        })
    }
    onLogIn = () => {
        const authentication = {
            email: this.state.email,
            password: this.state.password
        };
        axios.post(process.env.REACT_APP_PROXY_Utilisateurs+"/users/login",
            querystring.stringify(authentication), {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        }).then(res => {
           
            if (res.data.Success) {
                localStorage.setItem("user", JSON.stringify(res.data.Success))
                this.props.history.push({
                    pathname: "/dashboard",
                })
            } else {
                this.setState({
                    openError : true,
                    msg : res.data.Error
                })
            }

        })
    }

    onChangeEmail = (e) => {
        this.setState({
            email: e.target.value
        })
    }
    onChangePassword = (e) => {
        this.setState({
            password: e.target.value
        })
    }

    render() {
        return (
            <>
                <Login onLogIn={this.onLogIn} onChangeEmail={this.onChangeEmail} onChangePassword={this.onChangePassword} />
                <Snackbar open={this.state.openError} autoHideDuration={2200} onClose={this.closeError.bind(this)}>
                    <Alert onClose={this.closeError.bind(this)} icon = {<WarningIcon style={{color : "white" }}/>} style={{backgroundColor : "#FF9800" , color : "white"}}>
                            {this.state.msg}
                    </Alert>
                </Snackbar>
            </>
        )
    }
}
export default LayoutLogIn