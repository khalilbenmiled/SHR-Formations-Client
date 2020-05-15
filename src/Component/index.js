import React , { Component } from "react"
import { BrowserRouter, Switch } from "react-router-dom";
import LayoutLogIn from "./LogIn/layoutLogIn"
import LayoutDashboard from "./Dashboard/layoutDashboard"
import PrivateRoute from "./privateRoutes"
import IsConnect from "./isConnected"
import LayoutBesoinsFormations from "./Besoins-Formations/layout-besoins-formations";
import LayoutFormations from "./Formations/layout-formations"
import LayoutCabinetsFormateurs from "./Cabinets-Formateurs/layout-cabinet-formateur"
import LayoutELearnin from "./E-Learning/layout-e-learning"
import LayoutThemesModules from "./Themes&Modules/layout-themes-modules"
import LayoutUtilisateur from "./Utilisateurs/layout-utilisateurs"
import LayoutNOTFOUND from "./404"
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
                <PrivateRoute  path="/elearning" component={LayoutELearnin} />               
                <PrivateRoute  path="/themes" component={LayoutThemesModules} />               
                <PrivateRoute  path="/utilisateurs" component={LayoutUtilisateur} />  
                <PrivateRoute  path="/404NOTFOUND" component={LayoutNOTFOUND} />  
                             
            </Switch>
          </BrowserRouter>
        )
    }
}

export default Index