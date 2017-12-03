import React, { Component } from 'react'
import { Button, Menu } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import GoogleMapReact from 'google-map-react';
import GoogleMap from 'google-map-react';
const AnyReactComponent = ({ text }) => <div>{text}</div>;

class SimpleMap extends Component {


  static get defaultProps() {
     return {
         center: {lat: 11, lng: 22},
         zoom: 8
     }
   }
  render() {
    return (
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
    );
  }
}


export default SimpleMap
