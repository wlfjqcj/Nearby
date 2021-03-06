import React, { Component } from 'react'
import { Button, Menu } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { Segment } from 'semantic-ui-react'
import axios from 'axios'
import ReactModal from 'react-modal'
import { Comment, Form, Header,Loader } from 'semantic-ui-react'
import styles from './ReplyEvent.scss';
axios.defaults.withCredentials = true;

const url = 'http://fengshuang.org:3000/api/post/id/'
const posturl = 'http://fengshuang.org:3000/api/post/reply/'
const joinurl = 'http://fengshuang.org:3000/api/post/join/'
const quiturl = 'http://fengshuang.org:3000/api/post/quit/'
import {Card, Image } from 'semantic-ui-react'
class ReplyEvent extends Component {

constructor() {
		super();
		this.exitacti = this.exitacti.bind(this);
		this.joinacti = this.joinacti.bind(this);
		this.deletepost = this.deletepost.bind(this);
		this.state = {
			eventname: 'this.props.eventname',
            eventdescription:'this.props.eventdescription',
            eventtime: 'this.props.eventtime',
            eventparticipants:'this.props.participants',
			secondsElapsed:0,
			eventsubject:'',
            joinstatus: true,
            myItems:[],
			loading:false,
			paritici:[],
			username:localStorage.getItem("username")
		};
	}

	componentDidUpdate(prevProps, prevState) {
		if (prevState.content_add != this.state.content_add) {
			const helperWidth = this.helperspan.offsetWidth;
			this.setState({ width: Math.max(50, helperWidth + 1) });
		}
	}



	componentWillMount() {
		axios.get(url + this.props.eventid, {withCredentials:true})

		 .then((response) =>  {
		 var detailed = JSON.parse(response.data.data.text)
		 var message = []
		 var parti = []
		 response.data.data.replies.map((obj) => {
			 message.push(obj.text)
		 })
		 this.setState({
			 eventdescription:detailed.description,
			 eventtime:detailed.date,
			 eventname:detailed.name,
		 })
		 response.data.data.replies.map((obj) => {
			 message.push(obj.text)
		 })
		 response.data.data.participants.map((obj) => {
			 parti.push(obj.username)
		 })
		 this.setState({
			 myItems: message,
			 joinstatus:(parti.indexOf(this.state.username) > -1),
			 loading:true,
			 eventsubject:response.data.data.username,
			 paritici:parti
		 })
		 })
		 .catch(function (error) {
		   console.log(error);
		 });

	}

	componentDidMount() {
	    this.interval = setInterval(() => this.tick(), 1000);
	 }
	componentWillUnmount() {
       clearInterval(this.interval);
	   var message = []

	   axios.get(url + this.props.eventid, {withCredentials:true})

		.then((response) =>  {
		var detailed = JSON.parse(response.data.data.text)
		var message = []
		var parti = []
		response.data.data.replies.map((obj) => {
			message.push(obj.text)
		})
		this.setState({
            eventdescription:detailed.description,
            eventtime:detailed.date,
            eventname:detailed.name,
        })
		response.data.data.replies.map((obj) => {
			message.push(obj.text)
		})
		response.data.data.participants.map((obj) => {
			parti.push(obj.username)
		})
        this.setState({
            myItems: message,
			joinstatus:(parti.indexOf(this.state.username) > -1),
			loading:true,
			eventsubject:response.data.data.username,
			paritici:parti
        })
		})
		.catch(function (error) {
		  console.log(error);
		});
    }

  tick() {
	var message = []
	axios.get(url + this.props.eventid, {withCredentials:true})
    .then((response) =>  {
		var detailed = JSON.parse(response.data.data.text)
        var message = []
		var parti = []
        this.setState({
            eventdescription:detailed.description,
            eventtime:detailed.date,
            eventname:detailed.name,

        })
        response.data.data.replies.map((obj) => {
			message.push(obj.text)
		})
		response.data.data.participants.map((obj) => {
			parti.push(obj.username)
		})
        this.setState({
            myItems: message,
			joinstatus:(parti.indexOf(this.state.username) > -1),
			loading:true,
			eventsubject:response.data.data.username,
			paritici:parti
        })
  })
  .catch(function (error) {
    console.log(error);
  });

     this.setState((prevState) => ({
        secondsElapsed: prevState.secondsElapsed + 1,
      }));
}


joinacti() {

	axios.post(joinurl + this.props.eventid, {withCredentials:true})

	 .then((response) =>  {
	 var detailed = JSON.parse(response.data.data.text)
	 var parti = []
	 response.data.data.participants.map((obj) => {
		 parti.push(obj.username)
	 })
	 this.setState({
		 joinstatus:(parti.indexOf(this.state.username) > -1)
	 })


	 })
	 .catch(function (error) {
	   console.log(error);
	 });

}

exitacti(){

	axios.post(quiturl + this.props.eventid, {withCredentials:true})

	 .then((response) =>  {
		 var detailed = JSON.parse(response.data.data.text)
		 var parti = []
		 response.data.data.participants.map((obj) => {
			 parti.push(obj.username)
		 })
		 this.setState({
			 joinstatus:(parti.indexOf(this.state.username) > -1)
		 })


	 })
	 .catch(function (error) {
	   console.log(error);
	 });

}

deletepost() {
	console.log(this.state.eventsubject,localStorage.getItem('username'))
	if (this.state.eventsubject == localStorage.getItem('username'))
		{
			axios.delete(url + this.props.eventid, {withCredentials:true})
			.then((response) =>  {

			}).catch(function (error) {
			  console.log(error);
			})
		}
	else
		alert('you have no access for this')

}




render() {

	var joinpeople = ''
	this.state.paritici.map((v,idx) => {
		if (idx < 2)
		joinpeople += (v + ',')
	})
	joinpeople += 'also join this event'
	joinpeople += ('(' + this.state.paritici.length.toString() + ' people in total)') 

	return (

		<div>
			{this.state.loading?
		(<div>
			<Card id="events">
		 <Card.Content>
		 <button className="close" onClick = {this.deletepost}>Delete</button>

 		<br />
 		<br />
	        <Image floated='right' size='mini' src='http://res.cloudinary.com/dyghmcqvx/image/upload/v1512973914/WechatIMG18871_zbdkgi.png' />
	        <Card.Header>
	          {this.state.eventname}
	        </Card.Header>
	        <Card.Meta>
	          {this.state.eventtime.substring(0,16)}
	        </Card.Meta>
			<Card.Description>
	          {this.state.eventdescription}

	        </Card.Description>
			<br></br>
	        <Card.Description>
	      	{joinpeople}
	        </Card.Description>

	      </Card.Content>
	      <Card.Content extra>


	              {!this.state.joinstatus ? (
	        <Button basic className="eventsbutton" color = "blue" onClick = {this.joinacti}>Join</Button>
	      ) : (
	         <Button basic className="eventsbutton" color = "blue" onClick = {this.exitacti}>Decline</Button>
	      )
	        }

		</Card.Content>
	</Card>
</div>):(<Loader active inline >Loading</Loader>)}
</div>
		)
}

}

export default ReplyEvent
