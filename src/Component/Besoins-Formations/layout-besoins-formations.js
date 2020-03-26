import React , { Component } from "react"
import LayoutNavbar from "../NavBar/layoutNavbar"
import "./besoins.css"
import ComponentTabs from "./component-tabs"
import axios from "axios"
import querystring from 'querystring'
import { Snackbar, Dialog, Button } from "@material-ui/core"
import Alert from "@material-ui/lab/Alert"
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

class Besoins extends Component{

    constructor(props){
        super(props)
        this.state = {
            themes : [],
            allThemes: [],
            modules : [],
            projets : [],
            radioSelected : false,
            moduleSelected : false,
            quarter : "",
            listModulesSelected : [],
            nbrPrevusSelected : "",
            projetSelected : {},
            themeSelected : {},
            listBesoins : [],
            alertBesoin : false,
            alertAction : false,
            alertModule : false,
            alertProjet : false,
            alertValiderBesoin : false,
            alertRemove : false,
            besoinToDelete : "",
            alertBesoinSupprimer : false,
            alertAnnuler : false,
            besoinToAnnuler : "",
            alertBesoinAnnuler : false,
            listBesoinsPublier : [],
            alertBesoinPublier : false,
            besoinToPublier : "",
            snackBesoinPublier: false,
            rapports : []
        }
    }
    componentDidMount(){

        const user = {
            id : JSON.parse(localStorage.user).id
        }

        axios.get("http://localhost:8585/themes").then(res => {
            if(res.data.Theme){
                this.setState({
                    themes : res.data.Theme,
                    allThemes : res.data.Theme
                })
            }
        })

        if(JSON.parse(localStorage.user).role === "TEAMLEAD"){

            axios.post("http://localhost:8686/projets/byTL" , querystring.stringify(user) , {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            }).then(res => {
                this.setState({
                    projets : res.data.Projets
                })
            })
        }else {
            axios.get("http://localhost:8686/projets").then(res => {
                if(res.data.Projets){
                    this.setState({
                        projets : res.data.Projets
                    })
                }
            })
        }


     

        if(JSON.parse(localStorage.user).role === "TEAMLEAD"){

            axios.post("http://localhost:8686/besoins/byTL" , querystring.stringify(user) , {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            }).then(res => {
                if(res.data.BesoinsTL){
                    this.setState({
                        listBesoins : res.data.BesoinsTL
                    })
                }
          
            })

        }else if( JSON.parse(localStorage.user).role === "COLLABORATEUR"){

            axios.post("http://localhost:8686/besoins/byUser" , querystring.stringify(user) , {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            }).then(res => {
                if(res.data.Besoins){
                    this.setState({
                        listBesoins : res.data.Besoins
                    })
                }
            })

        }else if( JSON.parse(localStorage.user).role === "MANAGER") {
            axios.post("http://localhost:8686/besoins/byMG" , querystring.stringify(user) , {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            }).then(res => {
                if(res.data.BesoinsMG){
                    this.setState({
                        listBesoins : res.data.BesoinsMG
                    })
                }
            })
        }else {
            axios.get("http://localhost:8686/besoins").then(res => {
                this.setState({
                    listBesoins : res.data.Besoins
                })
            })
        }
     
        if(JSON.parse(localStorage.user).role === "MANAGER"){
            axios.get("http://localhost:8686/besoinsPublier/").then(res => {
        
                if(res.data.BesoinsPublier){
                    this.setState({
                        listBesoinsPublier : res.data.BesoinsPublier
                    })
                }
            })
        }


    }
 

    onChangeTheme(e){
        if(e.target.value === "TOUS"){
            this.setState({
                themes : this.state.allThemes
            })
        }else {
            const typeFormation = {
                type : e.target.value
            }
            axios.post("http://localhost:8585/themes/type",
            querystring.stringify(typeFormation), {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
            }).then(res => {
                if(res.data.Theme){
                    this.setState({
                        themes : res.data.Theme
                    })
                }
             
        })
        }
    }
    disconnect(){
        this.props.history.push({
            pathname : "/"
        })
    }

    actionSelected(e){
        this.setState({
            radioSelected : true,
            themeSelected : JSON.parse(e.target.value)
        })
       
        const theme = {
            id : JSON.parse(e.target.value).id,
        }

        axios.post("http://localhost:8585/themes/modules",
        querystring.stringify(theme), {
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        }
        }).then(res => {
    
            if(res.data.Modules){
                this.setState({
                    modules : res.data.Modules
                })
            }

        })
    }

    stepper(){
        this.setState({
            radioSelected : false,
            moduleSelected : false
        })
    }

    getModules(e,values){
        this.setState({
            listModulesSelected : values,
        })
       if(values.length === 0){
           this.setState({
               moduleSelected : false
           })
       }else {
           this.setState({
               moduleSelected : true
           })
       }
        
    }


    onChangeTrimeter(e){
        this.setState({
            quarter : e.target.value
        })
    }
  
    getNbrPrevus(e){
        this.setState({
            nbrPrevusSelected : e.target.value
        })
    }
 
    getProjet(e){
        this.setState({
            projetSelected : JSON.parse(e.target.value)
        })
    }
   
    addBesoin(){
        var besoin ;
        if(JSON.parse(localStorage.user).role === "COLLABORATEUR"){
             besoin = {
                bu : JSON.parse(localStorage.user).bu,
                idUser : JSON.parse(localStorage.user).id,
                validerTL : false,
                validerMG : false ,
                theme : {
                    nom : this.state.themeSelected.nom,
                    type : this.state.themeSelected.type,
                    listModules : this.state.listModulesSelected
                }
            }
        }else if(JSON.parse(localStorage.user).role === "TEAMLEAD"){
             besoin = {
                bu : JSON.parse(localStorage.user).bu,
                idUser : JSON.parse(localStorage.user).id,
                validerTL : true,
                validerMG : false,
                dateDebut : this.state.dateDebutSelected,
                quarter : this.state.quarter,
                nbrPrevu : this.state.nbrPrevusSelected,
                theme : {
                    nom : this.state.themeSelected.nom,
                    type : this.state.themeSelected.type,
                    listModules : this.state.listModulesSelected
                },
                projet : {
                    id : this.state.projetSelected.id,
                    nom : this.state.projetSelected.nom,
                    idTeamLead : this.state.idTeamLead
                }
            }
        }else{
        
        }
      
        axios.post("http://localhost:8686/besoins",besoin).then(res => {
           

            const listBesoins = this.state.listBesoins
            const index = listBesoins.findIndex(besoin => besoin.id === res.data.Besoin.id)
            if(index === -1){
                const listBesoins = this.state.listBesoins
                listBesoins.push(res.data.Besoin)
                this.setState({
                    listBesoins : listBesoins,
                    alertBesoin : true
                })
            }else {
                listBesoins.splice(index , 1 , res.data.Besoin)
                this.setState({
                    listBesoins : listBesoins,
                    alertBesoin : true
                })
            }
        
            
        })

    }

    addAction(theme){
        axios.post("http://localhost:8585/themes", theme).then(res => {
            const listThemes = this.state.allThemes
            listThemes.push(res.data.Theme)
            this.setState({
                theme : listThemes,
                alertAction : true
            })
        })
    }

    addModule(module){
        axios.post("http://localhost:8585/modules",module).then(res => {
    

            const obj = {
                idTheme : this.state.themeSelected.id,
                idModule : res.data.Module.id
            }
            axios.post("http://localhost:8585/themes/affecterMAT",
            querystring.stringify(obj), {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
            }).then(res => {
               
            })
            const listModules = this.state.modules
            listModules.push(res.data.Module)
            this.setState({
                modules : listModules,
                alertModule : true
            })
          

        })
            
    }

    addProjet(projet){
        axios.post("http://localhost:8686/projets" , projet).then(res => {
            const listProjets = this.state.projets
            listProjets.push(res.data.Projet)
            this.setState({
                projets : listProjets,
                alertProjet : true
            })
        })
    }

    onValiderBesoin(besoin) {
     

      axios.post("http://localhost:8686/besoins/valider",
      querystring.stringify(besoin), {
      headers: {
          "Content-Type": "application/x-www-form-urlencoded"
      }
      }).then(res => {
            const listBesoins = this.state.listBesoins
            const index = listBesoins.findIndex(besoin => besoin.id === res.data.Besoin.id)
            listBesoins.splice(index , 1 , res.data.Besoin)
            this.setState({
                listBesoins : listBesoins,
                alertValiderBesoin : true
            })
      })
    }

    closeAlertBesoin() {
        this.setState({
            alertBesoin : false
        })
    }

    closeAlertAnnuler() {
        this.setState({
            alertAnnuler : false
        })
    }

    closeAlertBesoinSupprimer(){
        this.setState({
            alertBesoinSupprimer : false
        })
    }

    closeAlertAction() {
        this.setState({
            alertAction : false
        })
    }

    closeAlertModule() {
        this.setState({
            alertModule : false
        })
    }

    closeAlertProjet() {
        this.setState({
            alertProjet : false
        })
    }

    closeAlertValiderBesoin() {
        this.setState({
            alertValiderBesoin : false
        })
    }

    removeBesoin() {
        const besoin = {
            id : this.state.besoinToDelete
        }
        axios.post("http://localhost:8686/besoins/remove",
        querystring.stringify(besoin), {
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        }
        }).then(res => {
            if(res.data.Success){
                const listBesoins = this.state.listBesoins
                const index = listBesoins.findIndex(besoin => besoin.id === this.state.besoinToDelete)
                listBesoins.splice(index , 1)
                this.setState({
                    listBesoins : listBesoins,
                    alertRemove : false,
                    alertBesoinSupprimer : true
                })
            } 
        })
    }

    annulerBesoin() {
        const besoin = {
            idBesoin : this.state.besoinToAnnuler
        }
        axios.post("http://localhost:8686/besoins/annulerValidationTL",
        querystring.stringify(besoin), {
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        }
        }).then(res => {
            if(res.data.Besoin){
                const listBesoins = this.state.listBesoins
                const index = listBesoins.findIndex(besoin => besoin.id === this.state.besoinToAnnuler)
                listBesoins.splice(index , 1 , res.data.Besoin)
                this.setState({
                    listBesoins : listBesoins,
                    alertAnnuler : false,
                    alertBesoinAnnuler : true
                })
            } 
        })
        
    }

    openAlertRemoveBesoin (row) {
        
        this.setState({
            alertRemove : true,
            besoinToDelete : row.id
        })

    }

    openAlertAnnulerBesoin (row) {
        this.setState({
            alertAnnuler : true,
            besoinToAnnuler : row.id
        })
    } 

    closeAlertBesoinAnnuler () {
        this.setState({
            alertBesoinAnnuler : false
        })
    } 

    closeAlertRemoveBesoin(){
        this.setState({
            alertRemove : false
        })
    }

    annulerByManager(besoin) {
        const id = besoin.id
        const obj = {
            idBesoin : besoin.id
        }
        axios.post("http://localhost:8686/besoins/annulerValidationMG",
        querystring.stringify(obj), {
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        }
        }).then(res => {
            if(res.data.Besoin){
                const listBesoins = this.state.listBesoins
                const index = listBesoins.findIndex(besoin => besoin.id === id)
                listBesoins.splice(index , 1 , res.data.Besoin)
                this.setState({
                    listBesoins : listBesoins,
                    alertBesoinAnnuler : true
                })
            } 
            
        })

        axios.post("http://localhost:8686/besoinsPublier/retirer",
        querystring.stringify(obj), {
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        }
        }).then(res => {
          
            if(res.data.BesoinPublier){
                if(res.data.BesoinPublier.listBesoins.length === 0){
                    const listBesoinsPublier = this.state.listBesoinsPublier
                    const index = listBesoinsPublier.findIndex(besoin => besoin.id === res.data.BesoinPublier.id)
                    listBesoinsPublier.splice(index , 1 )
                    this.setState({
                        listBesoinsPublier : listBesoinsPublier
                    })
                   }
            }else {
                const listBesoinsPublier = this.state.listBesoinsPublier
                const index = listBesoinsPublier.findIndex(besoin => besoin.id === res.data.Success)
                listBesoinsPublier.splice(index , 1 )
                this.setState({
                    listBesoinsPublier : listBesoinsPublier
                })
            }
     
        })
    }

    validerByManager(besoin) {
        const obj = {
            idBesoin : besoin.id
        }


        axios.post("http://localhost:8686/besoins/validerMG",
        querystring.stringify(obj), {
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        }
        }).then(res => {
              const listBesoins = this.state.listBesoins
              const index = listBesoins.findIndex(besoin => besoin.id === res.data.Besoin.id)
              listBesoins.splice(index , 1 , res.data.Besoin)
              this.setState({
                  listBesoins : listBesoins,
                  alertValiderBesoin : true
              })
        })

        
        axios.post("http://localhost:8686/besoinsPublier/publier",
        querystring.stringify(obj), {
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        }
        }).then(res => {

            if(res.data.BesoinPublier.listBesoins.length === 1){
                const listBesoinsPublier = this.state.listBesoinsPublier
                listBesoinsPublier.push(res.data.BesoinPublier)
                this.setState({
                    listBesoinsPublier : listBesoinsPublier
                })
            }else{
                const listBesoinsPublier = this.state.listBesoinsPublier
                const index = listBesoinsPublier.findIndex(besoin => besoin.id === res.data.BesoinPublier.id)
                listBesoinsPublier.splice(index , 1 , res.data.BesoinPublier)
                this.setState({
                    listBesoinsPublier : listBesoinsPublier
                })
            }
         
        })

        

    }

    closeAlertBesoinPublier(){
        this.setState({
            alertBesoinPublier : false
        })
    }

    openPublierBesoin (besoin) {
        this.setState({
            besoinToPublier : besoin.id,
            alertBesoinPublier : true
        })
    }
    publierBesoin() {
      
        const obj = {
            id : this.state.besoinToPublier
        }
        axios.post("http://localhost:8686/besoinsPublier/publierBesoin",
        querystring.stringify(obj), {
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        }
        }).then(res => {

            const listBesoinsPublier = this.state.listBesoinsPublier
            const index = listBesoinsPublier.findIndex(besoin => besoin.id === res.data.BesoinPublier.id)
            listBesoinsPublier.splice(index , 1 )
            this.setState({
                listBesoinsPublier : listBesoinsPublier
            })
            res.data.BesoinPublier.listBesoins.map(b=>{

                const listBesoins = this.state.listBesoins
                const index = listBesoins.findIndex(besoin => besoin.id === b.id)
                listBesoins.splice(index , 1)
                this.setState({
                    listBesoins : listBesoins
                })
                return null
            })
        })
        
        this.setState({
            alertBesoinPublier : false,
            snackBesoinPublier : true
        })
    }

    closeSnackBesoinPublier(){
        this.setState({
            snackBesoinPublier : false
        })
    }

    filter(type,nomTheme,quarter,projet,tl,mg,bu,publier){
    if(JSON.parse(localStorage.user).role === "TEAMLEAD"){

        
        const obj = {
            typeTheme : type,
            nomTheme : nomTheme,
            quarter : quarter,
            idProjet : projet !== "" ? projet : 0,
            validerTL : tl,
            validerMG : mg,
            idTL : JSON.parse(localStorage.user).id,
            publier : publier
        }
      
        axios.post("http://localhost:8686/besoins/rapportsTL",
        querystring.stringify(obj), {
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        }
        }).then(res => {
            var array = []
            var actionArray = Object.keys(res.data.RapportsBesoinsTL)
            actionArray.map((key,index) => {
               
                var quarterArray = Object.keys(res.data.RapportsBesoinsTL[key])
                quarterArray.map((cle , i) => {
                    let uniqueModules = []
                    var nbPrevu = 0
                    res.data.RapportsBesoinsTL[key][cle].map(besoin => {
                        nbPrevu = nbPrevu + besoin.nbrPrevu
                        besoin.theme.listModules.map(module => {
                                uniqueModules.push(module)
                                return null
                        })
                        return null
                    })
                    let pp = uniqueModules.filter( (ele, ind) => ind === uniqueModules.findIndex( elem => elem.nom === ele.nom))

                    var obj = {
                        theme : key,
                        quarter : cle,
                        nbrPrevu : nbPrevu,
                        besoins : res.data.RapportsBesoinsTL[key][cle],
                        listModules : pp
                    }
                    array.push(obj)
                    return null
                })
               return null
            })
                       
            this.setState({
                rapports : array
            })
         
        })

    }else if(JSON.parse(localStorage.user).role === "MANAGER"){

        const obj = {
            typeTheme : type,
            nomTheme : nomTheme,
            quarter : quarter,
            idProjet : projet !== "" ? projet : 0,
            validerMG : mg,
            idManager : JSON.parse(localStorage.user).id,
            publier : publier
        }
      
        axios.post("http://localhost:8686/besoins/rapportsMG",
        querystring.stringify(obj), {
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        }
        }).then(res => {
            var array = []
            var actionArray = Object.keys(res.data.RapportsBesoinsMG)
            actionArray.map((key,index) => {
               
                var quarterArray = Object.keys(res.data.RapportsBesoinsMG[key])
                quarterArray.map((cle , i) => {
                    let uniqueModules = []
                    var nbPrevu = 0
                    res.data.RapportsBesoinsMG[key][cle].map(besoin => {
                        nbPrevu = nbPrevu + besoin.nbrPrevu
                        besoin.theme.listModules.map(module => {
                                uniqueModules.push(module)
                                return null
                        })
                        return null
                    })
                    let pp = uniqueModules.filter( (ele, ind) => ind === uniqueModules.findIndex( elem => elem.nom === ele.nom))

                    var obj = {
                        theme : key,
                        quarter : cle,
                        nbrPrevu : nbPrevu,
                        besoins : res.data.RapportsBesoinsMG[key][cle],
                        listModules : pp
                    }
                    array.push(obj)
                    return null
                })
               return null
            })
                       
            this.setState({
                rapports : array
            })
         
        })
    }else {
        const obj = {
            typeTheme : type,
            nomTheme : nomTheme,
            quarter : quarter,
            idProjet : projet !== "" ? projet : 0,
            validerMG : mg,
            validerTL : tl,
            bu : bu,
            publier : publier
        }
      
        axios.post("http://localhost:8686/besoins/rapports",
        querystring.stringify(obj), {
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        }
        }).then(res => {
            var array = []
            var actionArray = Object.keys(res.data.RapportsBesoins)
            actionArray.map((key,index) => {
               
                var quarterArray = Object.keys(res.data.RapportsBesoins[key])
                quarterArray.map((cle , i) => {
                    let uniqueModules = []
                    var nbPrevu = 0
                    res.data.RapportsBesoins[key][cle].map(besoin => {
                        nbPrevu = nbPrevu + besoin.nbrPrevu
                        besoin.theme.listModules.map(module => {
                                uniqueModules.push(module)
                                return null
                        })
                        return null
                    })
                    let pp = uniqueModules.filter( (ele, ind) => ind === uniqueModules.findIndex( elem => elem.nom === ele.nom))

                    var obj = {
                        theme : key,
                        quarter : cle,
                        nbrPrevu : nbPrevu,
                        besoins : res.data.RapportsBesoins[key][cle],
                        listModules : pp
                    }
                    array.push(obj)
                    return null
                })
               return null
            })
                       
            this.setState({
                rapports : array
            })
         
        })
    }
        
    }

    render(){
        return(
            <>
             <LayoutNavbar disconnect={this.disconnect.bind(this)}/>
             
             <div className="container content layoutBesoins">
                <div className="row">
                    <div className="col-lg-12 col-md-12"  >
                        <ComponentTabs 
                               themes={this.state.themes} 
                               allThemes= {this.state.allThemes}
                               onChangeTheme={this.onChangeTheme.bind(this)}
                               actionSelected={this.actionSelected.bind(this)}
                               modules = {this.state.modules}
                               projets = {this.state.projets}
                               radioSelected = {this.state.radioSelected}
                               stepper = {this.stepper.bind(this)}
                               moduleSelected = {this.state.moduleSelected}
                               getModules = {this.getModules.bind(this)}
                               getNbrPrevus ={this.getNbrPrevus.bind(this)}
                               getProjet = {this.getProjet.bind(this)}
                               addBesoin = {this.addBesoin.bind(this)}
                               addAction = {this.addAction.bind(this)}
                               addModule = {this.addModule.bind(this)}
                               addProjet = {this.addProjet.bind(this)}
                               onChangeTrimeter ={this.onChangeTrimeter.bind(this)}
                               listBesoins = {this.state.listBesoins}
                               onValiderBesoin = {this.onValiderBesoin.bind(this)}
                               openAlertRemoveBesoin = {this.openAlertRemoveBesoin.bind(this)}
                               openAlertAnnulerBesoin = {this.openAlertAnnulerBesoin.bind(this)}
                               validerByManager = {this.validerByManager.bind(this)}
                               annulerByManager = {this.annulerByManager.bind(this)}
                               listBesoinsPublier = {this.state.listBesoinsPublier}
                               openPublierBesoin = {this.openPublierBesoin.bind(this)}
                               filter = {this.filter.bind(this)}
                               rapports = {this.state.rapports}
                            
                        />
                    </div>
                </div>
            </div>
            <Snackbar open={this.state.alertBesoin} autoHideDuration={5000} onClose={this.closeAlertBesoin.bind(this)}>
                    <Alert  onClose={this.closeAlertBesoin.bind(this)} icon = {<CheckCircleIcon style={{color : "white" }}/>} style={{backgroundColor : "#4CAF50" , color : "white" , width : 400 , fontSize : 16}}>
                            Besoin enregistrer avec succès
                    </Alert>
            </Snackbar>
            <Snackbar open={this.state.alertAction} autoHideDuration={5000} onClose={this.closeAlertAction.bind(this)}>
                    <Alert  onClose={this.closeAlertAction.bind(this)} icon = {<CheckCircleIcon style={{color : "white" }}/>} style={{backgroundColor : "#4CAF50" , color : "white" , width : 400 , fontSize : 16}}>
                            Action de formation enregistrer 
                    </Alert>
            </Snackbar>
            <Snackbar open={this.state.alertModule} autoHideDuration={5000} onClose={this.closeAlertModule.bind(this)}>
                    <Alert  onClose={this.closeAlertModule.bind(this)} icon = {<CheckCircleIcon style={{color : "white" }}/>} style={{backgroundColor : "#4CAF50" , color : "white" , width : 400 , fontSize : 16}}>
                            Module de formation enregistrer 
                    </Alert>
            </Snackbar>
            <Snackbar open={this.state.alertProjet} autoHideDuration={5000} onClose={this.closeAlertProjet.bind(this)}>
                    <Alert  onClose={this.closeAlertProjet.bind(this)} icon = {<CheckCircleIcon style={{color : "white" }}/>} style={{backgroundColor : "#4CAF50" , color : "white" , width : 400 , fontSize : 16}}>
                            Projet enregistrer 
                    </Alert>
            </Snackbar>
            <Snackbar open={this.state.alertValiderBesoin} autoHideDuration={5000} onClose={this.closeAlertValiderBesoin.bind(this)}>
                    <Alert  onClose={this.closeAlertValiderBesoin.bind(this)} icon = {<CheckCircleIcon style={{color : "white" }}/>} style={{backgroundColor : "#4CAF50" , color : "white" , width : 400 , fontSize : 16}}>
                            Besoin valider 
                    </Alert>
            </Snackbar>
            <Snackbar open={this.state.alertBesoinSupprimer} autoHideDuration={5000} onClose={this.closeAlertBesoinSupprimer.bind(this)}>
                    <Alert  onClose={this.closeAlertBesoinSupprimer.bind(this)} icon = {<CheckCircleIcon style={{color : "white" }}/>} style={{backgroundColor : "#4CAF50" , color : "white" , width : 400 , fontSize : 16}}>
                            Besoin supprimer
                    </Alert>
            </Snackbar>
            <Snackbar open={this.state.alertBesoinAnnuler} autoHideDuration={5000} onClose={this.closeAlertBesoinAnnuler.bind(this)}>
                    <Alert  onClose={this.closeAlertBesoinAnnuler.bind(this)} icon = {<CheckCircleIcon style={{color : "white" }}/>} style={{backgroundColor : "#4CAF50" , color : "white" , width : 400 , fontSize : 16}}>
                            Besoin annuler
                    </Alert>
            </Snackbar>
            <Snackbar open={this.state.snackBesoinPublier} autoHideDuration={5000} onClose={this.closeSnackBesoinPublier.bind(this)}>
                    <Alert  onClose={this.closeSnackBesoinPublier.bind(this)} icon = {<CheckCircleIcon style={{color : "white" }}/>} style={{backgroundColor : "#4CAF50" , color : "white" , width : 400 , fontSize : 16}}>
                            Besoin publier
                    </Alert>
            </Snackbar>
            <Dialog
                open={this.state.alertRemove}
                onClose={this.closeAlertRemoveBesoin.bind(this)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                    <DialogTitle className="titleDialog">Supprimer BESOIN</DialogTitle>
                    <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Voulez-vous vraiment supprimer ce besoin de formation ?
                    </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                    <Button className="annulerBtn" onClick={this.closeAlertRemoveBesoin.bind(this)} style={{backgroundColor : "#E67A0A" , color : "white"}}>
                        Retour
                    </Button>
                    <Button className="supprimerBtn" onClick={this.removeBesoin.bind(this)} style={{backgroundColor : "#B51B10" , color : "white" }} >
                        Supprimer
                    </Button>
                    </DialogActions>
            </Dialog>

            <Dialog
                open={this.state.alertAnnuler}
                onClose={this.closeAlertAnnuler.bind(this)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                    <DialogTitle className="titleDialog">Annuler BESOIN</DialogTitle>
                    <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Voulez-vous vraiment annuler ce besoin de formation ?
                    </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                    <Button className="annulerBtn" onClick={this.closeAlertAnnuler.bind(this)} style={{backgroundColor : "#E67A0A" , color : "white"}}>
                        Retour
                    </Button>
                    <Button className="supprimerBtn" onClick={this.annulerBesoin.bind(this)} style={{backgroundColor : "#B51B10" , color : "white" }} >
                        Annuler
                    </Button>
                    </DialogActions>
            </Dialog>

            <Dialog
                open={this.state.alertBesoinPublier}
                onClose={this.closeAlertBesoinPublier.bind(this)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                    <DialogTitle className="titleDialog">Publier besoin</DialogTitle>
                    <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Voulez-vous vraiment publier ce besoin de formation ?
                    </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                    <Button className="annulerBtn" onClick={this.closeAlertBesoinPublier.bind(this)} style={{backgroundColor : "#E67A0A" , color : "white"}}>
                        Retour
                    </Button>
                    <Button className="supprimerBtn" onClick={this.publierBesoin.bind(this)} style={{backgroundColor : "#B51B10" , color : "white" }} >
                        Publier
                    </Button>
                    </DialogActions>
            </Dialog>   

            </>
        )
    }
}

export default Besoins