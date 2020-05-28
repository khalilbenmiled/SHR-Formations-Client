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
import LayoutCollaborateurs from "./Collaborateurs/layout-collaborateurs"
import LayoutDocuments from "./Documents/layout-documents"
import LayoutSalles from "./Salles/layout-salles"
import LayoutNOTFOUND from "./404"

class Index extends Component{

    render(){
        return(
            <BrowserRouter>
            <Switch>  
                <IsConnect path="/" component={LayoutLogIn} exact />  
                <PrivateRoute  path="/dashboard" component={LayoutDashboard} exact  /> 
                <PrivateRoute  path="/besoins" component={LayoutBesoinsFormations} exact /> 
                <PrivateRoute  path="/formations" component={LayoutFormations} /> 
                <PrivateRoute  path="/cabinetsFormateurs" component={LayoutCabinetsFormateurs} exact />               
                <PrivateRoute  path="/elearning" component={LayoutELearnin} exact />               
                <PrivateRoute  path="/themes" component={LayoutThemesModules} exact />               
                <PrivateRoute  path="/utilisateurs" component={LayoutUtilisateur} exact/>  
                <PrivateRoute  path="/collaborateurs" component={LayoutCollaborateurs} exact />  
                <PrivateRoute  path="/documents" component={LayoutDocuments} exact />  
                <PrivateRoute  path="/salles" component={LayoutSalles} exact />  
                <PrivateRoute  path="/404NOTFOUND" component={LayoutNOTFOUND} exact />  
                <PrivateRoute  path="*" component={LayoutNOTFOUND} exact />  
                             
            </Switch>
          </BrowserRouter>
        )
    }
}

export default Index