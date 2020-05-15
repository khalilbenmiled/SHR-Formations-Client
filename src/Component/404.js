import React, { Component } from "react"
import logo404 from "../images/404.jpg"
import logoSopra from "../images/logo.png"
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { Link } from "react-router-dom";


class Layout404 extends Component {


    render() {
        return (
            <>
                <h3 style={{ color: "white", position: "absolute", top: "25%", left: "40%" }}>404 Page introuvable !</h3>
                <img style={{ position: "absolute", top: "30%", left: "38.5%", width: "300px", height: "100px" }} src={logoSopra} alt="logo" />
                <img style={{ width: "100%", height: "100vh" }} src={logo404} alt="404notfound" />
                <Link style={{position : "absolute" , top : "50%" , left : "41%"}} to="/dashboard" className="navlink">
                    <ListItem  >
                        <ListItemText primary="Cliquez pour revenir à l'accueil" style={{color : "white" , textDecoration : "underline"}} />
                    </ListItem>
                </Link>
            </>
        )
    }
}
export default Layout404