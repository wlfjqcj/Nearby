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
const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

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
      helperinputvalue:null,
      eventinputvalue:null,
      chatinputvalue:null,
      eventdescriptioninputvalue:null,
      helperdescriptioninputvalue:null,
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


    updateEventDescriptionInputValue(e) {
        this.setState({
            eventdescriptioninputvalue: e.target.value
        })
    }

    createEvent() {
        this.setState({ showEvent: false });
        this.props.transferMsg((obj) => {})
        // this.props.addstate(this.state.location)
        axios.post(posturl,{
         text:JSON.stringify({name:this.state.eventinputvalue,description:this.state.eventdescriptioninputvalue,date:this.state.eventdate.toString()}),
         type:'event',
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
        text:JSON.stringify({name:this.state.helperinputvalue,description:this.state.helperdescriptioninputvalue,date:this.state.helperdate.toString()}),
        type:'helper',
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


updateHelperDescriptionInputValue() {
    this.setState({
        helperdescriptioninputvalue: e.target.value
    })

}





//log out loginprocess
logout() {
    axios.get(logouturl,{withCredentials:true})
 .then( (response) => {
     console.log(response)
     this.props.logoutprocess('hah');
     localStorage.setItem('username', '');
     this.props.history.push("/");
 }).catch(function (error) {

 });
}

  getMenu() {
    return (
  <Menu vertical>
   <Dropdown item id="dropdownmenu" text='Menu'>
     <Dropdown.Menu>
       <Dropdown.Item><Button className="dropdownbutton" onClick = {this.buildChat}>New Chat</Button></Dropdown.Item>
       <Dropdown.Item><Button className="dropdownbutton" onClick = {this.buildEvent}>New Event</Button></Dropdown.Item>
       <Dropdown.Item><Button className="dropdownbutton" onClick = {this.buildHelper}>New Helper</Button></Dropdown.Item>
       <Dropdown.Item><Button className="dropdownbutton" onClick = {this.logout}>Logout</Button></Dropdown.Item>
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
    const customStyles = {
      content : {
        top                   : '50%',
        left                  : '50%',
        right                 : 'auto',
        bottom                : 'auto',
        marginRight           : '-50%',
        transform             : 'translate(-50%, -50%)',
        padding               : '10px'
        
      }
    };

    return (
    <div>
      <div className = 'dropmenu' >{this.getMenu()}</div>

      <div className = 'buildItem' >
      {
          this.state.build == '1'
          ? <ReactModal
           isOpen={this.state.showChat}
           contentLabel="Minimal Modal Example"
           style={customStyles}
           >
           <div>

           <Button className="close"  floated='right' onClick={this.closeChat}>Close</Button>
           </div>
           <br />
           <br />
           <Grid>
           <Grid.Column width={5}>
           <Input type="text" style = {{ height: 30 , width : 300}} value={this.state.chatinputvalue} onChange= {(evt) => this.updateChatInputValue(evt) } placeholder="please enter"/>
           <Label pointing>Your Text</Label>
           </Grid.Column>
           </Grid>
           
            <br />
            <br />
             <Button onClick={() => this.createChat()} color="black">Create New Chat</Button>

           </ReactModal>
           : null
       }
       {
           this.state.build == '2'
           ? <ReactModal
            isOpen={this.state.showEvent}
            contentLabel="Minimal Modal Example"
          style={customStyles} >
            <div>
            <Button className="close"  floated='right' onClick={this.closeEvent}>Close</Button>
            <br />
            <Grid>
            <Grid.Column width={5}>
            <Input id="inputlocation" type='text' style = {{ height: 30 , width : 150}} placeholder={this.state.eventlocation} />
            <Label pointing>Your Location</Label>
            </Grid.Column>
                <Grid.Column width={5}>
                <Button.Group>
                <Button className="selectbutton"  basic onClick={this.selectEvent}>Select Location</Button>
                <Button className="selectbutton" basic onClick = {this.eventlocate}>Current Location</Button>
                 </Button.Group>
              </Grid.Column>
            </Grid>
           </div>
           <Grid>
           <Grid.Column width={5}>
           <Input type="text" style = {{ height: 30 , width : 150}} value={this.state.eventinputvalue} onChange= {(evt) => this.updateEventInputValue(evt)} placeholder="please enter"/>
           <Label pointing>Your Subject</Label>

           </Grid.Column>

           <Grid.Column width={5}>
           <DatePicker className='date' onChange={this.onEventdateChange} value={this.state.eventdate}/>
          <Label pointing>Your Date</Label>
           </Grid.Column>
           </Grid>
           <Grid>
           <Grid.Column width={5}>
           <Input type='text' style = {{ height: 90, width : 327}} value={this.state.eventdescriptioninputvalue} onChange= {(evt) => this.updateEventDescriptionInputValue(evt) } placeholder="Describe what kind of event you would like to hold" />
           <Label pointing>Your Description</Label>

           </Grid.Column>
           </Grid>
           <br />
           <Button id="createEvent" style = {{ height: 40 , width : 200}} color="blue" onClick={this.createEvent}>Create New Event</Button>
            </ReactModal>
            : null
        }
        {
            this.state.build == '3'
            ? <ReactModal
             isOpen={this.state.showHelper}
             contentLabel="Minimal Modal Example"
              style={customStyles}


             >
                <div className="helperModal">
                <Button className="close"  floated='right' onClick={this.closeHelper}>Close</Button>
                <br />
                <Grid columns={5}>
                <Grid.Column width={5}>
                <Input type='text' style = {{ height: 30 , width : 150}} placeholder={this.state.helperlocation} />
                <Label pointing>Your Location</Label>
                </Grid.Column>
                    <Grid.Column width={5}>
                    <Button.Group>
                    <Button className="selectbuttonhelp" basic onClick={this.selectHelper}>Select Location</Button>

                    <Button className="selectbuttonhelp" basic  onClick = {this.helperlocate}>Current Location</Button>
                     </Button.Group>
                  </Grid.Column>
                </Grid>
               </div>
               <Grid columns={5} >
               <Grid.Column width={5}>
               <Input type="text" style = {{ height: 30 , width : 150}} value={this.state.helperinputvalue} onChange= {(evt) => this.updateHelperInputValue(evt)} placeholder="please enter" />
               <Label pointing>Your Subject</Label>
               </Grid.Column>
               <Grid.Column width={5}>
               <DatePicker className='date' onChange={this.onHelperdateChange} value={this.state.helperdate}/>
               <br />
              <Label pointing>Your Date</Label>
               </Grid.Column>
               </Grid>
               <Grid columns={5} >
               <Grid.Column width={5}>
               <Input type='text' style = {{ height: 90, width : 327}} placeholder="Describe what kind of help you would like" value = {this.state.helperdescriptioninputvalue} onChange= {(evt) => this.updateHelperDescriptionInputValue(evt) }/>
               <Label pointing>Your Description</Label>
               </Grid.Column>
               </Grid>
               <br />
               <Button style = {{ height: 40 , width : 200}} color="red" onClick={this.createHelper}>Create New Helper</Button>
             </ReactModal>
             : null
         }
       </div>
    </div>
  );
  }
}



export default withRouter(Submenu);
