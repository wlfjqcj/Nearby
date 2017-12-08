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

import styles from './Submenu.css';

class Submenu extends Component {
  constructor () {
    super();
    this.state = {
      build: null,
      showChat: false,
      showEvent: false,
      showHelper: false,
      location:[0, 0]
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

  }
  // onClick(info) {
  //   console.log('click ', info);
  //  }
  buildChat() {
    this.setState({
      build: '1',
      showChat: true
    })
  }






  closeChat () {

    this.setState({ showChat: false });
  }

  buildEvent() {
      this.setState({
        build: '2',
        showEvent: true
      })
    }
    closeEvent () {

              this.setState({ showEvent: false });
              this.props.transferMsg((obj) => {})
              this.props.addstate(this.state.location)
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

  buildHelper() {
      this.setState({
        build: '3',
        showHelper: true,
        location:[0,0]
      })

    }
    closeHelper() {


      this.setState({ showHelper: false });
      this.props.transferMsg((obj) => {})
      this.props.addstate(this.state.location)
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
               <Input type="text" placeholder={this.state.location} />
               <FontAwesome.FaMapMarker onClick = {this.locate} />
               <Input placeholder="please select date"/>
               <Button onClick={this.selectHelper}>Select Location</Button>
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
