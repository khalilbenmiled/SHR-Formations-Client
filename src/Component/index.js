import React , { Component } from "react"
import { BrowserRouter, Switch } from "react-router-dom";
import LayoutLogIn from "./LogIn/layoutLogIn"
import LayoutDashboard from "./Dashboard/layoutDashboard"
import PrivateRoute from "./privateRoutes"
import IsConnect from "./isConnected"
import LayoutBesoinsFormations from "./Besoins-Formations/layout-besoins-formations";
import LayoutFormations from "./Formations/layout-formations"
import LayoutCabinetsFormateurs from "./Cabinets-Formateurs/layout-cabinet-formateur"
class Index extends Component{

    render(){
        return(
            <BrowserRouter>
            <Switch>  
                <IsConnect path="/" component={LayoutLogIn} exact />  
                <PrivateRoute  path="/dashboard" component={LayoutDashboard} exact  /> 
                <PrivateRoute  path="/besoins" component={LayoutBesoinsFormations}  /> 
                <PrivateRoute  path="/formations" component={LayoutFormations} /> 
                <PrivateRoute  path="/cabinetsFormateurs" component={LayoutCabinetsFormateurs} />               
            </Switch>
          </BrowserRouter>
        )
    }
}

export default Index