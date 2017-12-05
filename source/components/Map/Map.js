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
//Coordinate convert utils
import {
  vecAdd, vecMul, distance, tile2LatLng, latLng2Scaled, getTilesIds, getTileBounds,
} from './utils';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

class SimpleMap extends Component {
    constructor() {
        super();
        this.handleClick = this.handleClick.bind(this);
    }

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


  componentWillMount() {
      if (navigator.geolocation) {
        console.log(navigator.geolocation.getCurrentPosition(function(pos) {
            var crd = pos.coords;

  console.log('Your current position is:');
  console.log(`Latitude : ${crd.latitude}`);
  console.log(`Longitude: ${crd.longitude}`);

        }))
    } else {
        console.log("Geolocation is not supported by this browser.")
    }
  }
  static get defaultProps() {
     return {
         center: {lat: 40, lng: -88},
         zoom: 8
     }
   }

  handleClick(e){
     console.log(e.event.clientY)
     let boundingRect_;
     boundingRect_ = boundingRect_ || e.event.currentTarget.getBoundingClientRect();
     console.log(boundingRect_)
     const mousePos = {
          x: e.event.clientX - boundingRect_.left,
          y: e.event.clientY - boundingRect_.top,
        };
    zoom = this.props.zoom
    const ptNW = latLng2Scaled(bounds.nw, zoom);
    const mpt = vecAdd(ptNW, vecMul(mousePos, 1 / TILE_SIZE));
    const mptLatLng = tile2LatLng(mpt, zoom);

  }

  render() {
    return (
    <div className = 'wrapper'>

     //GoogleMap
      <div style = {{ height: '100px' , width : '100px'}}>
        <GoogleMapReact style = {{ height: '100px' , width : '100px'}} onClick={(e)=>this.handleClick(e)}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >
          <AnyReactComponent
            lat={40}
            lng={-88}
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
