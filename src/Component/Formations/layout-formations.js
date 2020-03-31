import React , {Component} from "react"
import ComponentTabs from "./component-tabs"
import LayoutNavbar from "../NavBar/layoutNavbar"
import axios from "axios"

class LayoutFormations extends Component {

    constructor(props){
        super(props)
        this.state= {
            listBesoins : []
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
    }


    disconnect(){
        this.props.history.push({
            pathname : "/"
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
                            />
                        </div>    
                    </div>
                </div>
            </>
        )
    }
}
export default LayoutFormations