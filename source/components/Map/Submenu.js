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
      location:[0, 0],
      date: new Date(),
      chatinputvalue:'please enter'
    };
    this.buildChat = this.buildChat.bind(this);
    this.closeChat = this.closeChat.bind(this);

    this.buildEvent = this.buildEvent.bind(this);
    this.closeEvent = this.closeEvent.bind(this);
    this.locate = this.locate.bind(this);
    this.buildHelper = this.buildHelper.bind(this);
    this.closeHelper = this.closeHelper.bind(this);
    this.selectHelper = this.selectHelper.bind(this);
    this.selectEvent = this.selectEvent.bind(this);
    this.ondateChange= this.ondateChange.bind(this);
    this.updateInputValue = this.updateInputValue.bind(this);
  }
  // onClick(info) {
  //   console.log('click ', info);
  //  }

  //chat relative method
  buildChat() {
    this.setState({
      build: '1',
      showChat: true
    })
  }

  closeChat () {

    this.setState({ showChat: false });
  }





//event relative method

  buildEvent() {
      this.setState({
        build: '2',
        showEvent: true
      })
    }
closeEvent () {

              this.setState({ showHelper: false });
              this.props.transferMsg((obj) => {})
              // this.props.addstate(this.state.location)
              console.log('hhsh')
              axios.post(posturl,{
               text:this.state.chatinputvalue,
               type:'chat',
               latitude:this.state.location[0],
               longitude:this.state.location[1],
               },{withCredentials:true})
           .then(function (response) {
               console.log(response)

           }).catch(function (error) {

           });
    }
    selectEvent() {
        this.setState({ showEvent: false });
        this.props.transferMsg((obj) =>
        {
            this.setState(
                {location:[obj.lat,obj.lng]}
            )
            this.setState({ showEvent: true });
        })
    }











//helper relative method
  buildHelper() {
      this.setState({
        build: '3',
        showHelper: true,
        location:[0,0]
      })

    }

    ondateChange(date){this.setState({ date })}
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
                {location:[obj.lat,obj.lng]}
            )
            this.setState({ showHelper: true });
        })

    }
  locate(){
if (navigator.geolocation) {
    var x;
    var y;
    navigator.geolocation.getCurrentPosition(pos =>  {
        var crd = pos.coords;
        x = crd.latitude;
        y = crd.longitude;
        this.setState({
            location:[x,y]
        })
    })

}
else {
    this.setState(
        {location:[0,0]}
    )
}

  }

updateInputValue(e) {
    this.setState({
        chatinputvalue: e.target.value
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
                <Input type="text" placeholder={this.state.location} />
                <FontAwesome.FaMapMarker onClick = {this.locate} />
                <Input placeholder="please select date"/>
                <Button onClick={this.selectEvent}>Select Location</Button>
                <Button onClick={() => this.setState({ showHelper: false })}>Close Modal</Button>
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
               <Input type="text" placeholder={this.state.location} />
               <FontAwesome.FaMapMarker onClick = {this.locate} style = {{ height: 50 , width : 150, backgroundColor: 'powderblue'}} type = 'button'/>
               <Button style = {{ height: 50 , width : 150, backgroundColor: 'powderblue'}} onClick={this.selectHelper}>Select Location</Button>
               </div>
               <DatePicker onChange={this.ondateChange} value={this.state.date}/>
               <Input type="text" value={this.state.chatinputvalue} onChange= {(evt) => this.updateInputValue(evt) }/>
               <Button onClick={this.closeEvent}>Create New Event</Button>
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
