import React , { Component } from "react"
import { BrowserRouter, Switch } from "react-router-dom";
import LayoutLogIn from "./LogIn/layoutLogIn"
import LayoutDashboard from "./Dashboard/layoutDashboard"
import PrivateRoute from "./privateRoutes"
import IsConnect from "./isConnected"
import LayoutBesoinsFormations from "./Besoins-Formations/layout-besoins-formations";

class Index extends Component{

    render(){
        return(
            <BrowserRouter>
            <Switch>  
                <IsConnect path="/" component={LayoutLogIn} exact />  
                <PrivateRoute  path="/dashboard" component={LayoutDashboard} exact  /> 
                <PrivateRoute  path="/besoins" component={LayoutBesoinsFormations} />              
            </Switch>
          </BrowserRouter>
        )
    }
}

export default Index