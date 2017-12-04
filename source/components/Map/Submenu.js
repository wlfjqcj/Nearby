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

import NewChat from './NewChat.js';

class Submenu extends Component {
  constructor () {
    super();
    this.state = {
      build: null,
      showChat: false,
      showEvent: false,
      showHelper: false,
    };
    this.buildChat = this.buildChat.bind(this);
    this.closeChat = this.closeChat.bind(this);

    this.buildEvent = this.buildEvent.bind(this);
    this.closeEvent = this.closeEvent.bind(this);

    this.buildHelper = this.buildHelper.bind(this);
    this.closeHelper = this.closeHelper.bind(this);

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
      <div style={{ width: 400 }}>{this.getMenu()}</div>

      <div className = 'buildItem' >
      {
          this.state.build == '1'
          ? <ReactModal
           isOpen={this.state.showChat}
           contentLabel="Minimal Modal Example"
           >
             <button onClick={this.closeChat}>Close Modal</button>
           </ReactModal>
           : null
       }
       {
           this.state.build == '2'
           ? <ReactModal
            isOpen={this.state.showEvent}
            contentLabel="Minimal Modal Example"
            >
              <button onClick={this.closeEvent}>Close Modal</button>
            </ReactModal>
            : null
        }
        {
            this.state.build == '3'
            ? <ReactModal
             isOpen={this.state.showHelper}
             contentLabel="Minimal Modal Example"
             >
               <button onClick={this.closeHelper}>Close Modal</button>
             </ReactModal>
             : null
         }
       </div>
    </div>
  );
  }
}

export default Submenu;
