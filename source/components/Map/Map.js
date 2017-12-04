import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import { Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import GoogleMapReact from 'google-map-react';
import GoogleMap from 'google-map-react';

import Menu, { SubMenu, Item as MenuItem } from 'rc-menu';
import createReactClass from 'create-react-class';

import Submenu from './Submenu.js';
import styles from './Map.scss';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

class SimpleMap extends Component {
  

  // getMenu() {
  //   return (
  //     <Menu
  //       onClick={this.onClick}
  //       mode="inline"
  //     >
  //
  //       <SubMenu key="1" title="Menu">
  //         <MenuItem key="1-1">LogIn</MenuItem>
  //         <MenuItem key="1-2">Register</MenuItem>
  //         <MenuItem key="1-3">New Chat</MenuItem>
  //         <MenuItem key="1-4">New Event</MenuItem>
  //         <MenuItem key="1-5">New Helper</MenuItem>
  //       </SubMenu>
  //
  //     </Menu>
  //   );
  // }

  static get defaultProps() {
     return {
         center: {lat: 11, lng: 22},
         zoom: 8
     }
   }

  render() {
    return (
    <div className = 'wrapper'>

     //GoogleMap
      <div style = {{ height: '100px' , width : '100px'}}>
        <GoogleMapReact style = {{ height: '100px' , width : '100px'}}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >
          <AnyReactComponent
            lat={11}
            lng={22}
            text={'Kreyser Avrora'}
          />
        </GoogleMapReact>
      </div>
      //menu
      <div className = 'submenu'>
        <Submenu />



      </div>
    </div>



    );
  }
}


export default SimpleMap
