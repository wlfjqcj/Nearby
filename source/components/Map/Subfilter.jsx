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


class Subfilter extends Component {
  constructor () {
    super();
    this.state = {

    };

    this.showChat = this.showChat.bind(this);
    this.showAll = this.showAll.bind(this);
    this.showHelper = this.showHelper.bind(this);
    this.showEvent = this.showEvent.bind(this);
  }
  // onClick(info) {
  //   console.log('click ', info);
  //  }

  //-----------------------chat relative method---------------

showChat(){
this.props.setchat(true)
this.props.setevent(false)
this.props.sethelper(false)
}
showAll(){
    this.props.setchat(true)
    this.props.setevent(true)
    this.props.sethelper(true)
}
showEvent(){

    this.props.setchat(false)
    this.props.setevent(true)
    this.props.sethelper(false)
}
showHelper(){
    this.props.setchat(false)
    this.props.setevent(false)
    this.props.sethelper(true)
}




//log out loginprocess


  getMenu() {
    return (
  <Menu vertical>
   <Dropdown item text='Menu'>
     <Dropdown.Menu>
       <Dropdown.Item><Button onClick = {this.showChat}>Show Chat</Button></Dropdown.Item>
       <Dropdown.Item><Button onClick = {this.showEvent}>Show Event</Button></Dropdown.Item>
       <Dropdown.Item><Button onClick = {this.showHelper}>Show Helper</Button></Dropdown.Item>
       <Dropdown.Item><Button onClick = {this.showAll}>Show All</Button></Dropdown.Item>
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
        transform             : 'translate(-50%, -50%)'
      }
    };

    return (
    <div>
      <div className = 'dropmenu' >{this.getMenu()}</div>


    </div>
  );
  }
}



export default withRouter(Subfilter);
