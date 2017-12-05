import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import { Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import GoogleMapReact from 'google-map-react';
import GoogleMap from 'google-map-react';

import Menu, { SubMenu, Item as MenuItem } from 'rc-menu';
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
    }

  buildHelper() {
      this.setState({
        build: '3',
        showHelper: true
      })
    }
    closeHelper() {
      this.setState({ showHelper: false });
    }
    selectHelper() {
        this.setState({ showHelper: false });
        
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
      <Menu
        mode="inline"
      >
       <SubMenu key="1" title="Menu">
        <MenuItem ><Button onClick = {this.buildChat}>New Chat</Button></MenuItem>
        <MenuItem ><Button onClick = {this.buildEvent}>New Event</Button></MenuItem>
        <MenuItem ><Button onClick = {this.buildHelper}>New Helper</Button></MenuItem>
       </SubMenu>
     </Menu>
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
            >
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
               <Icon loading name='marker' onClick = {this.locate}/>
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
