import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import { Button, Menu, Popup, Dropdown} from 'semantic-ui-react';
import { Segment } from 'semantic-ui-react';
import { Comment, Form, Header } from 'semantic-ui-react';
import { Link } from 'react-router-dom'
import axios from 'axios'
import GoogleMapReact from 'google-map-react';
import GoogleMap from 'google-map-react';
import ReactModal from 'react-modal';
import createReactClass from 'create-react-class';
import { withRouter, browserHistory} from 'react-router'
import ReplyChat from '../Reply/ReplyChat.js';
import ReplyEvent from '../ReplyEvent/ReplyEvent.jsx';
import ReplyHelper from '../ReplyHelper/ReplyHelper.jsx';
import Submenu from './Submenu.js';
import Subfilter from './Subfilter.jsx';
import styles from './Map.scss';
//Coordinate convert utils
import {
  vecAdd, vecMul, distance, tile2LatLng, latLng2Scaled, getTilesIds, getTileBounds,
} from './utils';
axios.defaults.withCredentials = true;
const url = 'http://fengshuang.org:3000/api/post/all'
const AnyReactComponent = ({ text }) => <div><Button></Button></div>;
const TILE_SIZE = 256;

class SimpleMap extends Component {
    constructor() {
        super();
        this.handleClick = this.handleClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.changeonclick = this.changeonclick.bind(this);
        this.logoutprops = this.logoutprops.bind(this);
        this.setevent = this.setevent.bind(this);
        this.sethelper = this.sethelper.bind(this);
        this.setchat= this.setchat.bind(this);
        // this.additem = this.additem.bind(this);
        this.state = {
            zoommap:15,
            mapcenter:[40.11683643859134,-88.24157047271729],
            boundsmap:[],
            msg: "start",
            secondsElapsed:0,
            clickfunc: function(obj){
                console.log(obj.x, obj.y, obj.lat, obj.lng, obj.event);
            },
            visible: false,
            text: "wait for response",
            chatobjects:[],
            eventobjects:[],
            helperobjects:[],
            username:'haha',
            showchat:true,
            showevent:true,
            showhelper:true,



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

  setchat(s){
      this.setState({
          showchat:s
      })

  }
  sethelper(s){
      this.setState({
          showhelper:s
      })
  }
  setevent(s){
      this.setState({
          showevent:s
      })
  }

  // additem(item) {
  //     var messageloc = this.state.textlocation
  //     messageloc.push(item)
  //     console.log(messageloc)
  //     this.setState({
  //         textlocation:messageloc
  //     })
  //
  // }


  componentWillMount() {
      this.setState({
          username:localStorage.getItem("username")
      })
      clearInterval(this.interval);
     var chatobj = []
     var eventobj = []
     var helperobj = []
     axios.get( url, {withCredentials:true})
    .then((response) => {
      response.data.data.map((obj) => {
          if (obj.type == 'chat')
  		chatobj.push({
            chatid:obj._id,
            chattopic:obj.text,
            location:[obj.latitude, obj.longitude],
        })
        if(obj.type == 'event') {
            var details = JSON.parse(obj.text)
            eventobj.push({
                eventid:obj._id,
                location:[obj.latitude, obj.longitude],
                eventname: details.name,
                eventdescription:details.description,
                eventtime: details.date,
                pati:obj.participants,
                joins:(obj.participants.indexOf(this.state.username) > -1)
            })
        }
        if(obj.type == 'helper') {
            var details = JSON.parse(obj.text)
            helperobj.push({
                helperid:obj._id,
                location:[obj.latitude, obj.longitude],
                helpername: details.name,
                helperdescription:details.description,
                helpertime: details.date,
                pati:obj.participants,
                joins:(obj.participants.indexOf(this.state.username) > -1)
            })
        }
  	})
    this.setState({
        chatobjects:chatobj,
        eventobjects:eventobj,
        helperobjects:helperobj
    })

    })
    .catch(function (error) {
      console.log(error);
    });

  }
  tick() {
      var chatobj = []
      var eventobj = []
      var helperobj = []
      axios.get( url, {withCredentials:true})
     .then((response) => {
       response.data.data.map((obj) => {
           if (obj.type == 'chat')
   		chatobj.push({
             chatid:obj._id,
             chattopic:obj.text,
             location:[obj.latitude, obj.longitude],
         })
         if(obj.type == 'event') {
             var details = JSON.parse(obj.text)
             eventobj.push({
                 eventid:obj._id,
                 location:[obj.latitude, obj.longitude],
                 eventname: details.name,
                 eventdescription:details.description,
                 eventtime: details.date,
                 pati:obj.participants,
                 joins:(obj.participants.indexOf(this.state.username) > -1)
             })
         }
         if(obj.type == 'helper') {
             var details = JSON.parse(obj.text)
             helperobj.push({
                 helperid:obj._id,
                 location:[obj.latitude, obj.longitude],
                 helpername: details.name,
                 helperdescription:details.description,
                 helpertime: details.date,
                 pati:obj.participants,
                 joins:(obj.participants.indexOf(this.state.username) > -1)
             })
         }

   	})
     this.setState({
         chatobjects:chatobj,
         eventobjects:eventobj,
         helperobjects:helperobj
     })


     })
     .catch(function (error) {
       console.log(error);
     });

      this.setState((prevState) => ({
        secondsElapsed: prevState.secondsElapsed + 1,


      }));
    }






  static get defaultProps() {


      if (navigator.geolocation) {
        console.log(navigator.geolocation.getCurrentPosition(function(pos) {
            var crd = pos.coords;
        }))
    } else {
        console.log("Geolocation is not supported by this browser.")
    }

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


  componentDidMount() {
      this.interval = setInterval(() => this.tick(), 1000);
      if (navigator.geolocation) {
        console.log(navigator.geolocation.getCurrentPosition((pos)=> {
            var crd = pos.coords;
            console.log(crd)
            this.setState({
                mapcenter:[crd.latitude,crd.longitude]
            })
        }))
    } else {
        console.log("Geolocation is not supported by this browser.")
    }
   }




   logoutprops(e) {
       console.log(e)
       this.props.history.push("/login");
   }

  render() {
    const tt = this.state.text;
    return (
    <div className = 'wrapper'>

     //GoogleMap
      <div style = {{ height: '100px' , width : '100px'}}>
        <GoogleMapReact style = {{ height: '100px' , width : '100px'}} onClick={this.state.clickfunc} onChange={(e)=>this.handleChange(e)}
          center={this.state.mapcenter}
          zoom={this.state.zoommap}
        >
            {
                this.state.chatobjects.map((v, index) => {
                        // return <ReplyChat style = {{ height: 50 , width : 50, backgroundColor: 'powderblue'}} lat = {v[0]} lng = {v[1]} chatText = 'ssss' key = {index}></ReplyChat>;
                        if(this.state.showchat)
                        return (
                            // <div class="hint--html hint--top hint--hoverable" style = {{ height: 50 , width : 50, backgroundColor: 'powderblue'}} lat = {v[0]} lng = {v[1]} chatText = 'ssss' key = {index}>
                            //     <div class="hint__content">
                            //         <p>hahahah</p>
                            //     </div>
                            //     </div>
                            <PopupExampleMultiple   lat = {v.location[0]} lng = {v.location[1]} key = {index} chatid = {v.chatid} username = {this.state.username} userlocation = {this.state.mapcenter} popname = {v.chattopic}/>
                        )
                      })

            }
            {
                this.state.eventobjects.map((v, index) => {

                        // return <ReplyChat style = {{ height: 50 , width : 50, backgroundColor: 'powderblue'}} lat = {v[0]} lng = {v[1]} chatText = 'ssss' key = {index}></ReplyChat>;
                        // console.log(v)
                        if(this.state.showevent)
                        return (
                            // <div class="hint--html hint--top hint--hoverable" style = {{ height: 50 , width : 50, backgroundColor: 'powderblue'}} lat = {v[0]} lng = {v[1]} chatText = 'ssss' key = {index}>
                            //     <div class="hint__content">
                            //         <p>hahahah</p>
                            //     </div>
                            //     </div>
                            <EventPopupExampleMultiple   lat = {v.location[0]} lng = {v.location[1]} key = {index + 100} eventid = {v.eventid} username = {this.state.username} userlocation = {this.state.mapcenter} eventname = {v.eventname}  />
                        )
                      })
            }
            {
                this.state.helperobjects.map((v, index) => {

                        // return <ReplyChat style = {{ height: 50 , width : 50, backgroundColor: 'powderblue'}} lat = {v[0]} lng = {v[1]} chatText = 'ssss' key = {index}></ReplyChat>;
                        // console.log(v)
                        if(this.state.showhelper)
                        return (
                            // <div class="hint--html hint--top hint--hoverable" style = {{ height: 50 , width : 50, backgroundColor: 'powderblue'}} lat = {v[0]} lng = {v[1]} chatText = 'ssss' key = {index}>
                            //     <div class="hint__content">
                            //         <p>hahahah</p>
                            //     </div>
                            //     </div>
                            <HelperPopupExampleMultiple  lat = {v.location[0]} lng = {v.location[1]} key = {index + 100} helperid = {v.helperid} username = {this.state.username} userlocation = {this.state.mapcenter} helpername = {v.helpername}  />
                        )
                      })
            }

        </GoogleMapReact>
      </div>
      //menu
      <div className = 'submenu'>
        <Submenu transferMsg = {this.changeonclick} isvisible = {this.state.visible} logoutprocess = {(e) => this.logoutprops(e)} userlocation = {this.state.mapcenter} />
      </div>
      <div className = 'submenu' style={{transform: 'translateY(100%)' }}>
        <Subfilter transferMsg = {this.changeonclick} isvisible = {this.state.visible} logoutprocess = {(e) => this.logoutprops(e)} userlocation = {this.state.mapcenter} setchat = {(s) => this.setchat(s)} sethelper = {(s) => this.sethelper(s)} setevent = {(s) => this.setevent(s)}/>
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
    this.visiblechangeclose = this.visiblechangeclose.bind(this)

}
visiblechange(){
    var status = this.state.visible;
    status = !status
    this.setState({
        visible:status
    })

}

visiblechangeclose() {
    this.setState({
        visible:false
    })

}




render()
{
  const ct = "wait for respond";
return (
  <Popup
    trigger={<img style={{transform: 'translate(-50%,-100%)' }} src="http://res.cloudinary.com/dyghmcqvx/image/upload/v1512953456/pin_sq-01_j3pr9q.svg" height="42" width="42" onClick = {this.visiblechange}></img>}
    on={['hover']}
    hoverable
    onClose = {this.visiblechangeclose}
  >
     <Popup.Content>

      <p style={{display: this.state.visible ? 'none' : 'block' }}>{this.props.popname}</p>
      <div style={{display: this.state.visible ? 'block' : 'none' }}><ReplyChat chatid={this.props.chatid} username = {this.props.username} /></div>
    </Popup.Content>
  </Popup>
)}
}





class EventPopupExampleMultiple extends Component {
constructor(){
    super();
    this.state = {
        visible:false,
    }
    this.visiblechange = this.visiblechange.bind(this);
    this.visiblechangeclose = this.visiblechangeclose.bind(this)

}
visiblechange(){
    var status = this.state.visible;
    status = !status
    this.setState({
        visible:status
    })

}

visiblechangeclose() {
    this.setState({
        visible:false
    })

}


render()
{
  const ct = "wait for respond";
return (
  <Popup
    trigger={<img style={{transform: 'translate(-50%,-100%)' }} src="http://res.cloudinary.com/dyghmcqvx/image/upload/v1512971894/pin_sq_SkB-01_gd8pls.svg" height="42" width="42" onClick = {this.visiblechange}></img>}
    on={['hover']}
    hoverable
    onClose = {this.visiblechangeclose}

  >
     <Popup.Content>

      <p style={{display: this.state.visible ? 'none' : 'block' }}>{this.props.eventname}</p>
      <div style={{display: this.state.visible ? 'block' : 'none' }}><ReplyEvent eventid={this.props.eventid} username = {this.props.username} eventname = {this.props.eventname} eventtime = {this.props.eventtime} eventdescription = {this.props.eventdescription} participants = {this.props.participants} /></div>
    </Popup.Content>
  </Popup>
)}
}





class HelperPopupExampleMultiple extends Component {
constructor(){
    super();
    this.state = {
        visible:false,
    }
    this.visiblechange = this.visiblechange.bind(this);
    this.visiblechangeclose = this.visiblechangeclose.bind(this)

}
visiblechange(){
    var status = this.state.visible;
    status = !status
    this.setState({
        visible:status
    })

}

visiblechangeclose() {
    this.setState({
        visible:false
    })

}


render()
{
  const ct = "wait for respond";
return (
  <Popup
    trigger={<img style={{transform: 'translate(-50%,-100%)' }} src="http://res.cloudinary.com/dyghmcqvx/image/upload/v1513013602/map-marker_1_x2dyph.svg" height="42" width="42" onClick = {this.visiblechange}></img>}
    on={['hover']}
    hoverable
    onClose = {this.visiblechangeclose}

  >
     <Popup.Content>

      <p style={{display: this.state.visible ? 'none' : 'block' }}>{this.props.helpername}</p>
      <div style={{display: this.state.visible ? 'block' : 'none' }}><ReplyHelper helperid={this.props.helperid} username = {this.props.username} helpername = {this.props.helpername} helpertime = {this.props.helpertime} helperdescription = {this.props.helperdescription} participants = {this.props.participants} /></div>
    </Popup.Content>
  </Popup>
)}
}

export default withRouter(SimpleMap)
