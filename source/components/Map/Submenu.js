import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import { Button, Menu,Dropdown, Icon as Tubiao } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import GoogleMapReact from 'google-map-react';
import GoogleMap from 'google-map-react';
import * as FontAwesome from 'react-icons/lib/fa'
//import Menu, { SubMenu, Item as MenuItem } from 'rc-menu';
import createReactClass from 'create-react-class';
import ReactModal from 'react-modal';
import { Icon } from 'semantic-ui-react'
import { Input } from 'semantic-ui-react'
import NewChat from './NewChat.js';
import DatePicker from 'react-date-picker';
import styles from './Submenu.css';
const posturl = 'http://fengshuang.org:3000/api/post/'
class Submenu extends Component {
  constructor () {
    super();
    this.state = {
      build: null,
      showChat: false,
      showEvent: false,
      showHelper: false,
      helperlocation:[0, 0],
      eventlocation:[0, 0],
      helperdate: new Date(),
      eventdate: new Date(),
      helperinputvalue:'please enter',
      eventinputvalue:'please enter'
    };
    this.buildChat = this.buildChat.bind(this);
    this.closeChat = this.closeChat.bind(this);




    this.buildEvent = this.buildEvent.bind(this);
    this.closeEvent = this.closeEvent.bind(this);
    this.selectEvent = this.selectEvent.bind(this);
    this.eventlocate = this.helperlocate.bind(this);
    this.onEventdateChange= this.onEventdateChange.bind(this);
    this.updateEventInputValue = this.updateEventInputValue.bind(this);
    this.createEvent = this.createEvent.bind(this);




    this.helperlocate = this.helperlocate.bind(this);
    this.buildHelper = this.buildHelper.bind(this);
    this.closeHelper = this.closeHelper.bind(this);
    this.createHelper = this.createHelper.bind(this);
    this.selectHelper = this.selectHelper.bind(this);
    this.onHelperdateChange= this.onHelperdateChange.bind(this);
    this.updateHelperInputValue = this.updateHelperInputValue.bind(this);
  }
  // onClick(info) {
  //   console.log('click ', info);
  //  }

  //-----------------------chat relative method---------------
  buildChat() {
    this.setState({
      build: '1',
      showChat: true
    })
  }

  closeChat () {

    this.setState({ showChat: false });
  }





//----------------------------event relative method-----------------------------

  buildEvent() {
      this.setState({
        build: '2',
        showEvent: true,
        eventlocation:[0,0]
      })
    }
closeEvent () {

    this.setState({ showEvent: false });
    this.props.transferMsg((obj) => {})
    }
    selectEvent() {
        this.setState({ showEvent: false });
        this.props.transferMsg((obj) =>
        {
            this.setState(
                {eventlocation:[obj.lat,obj.lng]}
            )
            this.setState({ showEvent: true });
        })
    }

    updateEventInputValue(e) {
        this.setState({
            eventinputvalue: e.target.value
        })
    }
    createEvent() {
        this.setState({ showEvent: false });
        this.props.transferMsg((obj) => {})
        // this.props.addstate(this.state.location)
        axios.post(posturl,{
         text:this.state.eventinputvalue,
         type:'chat',
         latitude:this.state.eventlocation[0],
         longitude:this.state.eventlocation[1],
         },{withCredentials:true})
     .then(function (response) {
         console.log(response)

     }).catch(function (error) {

     });

    }

    eventlocate(){
  if (navigator.geolocation) {
      var x;
      var y;
      navigator.geolocation.getCurrentPosition(pos =>  {
          var crd = pos.coords;
          x = crd.latitude;
          y = crd.longitude;
          this.setState({
              eventlocation:[x,y]
          })
      })

  }
  else {
      this.setState(
          {eventlocation:[0,0]}
      )
  }
}

selectEvent() {
    this.setState({ showEvent: false });
    this.props.transferMsg((obj) =>
    {
        this.setState(
            {eventlocation:[obj.lat,obj.lng]}
        )
        this.setState({ showEvent: true });
    })

}
onEventdateChange(date){this.setState({ eventdate:date })}





//----------------------helper relative method------------------------------------
  buildHelper() {
      this.setState({
        build: '3',
        showHelper: true,
        helperlocation:[0,0]
      })

    }

    onHelperdateChange(date){this.setState({ helperdate:date })}
    closeHelper() {

      this.setState({ showHelper: false });
      this.props.transferMsg((obj) => {})
      // this.props.addstate(this.state.location)
    }
    selectHelper() {
        this.setState({ showHelper: false });
        this.props.transferMsg((obj) =>
        {
            this.setState(
                {helperlocation:[obj.lat,obj.lng]}
            )
            this.setState({ showHelper: true });
        })

    }
  helperlocate(){
if (navigator.geolocation) {
    var x;
    var y;
    navigator.geolocation.getCurrentPosition(pos =>  {
        var crd = pos.coords;
        x = crd.latitude;
        y = crd.longitude;
        this.setState({
            helperlocation:[x,y]
        })
    })

}
else {
    this.setState(
        {helperlocation:[0,0]}
    )
}

  }
createHelper() {
    this.setState({ showHelper: false });
    this.props.transferMsg((obj) => {})
    // this.props.addstate(this.state.location)
    axios.post(posturl,{
     text:this.state.helperinputvalue,
     type:'chat',
     latitude:this.state.helperlocation[0],
     longitude:this.state.helperlocation[1],
     },{withCredentials:true})
 .then(function (response) {
     console.log(response)

 }).catch(function (error) {

 });

}



updateHelperInputValue(e) {
    this.setState({
        helperinputvalue: e.target.value
    })
}



  getMenu() {
    return (
  <Menu vertical>
   <Dropdown item text='Menu'>
     <Dropdown.Menu>
       <Dropdown.Item><Button onClick = {this.buildChat}>New Chat</Button></Dropdown.Item>
       <Dropdown.Item><Button onClick = {this.buildEvent}>New Event</Button></Dropdown.Item>
       <Dropdown.Item><Button onClick = {this.buildHelper}>New Helper</Button></Dropdown.Item>
     </Dropdown.Menu>
   </Dropdown>
 </Menu>
//       <div class="ui floating labeled icon dropdown button">
//   <i class="dropdown icon"></i>
//   <span class="text">Menu</span>
//   <div class="menu">
//     <div class="item">
//       <i class="left dropdown icon"></i>
//       <span class="text">Add New</span>
//       <div class="left menu">
//         <div class="item"><Button onClick = {this.buildChat}>New Chat</Button></div>
//         <div class="item"><Button onClick = {this.buildEvent}>New Event</Button></div>
//         <div class="item"><Button onClick = {this.buildHelper}>New Helper</Button></div>
//       </div>
//     </div>
//     <div class="item">
//       <i class="dropdown icon"></i>
//       <span class="text">Right</span>
//       <div class="right menu">
//         <div class="item">1</div>
//         <div class="item">2</div>
//         <div class="item">3</div>
//       </div>
//     </div>
//   </div>
// </div>
    );
  }

  render() {
    return (
    <div>
      <div className = 'dropmenu' >{this.getMenu()}</div>

      <div className = 'buildItem' >
      {
          this.state.build == '1'
          ? <ReactModal
           isOpen={this.state.showChat}
           contentLabel="Minimal Modal Example"
           >
             <Button onClick={this.closeChat}>Close Modal</Button>
           </ReactModal>
           : null
       }
       {
           this.state.build == '2'
           ? <ReactModal
            isOpen={this.state.showEvent}
            contentLabel="Minimal Modal Example"
            style = {{ height: 50 , width : 50, backgroundColor: 'powderblue'}} >
            <div>
           <Input type="text" placeholder={this.state.eventlocation} />
           <FontAwesome.FaMapMarker onClick = {this.eventlocate} style = {{ height: 50 , width : 150, backgroundColor: 'powderblue'}} type = 'button'/>
           <Button style = {{ height: 50 , width : 150, backgroundColor: 'powderblue'}} onClick={this.selectEvent}>Select Location</Button>
           </div>
           <DatePicker onChange={this.onEventdateChange} value={this.state.eventdate}/>
           <Input type="text" value={this.state.eventinputvalue} onChange= {(evt) => this.updateEventInputValue(evt) }/>
           <Button onClick={this.createEvent}>Create New Event</Button>
           <Button onClick={this.closeEvent}>Close Modal</Button>
            </ReactModal>
            : null
        }
        {
            this.state.build == '3'
            ? <ReactModal
             isOpen={this.state.showHelper}
             contentLabel="Minimal Modal Example"
             >
                <div>
               <Input type="text" placeholder={this.state.helperlocation} />
               <FontAwesome.FaMapMarker onClick = {this.helperlocate} style = {{ height: 50 , width : 150, backgroundColor: 'powderblue'}} type = 'button'/>
               <Button style = {{ height: 50 , width : 150, backgroundColor: 'powderblue'}} onClick={this.selectHelper}>Select Location</Button>
               </div>
               <DatePicker onChange={this.onHelperdateChange} value={this.state.helperdate}/>
               <Input type="text" value={this.state.helperinputvalue} onChange= {(evt) => this.updateHelperInputValue(evt) }/>
               <Button onClick={this.createHelper}>Create New Helper</Button>
               <Button onClick={this.closeHelper}>Close Modal</Button>
             </ReactModal>
             : null
         }
       </div>
    </div>
  );
  }
}



export default Submenu;
