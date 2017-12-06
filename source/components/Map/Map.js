import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import { Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import GoogleMapReact from 'google-map-react';
import GoogleMap from 'google-map-react';
import ReactModal from 'react-modal';
import Menu, { SubMenu, Item as MenuItem } from 'rc-menu';
import createReactClass from 'create-react-class';

import Submenu from './Submenu.js';
import styles from './Map.scss';
//Coordinate convert utils
import {
  vecAdd, vecMul, distance, tile2LatLng, latLng2Scaled, getTilesIds, getTileBounds,
} from './utils';

const AnyReactComponent = ({ text }) => <div>{text}</div>;
const TILE_SIZE = 256;
class SimpleMap extends Component {
    constructor() {
        super();
        this.handleClick = this.handleClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.changeonclick = this.changeonclick.bind(this);
        this.state = {
            zoommap:0,
            boundsmap:[],
            msg: "start",
            clickfunc: function(obj){

                console.log(obj.x, obj.y, obj.lat, obj.lng, obj.event);
            },
            visible: false

        }
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
  changeonclick(func) {
      this.setState({
          clickfunc:func
      })

  }


  componentWillMount() {
      if (navigator.geolocation) {
        console.log(navigator.geolocation.getCurrentPosition(function(pos) {
            var crd = pos.coords;
        }))
    } else {
        console.log("Geolocation is not supported by this browser.")
    }
  }
  static get defaultProps() {
     return {
         center: {lat: 40.11683643859134, lng: -88.24157047271729},
         zoom: 15
     }
   }

  handleChange(e) {
      this.setState({
          zoommap:e.zoom,
          boundsmap:e.bounds
      })

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
    var zoom = this.state.zoommap
    var bounds = this.state.boundsmap
    const ptNW = latLng2Scaled(bounds.nw, zoom);
    const mpt = vecAdd(ptNW, vecMul(mousePos, 1 / TILE_SIZE));
    const mptLatLng = tile2LatLng(mpt, zoom);
    this.setState(
        {
            visible:!this.state.visible
        }
    )

  }




  render() {
    return (
    <div className = 'wrapper'>

     //GoogleMap
      <div style = {{ height: '100px' , width : '100px'}}>
        <GoogleMapReact style = {{ height: '100px' , width : '100px'}} onClick={this.state.clickfunc} onChange={(e)=>this.handleChange(e)}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >
            {   this.state.visible ? (
                <AnyReactComponent
                  lat={40}
                  lng={-88}
                  text={'Kreyser Avrora'}
              />):(
                  <AnyReactComponent
                    lat={40}
                    lng={-88}
                    text={'Ture'}
                />
              )
            }
        </GoogleMapReact>
      </div>
      //menu
      <div className = 'submenu'>
        <Submenu transferMsg = {this.changeonclick} isvisible = {this.state.visible}/>



      </div>
    </div>



    );
  }
}




export default SimpleMap
