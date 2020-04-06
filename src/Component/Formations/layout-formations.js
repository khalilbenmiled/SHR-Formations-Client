import React , {Component} from "react"
import ComponentTabs from "./component-tabs"
import LayoutNavbar from "../NavBar/layoutNavbar"
import axios from "axios"
import querystring from 'querystring'

class LayoutFormations extends Component {

    constructor(props){
        super(props)
        this.state= {
            listBesoins : [],
            listBesoinsSelected : [],
            quarterSelected : "",
            nbrParticipants :0,
            sessions : [],
            sessionSelected : "",
            dateDebutSelected : "" ,
            dateFinSelected : ""
        }
    }
    
    componentDidMount(){
        axios.get("http://localhost:8686/besoinsPublier/all").then(res => {
                if(res.data.Besoins){
                    this.setState({
                        listBesoins : res.data.Besoins
                    })
                }
        })

        axios.get("http://localhost:8585/sessions").then(res => {
        
            if(res.data.Sessions){
                this.setState({
                    sessions : res.data.Sessions
                })
            }
        })
    }


    disconnect(){
        this.props.history.push({
            pathname : "/"
        })
    }

    besoinSelected(besoin) {
        const tabs = this.state.listBesoinsSelected
        tabs.push(besoin)
        this.setState({
            listBesoinsSelected : tabs,
            quarterSelected : besoin.quarter
        })
        this.state.listBesoinsSelected.map(b=>{
            var nb = this.state.nbrParticipants
            nb = nb + b.nbrPrevu
            this.setState({
                nbrParticipants : nb
            })
            return null
        })
    }

    besoinUnselected(besoin) {
        const tabs = this.state.listBesoinsSelected
        const index = tabs.findIndex(b => b.id === besoin.id)
        tabs.splice(index , 1)
        this.setState({
            listBesoinsSelected : tabs
        })
      
        const nb = besoin.nbrPrevu
        this.setState({
            nbrParticipants : this.state.nbrParticipants - nb
        })
    }

    dateDebutSelected(date){
        this.setState({
            dateDebutSelected : date
        })
    }

    dateFinSelected(date) {
        this.setState({
            dateFinSelected : date
        })
    }

    ajouterSession(nom,description) {
        const session = {
            nom : nom,
            description : description,
            trimestre : this.state.quarterSelected
        }
        axios.post("http://localhost:8585/sessions" , session).then(res => {
            const sessions = this.state.sessions
            sessions.push(res.data.Session)
            this.setState({
                sessions : sessions
            })
        })
    }

    sessionSelected(sessionSelected) {
        this.setState({
            sessionSelected : sessionSelected
        })
    }

    onChangeDuree(duree){
        this.setState({
            duree : duree
        })
    }

    ajouterSessionFormation() {

        var idSession = this.state.sessionSelected.id
        const tabs = []
        var nomTheme = this.state.listBesoinsSelected[0].theme.nom
        var typeTheme = this.state.listBesoinsSelected[0].theme.type
        this.state.listBesoinsSelected.map(besoin => {
            tabs.push(besoin.theme.listModules)
            return null
        })
        var listModules = tabs.filter( (ele, ind) => ind === tabs.findIndex( elem => elem.nom === ele.nom))
        
     
      
        const obj = {
            nomTheme : nomTheme,
            typeTheme : typeTheme,
            dateDebut : this.state.dateDebutSelected.toString(),
            dateFin : this.state.dateFinSelected.toString(),
            maxParticipants : this.state.nbrParticipants,
            duree : this.state.duree,
            idSession : idSession
        }
        axios.post("http://localhost:8585/formations/",
        querystring.stringify(obj), {
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        }
        }).then(res => {
            
        })

        const list = {
            modules : listModules
        }
        axios.post("http://localhost:8585/formations/test", list).then(res => {
            
        })
    
        
       
    }


    render(){
        return (
            <>
                <LayoutNavbar disconnect={this.disconnect.bind(this)}/>
                <div className="container content layoutBesoins">
                        <div className="row">
                            <div className="col-lg-12 col-md-12"  >
                            <ComponentTabs 
                                listBesoins = {this.state.listBesoins}
                                besoinSelected = {this.besoinSelected.bind(this)}
                                quarterSelected = {this.state.quarterSelected}
                                listBesoinsSelected = {this.state.listBesoinsSelected}
                                nbrParticipants = {this.state.nbrParticipants}
                                besoinUnselected = {this.besoinUnselected.bind(this)}
                                dateDebutSelected = {this.dateDebutSelected.bind(this)}
                                dateFinSelected = {this.dateFinSelected.bind(this)}
                                ajouterSession = {this.ajouterSession.bind(this)}
                                sessions = {this.state.sessions}
                                sessionSelected = {this.sessionSelected.bind(this)}
                                onChangeDuree = {this.onChangeDuree.bind(this)}
                                ajouterSessionFormation = {this.ajouterSessionFormation.bind(this)}
                            />
                        </div>    
                    </div>
                </div>
            </>
        )
    }
}
export default LayoutFormations