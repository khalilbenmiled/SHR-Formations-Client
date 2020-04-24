import React from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction' // needed for dayClick
import '@fullcalendar/core/main.css';
import '@fullcalendar/daygrid/main.css';
import "./fullCalendar.css"
import frLocale from '@fullcalendar/core/locales/fr';
import bootstrap from "@fullcalendar/bootstrap"
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import { Button } from '@material-ui/core'
import Moment from 'moment';
import 'moment/locale/fr'
import listPlugin from '@fullcalendar/list';
import ComponentModalCalendrier from "./component-modal-calendrier"
import axios from "axios"
import querystring from 'querystring'

export default class DemoApp extends React.Component {

  constructor(props) {
    super(props)
    
    this.state = {
      listParticipants: [],
      date : "",
      calendarWeekends: true,
      calendarEvents: props.events,
      openModal : false,
      session :"",
      formation : {
        dateDebut : "",
        dateFin : "",
        theme : {
          nom : "",
          type : "",
          listModules : [{
            nom : "",
            description : ""
          }]
        },
        duree : "",
        maxParticipants : ""
      }
    }
  }

  calendarComponentRef = React.createRef()
 
  componentDidMount() {
    Moment.locale("fr");
    const date = this.calendarComponentRef.current.getApi().getDate()
    const dateFormat = Moment(date).format("MMMM YYYY")
    this.setState({
      date : dateFormat.toString()
    })
  }

  prevMonth() {
    this.calendarComponentRef.current.getApi().prev()
    Moment.locale("fr");
    const date = this.calendarComponentRef.current.getApi().getDate()
    const dateFormat = Moment(date).format("MMMM YYYY")
    this.setState({
      date : dateFormat.toString()
    })
  }

  nextMonth() {
    this.calendarComponentRef.current.getApi().next()
    Moment.locale("fr");
    const date = this.calendarComponentRef.current.getApi().getDate()
    const dateFormat = Moment(date).format("MMMM YYYY")
    this.setState({
      date : dateFormat.toString()
    })
  }

  today() {
    this.calendarComponentRef.current.getApi().today()
    Moment.locale("fr");
    const date = this.calendarComponentRef.current.getApi().getDate()
    const dateFormat = Moment(date).format("MMMM YYYY")
    this.setState({
      date : dateFormat.toString()
    })
  }
 
 
  handleClose() {
    this.setState({
      openModal : false
    })
  }

  handleEventClick = (event,el) => {
    const input = {
      id : event.event.id
    }
    axios.post("http://localhost:8585/formations/byId",
    querystring.stringify(input), {
    headers: {
        "Content-Type": "application/x-www-form-urlencoded"
    }
    }).then(res => {
        if(res.data.Formation){
          this.setState({
            openModal : true,
            formation : res.data.Formation
          })
                  
        }else {
          this.setState({
            openModal : false,
          })
        }
    })
    
    const obj = {
      idFormation : event.event.id
    }
    axios.post("http://localhost:8585/sessions/byFormation",
    querystring.stringify(obj), {
    headers: {
        "Content-Type": "application/x-www-form-urlencoded"
    }
    }).then(res => {
      if(res.data.Session){
        this.setState({
          session : res.data.Session
        })
      }
    })

  }

  fetchParticipants () {
    const input = {
      id : this.state.formation.id
    }
 
    axios.post("http://localhost:8585/formations/participants",
    querystring.stringify(input), {
    headers: {
        "Content-Type": "application/x-www-form-urlencoded"
    }
    }).then(res => {
        if(res.data.Participants){
          this.setState({
            listParticipants : res.data.Participants
          })
        }
        
    })
  }

  render() {
    return (
      <>
      <div className='demo-app'>
        <div className='demo-app-calendar'>
         <div className="row">
           <div className="col-lg-4 col-md-4" style={{paddingTop : "10px"}}>
              <ArrowBackIosIcon style={{color :"#B51B10" , cursor : "pointer"}} onClick={this.prevMonth.bind(this)} />
              <ArrowForwardIosIcon style={{color :"#B51B10" , cursor : "pointer"}} onClick={this.nextMonth.bind(this)}/>
           </div>
           <div className="col-lg-4 col-md-4">
              <h3 style={{textAlign : "center" , color : "#B51B10" }} >{this.state.date}</h3>
           </div>
           <div className="col-lg-4 col-md-4" >
             <Button style = {{backgroundColor : "#E67A0A" , color : "#fff"}}className="buttonAjourdhui" variant="contained" size="small" onClick={this.today.bind(this)}>Aujourd'hui</Button>
           </div>
         </div>
          <FullCalendar
            locale = {frLocale}
            defaultView="dayGridMonth"
            header={{
              left: '',
              center: '',
              right: ''
            }}
            plugins={[ dayGridPlugin, timeGridPlugin, interactionPlugin , bootstrap , listPlugin ]}
            ref={ this.calendarComponentRef }
            weekends={ this.state.calendarWeekends }
            events={ this.state.calendarEvents }
            
            eventClick={this.handleEventClick}
            />
        </div>
      </div>
           <ComponentModalCalendrier
              open={this.state.openModal} 
              handleClose = {this.handleClose.bind(this)} 
              formation = {this.state.formation}
              session = {this.state.session}
              fetchParticipants = {this.fetchParticipants.bind(this)}
              listParticipants = {this.state.listParticipants}
            />
      </>
    )
  }

  


}
