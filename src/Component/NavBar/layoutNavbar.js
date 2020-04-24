import React , { Component } from "react"
import NavBar from "./navBar"
import axios from "axios"
import querystring from "query-string"


class LayoutNavbar extends Component{


    constructor(props){
        super(props)
        this.state = {
            user : "",
        }        

    }

    componentDidMount(){
        this.setState({
            user : JSON.parse(localStorage.user)
        })         
    }
   
    onLogOut(){
        
        const idUser = {
            id :JSON.parse(localStorage.user).id
        }
        axios.post("http://localhost:8181/users/logout",
        querystring.stringify(idUser), {
          headers: { 
            "Content-Type": "application/x-www-form-urlencoded"
          }
        }).then(res =>  {
            localStorage.clear()
           this.props.disconnect()
        })
       
    }

    render(){
        return(
            <NavBar  user= {this.state.user} onLogOut={this.onLogOut.bind(this)}/>
        )
    }
}
export default LayoutNavbar