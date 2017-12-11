import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import { Button, Menu,Dropdown, Grid, Label, Icon as Tubiao } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import GoogleMapReact from 'google-map-react';
import GoogleMap from 'google-map-react';
import * as FontAwesome from 'react-icons/lib/fa'
//import Menu, { SubMenu, Item as MenuItem } from 'rc-menu';
import createReactClass from 'create-react-class';
import ReactModal from 'react-modal';
import { Icon } from 'semantic-ui-react'
import { withRouter, browserHistory} from 'react-router'
import { Input } from 'semantic-ui-react'
import NewChat from './NewChat.js';
import DatePicker from 'react-date-picker';
import styles from './Submenu.css';
axios.defaults.withCredentials = true;
const posturl = 'http://fengshuang.org:3000/api/post/'
const logouturl = 'http://fengshuang.org:3000/api/logout/'
class Submenu extends Component {
  constructor () {
    super();
    this.state = {
      build: null,
      showChat: false,
      showEvent: false,
      showHelper: false,
      chatlocation:[0,0],
      helperlocation:[0, 0],
      eventlocation:[0, 0],
      helperdate: new Date(),
      eventdate: new Date(),
      helperinputvalue:'please enter',
      eventinputvalue:'please enter',
      chatinputvalue:'please enter'
    };
    this.buildChat = this.buildChat.bind(this);
    this.closeChat = this.closeChat.bind(this);
    this.createChat = this.createChat.bind(this);
    this.chatlocate = this.chatlocate.bind(this);




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

    this.logout = this.logout.bind(this);
  }
  // onClick(info) {
  //   console.log('click ', info);
  //  }

  //-----------------------chat relative method---------------
  buildChat() {
    this.setState({
      build: '1',
      showChat: true,
      chatlocation:[10,20.11122]
    })
  }

  closeChat () {
    this.setState({ showChat: false });
  }
  createChat() {
      this.setState({ showChat: false });
      // this.chatlocate()
      axios.post(posturl,{
       text:this.state.chatinputvalue,
       type:'chat',
       latitude:this.props.userlocation[0],
       longitude:this.props.userlocation[1],
       },{withCredentials:true})
   .then(function (response) {
       console.log(response)

   }).catch(function (error) {

   });

  }

 chatlocate(){
if (navigator.geolocation) {
    var x;
    var y;
    navigator.geolocation.getCurrentPosition(pos =>  {
        var crd = pos.coords;
        x = crd.latitude;
        y = crd.longitude;
        this.setState({
            chatlocation:[x,y]
        })
    })

}
else {
    this.setState(
        {chatlocation:[0,0]}
    )
}

  }

  updateChatInputValue(e) {
      this.setState({
          chatinputvalue: e.target.value
      })
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





//log out loginprocess
logout() {
    axios.get(logouturl,{withCredentials:true})
 .then( (response) => {
     console.log(response)
     this.props.logoutprocess('hah');

 }).catch(function (error) {

 });
}

  getMenu() {
    return (
  <Menu vertical>
   <Dropdown item text='Menu'>
     <Dropdown.Menu>
       <Dropdown.Item><Button onClick = {this.buildChat}>New Chat</Button></Dropdown.Item>
       <Dropdown.Item><Button onClick = {this.buildEvent}>New Event</Button></Dropdown.Item>
       <Dropdown.Item><Button onClick = {this.buildHelper}>New Helper</Button></Dropdown.Item>
       <Dropdown.Item><Button onClick = {this.logout}>Logout</Button></Dropdown.Item>
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
             <Input type="text" value={this.state.chatinputvalue} onChange= {(evt) => this.updateChatInputValue(evt) }/>
             <Button onClick={() => this.createChat()}>Create New Chat</Button>

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
            <Button style = {{height: 30 , width : 60}} onClick={this.closeEvent}>Close</Button>
            <br />
            <Grid>
            <Grid.Column width={3}>
            <Input type='text' style = {{ height: 30 , width : 150}} placeholder={this.state.eventlocation} />
            <Label pointing>Your Location</Label>
            </Grid.Column>
                <Grid.Column width={3}>
                <Button style = {{ height: 30 , width : 150, backgroundColor: 'powderblue'}} onClick={this.selectEvent}>Select Location</Button>
                 </Grid.Column>
                  <Grid.Column width={3}>
                <FontAwesome.FaMapMarker onClick = {this.eventlocate} style = {{ height: 50 , width : 150, backgroundColor: 'powderblue'}} type = 'button'/>
              </Grid.Column>
            </Grid>
           </div>
           <Grid>
           <Grid.Column width={3}>
           <Input type="text" style = {{ height: 30 , width : 150}} value={this.state.eventinputvalue} onChange= {(evt) => this.updateEventInputValue(evt) } placeholder="please enter"/>
           <Label pointing>Your Date</Label>
           </Grid.Column>
           <Grid.Column width={3}>
           <DatePicker className='date' onChange={this.onEventdateChange} value={this.state.eventdate}/>
           </Grid.Column>
           </Grid>
           <Grid>
           <Grid.Column width={3}>
           <Input type='text' style = {{ height: 30 , width : 300}} placeholder="Describe what kind of event you would like to hold" />
           <Label pointing>Your Description</Label>
           </Grid.Column>
           </Grid>
           <br />
           <Button style = {{ height: 40 , width : 200}} color="blue" onClick={this.createEvent}>Create New Event</Button>
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
                <Button style = {{height: 30 , width : 60}} onClick={this.closeHelper}>Close</Button>
                <br />
                <Grid>
                <Grid.Column width={3}>
                <Input type='text' style = {{ height: 30 , width : 150}} placeholder={this.state.helperlocation} />
                <Label pointing>Your Location</Label>
                </Grid.Column>
                    <Grid.Column width={3}>
                    <Button style = {{ height: 30 , width : 150, backgroundColor: 'powderblue'}} onClick={this.selectHelper}>Select Location</Button>
                     </Grid.Column>
                      <Grid.Column width={3}>
                    <FontAwesome.FaMapMarker onClick = {this.helperlocate} style = {{ height: 50 , width : 150, backgroundColor: 'powderblue'}} type = 'button'/>
                  </Grid.Column>
                </Grid>
               </div>
               <Grid>
               <Grid.Column width={3}>
               <Input type="text" style = {{ height: 30 , width : 150}} value={this.state.helperinputvalue} onChange= {(evt) => this.updateHelperInputValue(evt)} placeholder="please enter"/>
               <Label pointing>Your Date</Label>
               </Grid.Column>
               <Grid.Column width={3}>
               <DatePicker className='date' onChange={this.onHelperdateChange} value={this.state.helperdate}/>
               </Grid.Column>
               </Grid>
               <Grid>
               <Grid.Column width={3}>
               <Input type='text' style = {{ height: 30 , width : 300}} placeholder="Describe what kind of help you would like" />
               <Label pointing>Your Description</Label>
               </Grid.Column>
               </Grid>
               <br />
               <Button style = {{ height: 40 , width : 200}} color="blue" onClick={this.createHelper}>Create New Helper</Button>
             </ReactModal>
             : null
         }
       </div>
    </div>
  );
  }
}



export default withRouter(Submenu);
