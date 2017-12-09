import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import { Button, Menu, Popup} from 'semantic-ui-react';
import { Segment } from 'semantic-ui-react';
import { Comment, Form, Header } from 'semantic-ui-react';
import { Link } from 'react-router-dom'
import axios from 'axios'
import GoogleMapReact from 'google-map-react';
import GoogleMap from 'google-map-react';
import ReactModal from 'react-modal';
import createReactClass from 'create-react-class';

import ReplyChat from '../Reply/ReplyChat.js';
import Submenu from './Submenu.js';
import styles from './Map.scss';
//Coordinate convert utils
import {
  vecAdd, vecMul, distance, tile2LatLng, latLng2Scaled, getTilesIds, getTileBounds,
} from './utils';

const AnyReactComponent = ({ text }) => <div><Button></Button></div>;
const TILE_SIZE = 256;
class SimpleMap extends Component {
    constructor() {
        super();
        this.handleClick = this.handleClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.changeonclick = this.changeonclick.bind(this);
        this.additem = this.additem.bind(this);
        this.state = {
            zoommap:0,
            boundsmap:[],
            msg: "start",
            clickfunc: function(obj){

                console.log(obj.x, obj.y, obj.lat, obj.lng, obj.event);
            },
            visible: false,
            text: "wait for response",
            textlocation: [[40.01,-88.0001],[40.0022,-88.0022],[40.03,-88.0301]]


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


  additem(item) {
      console.log(item)
      var messageloc = this.state.textlocation
      messageloc.push(item)
      console.log(messageloc)
      this.setState({
          textlocation:messageloc
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
    const tt = this.state.text;
    return (
    <div className = 'wrapper'>

     //GoogleMap
      <div style = {{ height: '100px' , width : '100px'}}>
        <GoogleMapReact style = {{ height: '100px' , width : '100px'}} onClick={this.state.clickfunc} onChange={(e)=>this.handleChange(e)}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >
            {
                this.state.textlocation.map(function(v, index){
                        // return <ReplyChat style = {{ height: 50 , width : 50, backgroundColor: 'powderblue'}} lat = {v[0]} lng = {v[1]} chatText = 'ssss' key = {index}></ReplyChat>;
                        return (
                            // <div class="hint--html hint--top hint--hoverable" style = {{ height: 50 , width : 50, backgroundColor: 'powderblue'}} lat = {v[0]} lng = {v[1]} chatText = 'ssss' key = {index}>
                            //     <div class="hint__content">
                            //         <p>hahahah</p>
                            //     </div>
                            //     </div>
                            <PopupExampleMultiple lat = {v[0]} lng = {v[1]} key = {index}/>
                        )
                      })

            }

        </GoogleMapReact>
      </div>
      //menu
      <div className = 'submenu'>
        <Submenu transferMsg = {this.changeonclick} isvisible = {this.state.visible} addstate = {item => this.additem(item)}/>
      </div>

    </div>



    );
  }
}
class PopupExampleMultiple extends Component {
constructor(){
    super();
    this.state = {
        visible:false,
    }
    this.visiblechange = this.visiblechange.bind(this);

}
visiblechange(){
    var status = this.state.visible;
    status = !status
    this.setState({
        visible:status
    })

}


render()
{
  const ct = "wait for respond";
return (
  <Popup
    trigger={<Button icon style = {{ height: 50 , width : 150, backgroundColor: 'powderblue'}} onClick = {this.visiblechange}>Click me or Hover me</Button>}
    header='Movie Search'
    on={['hover','focus']}
    hoverable

  >
     <Popup.Content>
      {this.state.visible?(<p>short</p>):
        (
          <div className = 'buildItem'>
            <ReplyChat />
          </div>
        )}
    </Popup.Content>
  </Popup>
)}
}

export default SimpleMap
