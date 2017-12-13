import React, { Component } from 'react'
import { Button, Menu } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { Segment ,Loader,Input,List} from 'semantic-ui-react'
import axios from 'axios'
import ReactModal from 'react-modal'
import { Comment, Form, Header } from 'semantic-ui-react'
import styles from './ReplyHelper.scss';
axios.defaults.withCredentials = true;

const url = 'http://fengshuang.org:3000/api/post/id/'
const posturl = 'http://fengshuang.org:3000/api/post/reply/'
const joinurl = 'http://fengshuang.org:3000/api/post/join/'
const quiturl = 'http://fengshuang.org:3000/api/post/quit/'
import {Card, Image } from 'semantic-ui-react'
class ReplyHelper extends Component {

constructor() {
		super();
		this.exitacti = this.exitacti.bind(this);
		this.joinacti = this.joinacti.bind(this);
		this.deletepost = this.deletepost.bind(this);
		this.handleFocus = this.handleFocus.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleKeypress = this.handleKeypress.bind(this);
		this.handleBlur = this.handleBlur.bind(this);
		this.imgId = this.imgId.bind(this);
		this.state = {
			content_add: "+ Comment",
			width: 100,
			helpername: 'this.props.helpername',
            helperdescription:'this.props.helperdescription',
            helpertime: 'this.props.helpertime',
            helperparticipants:'this.props.participants',
			secondsElapsed:0,
			openstatus:true,
			helpersubject:'',
            joinstatus: true,
			loading:false,
			currentimg: [
				"https://semantic-ui.com/images/avatar/large/elliot.jpg",
				"https://semantic-ui.com/images/avatar/large/joe.jpg",
				"http://bain.design/wp-content/uploads/2014/09/People-Avatar-Set-Rectangular-02.jpg",
				"https://semantic-ui.com/images/avatar/large/ade.jpg",
				"http://bain.design/wp-content/uploads/2013/03/People-Avatar-Set-Rectangular-13-328x328.jpg",
				"https://semantic-ui.com/images/avatar/large/matt.jpg",
				"http://smtb.cbl-web.com/images/avatar/big/stevie.jpg",
				"https://semantic-ui.com/images/avatar2/large/eve.png",
				"http://bain.design/wp-content/uploads/2013/03/People-Avatar-Set-Rectangular-04.jpg",
				"https://cdn2.iconfinder.com/data/icons/avatar-2/512/seby_user_face-512.png",
				"https://cdn2.iconfinder.com/data/icons/avatar-2/512/carla_girl-512.png",
				"https://cdn2.iconfinder.com/data/icons/avatar-2/512/laly_face_woman-512.png",
				"https://cdn0.iconfinder.com/data/icons/user-pictures/100/supportmale-2-512.png",
				"https://cdn.jsdelivr.net/npm/semantic-ui@2.2.11/examples/assets/images/avatar/tom.jpg",
				"https://www.tofugu.com/images/about/people/avatar-darin-richardson-1504fbcc.jpg",
				"https://image.flaticon.com/icons/png/512/163/163803.png",
				"https://image.flaticon.com/icons/png/512/163/163841.png",
				"https://www.maestromusicschool.com/wp-content/uploads/2017/02/boy-18.png",
				"https://www.small-improvements.com/images/characters/mary.svg"

			],
			iid : 0,
            myItems:[],
			username:localStorage.getItem("username"),
			abletoview: true
		};
	}

	handleFocus(event) {
		this.setState({ content_add: "" });
	}

	handleChange(event) {
		const usr_input = event.target.value;
		this.setState({ content_add: usr_input });
	}
	handleBlur(event) {
		this.setState({ content_add: "add +" });
	}
	handleKeypress(event) {
		if (event.key == "Enter") {
			var newArray = this.state.myItems;
			var currentcontent = this.state.content_add.trim();
			if (!currentcontent) {
				return;
			}

			var currentWidth = this.helperspan.offsetWidth;
			newArray.push({
				content: currentcontent,
				id: ++this.lastId,
				itemWidth: currentWidth + 2
			});
			this.setState({
				myItems: newArray,
				content_add: "",
				loading:true
			});
			axios.post(posturl  +  this.props.helperid, {
				text:currentcontent
			},{withCredentials:true})
			.then(function (response) {
				var message = []
				response.data.data.replies.map((obj) => {
					message.push(obj)
				})
				this.setState({
					myItems: message,
					mainchat:response.data.data.text,
					loading:true
				})

		})
  .catch(function (error) {

  });

		}
	}

	imgId(){
	   const id = this.state.iid;
		this.setState({
			iid: id + 1

		});
		return this.state.iid
		console.log(this.state.iid)
	}

	componentDidUpdate(prevProps, prevState) {
		if (prevState.content_add != this.state.content_add) {
			const helperWidth = this.helperspan.offsetWidth;
			this.setState({ width: Math.max(50, helperWidth + 1) });
		}
	}
	deletepost() {
		console.log(this.state.helpersubject,localStorage.getItem('username'))
		if (this.state.helpersubject == localStorage.getItem('username'))
			{
				axios.delete(url + this.props.helperid, {withCredentials:true})
				.then((response) =>  {

				}).catch(function (error) {
				  console.log(error);
				})
			}
		else
			alert('you have no access for this')

	}

	componentDidMount() {
	    this.interval = setInterval(() => this.tick(), 1000);
	 }
	componentWillUnmount() {
       clearInterval(this.interval);
	   var message = []

	   axios.get(url + this.props.helperid, {withCredentials:true})

		.then((response) =>  {
		var detailed = JSON.parse(response.data.data.text)
		var message = []
		var parti = []
		response.data.data.replies.map((obj) => {
			message.push(obj)
		})
		this.setState({
            helperdescription:detailed.description,
            helpertime:detailed.date,
            helpername:detailed.name,
        })
		response.data.data.replies.map((obj) => {
			message.push(obj)
		})
		response.data.data.participants.map((obj) => {
			parti.push(obj.username)
		})
        this.setState({
            myItems: message,
			openstatus:(parti.length == 0),
			joinstatus:(parti.indexOf(this.state.username) > -1),
			abletoview:((parti.indexOf(this.state.username) > -1 && parti.length >= 2) || parti.length < 2),
			loading:true,
			helpersubject:response.data.data.username
        })
		})
		.catch(function (error) {
		  console.log(error);
		});
    }

  tick() {

	var message = []
	axios.get(url + this.props.helperid, {withCredentials:true})
    .then((response) =>  {
		var detailed = JSON.parse(response.data.data.text)
        var message = []
		var parti = []
        this.setState({
            helperdescription:detailed.description,
            helpertime:detailed.date,
            helpername:detailed.name,
        })
        response.data.data.replies.map((obj) => {
			message.push(obj)
		})
		response.data.data.participants.map((obj) => {
			parti.push(obj.username)
		})

        this.setState({
            myItems: message,
			openstatus:(parti.length == 0),
			joinstatus:(parti.indexOf(this.state.username) > -1),
			abletoview:((parti.indexOf(this.state.username) > -1 && parti.length >= 1) || parti.length < 1),
			loading:true,
			helpersubject:response.data.data.username
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

	axios.post(joinurl + this.props.helperid, {withCredentials:true})

	 .then((response) =>  {
	 var detailed = JSON.parse(response.data.data.text)
	 var parti = []
	 response.data.data.participants.map((obj) => {
		 parti.push(obj.username)
	 })
	 this.setState({
		 joinstatus:(parti.indexOf(this.state.username) > -1),
		 openstatus:(parti.length == 0),
	 })


	 })
	 .catch(function (error) {
	   console.log(error);
	 });

}

exitacti(){

	axios.post(quiturl + this.props.helperid, {withCredentials:true})

	 .then((response) =>  {
		 var detailed = JSON.parse(response.data.data.text)
		 var parti = []
		 response.data.data.participants.map((obj) => {
			 parti.push(obj.username)
		 })
		 this.setState({
			 joinstatus:(parti.indexOf(this.state.username) > -1),
			 openstatus:(parti.length == 0),
		 })


	 })
	 .catch(function (error) {
	   console.log(error);
	 });

}




render() {
	let imgid = 0;
	return (

		<div>
			{(this.state.loading|| (this.props.username == this.state.helpersubject))?
		(
			<div>
		<Card id="helper">
		 <Card.Content>
		 <Button className="close"  floated='right' onClick = {this.deletepost}>x</Button>
		 <br />
		 <br />
	        <Image floated='right' size='mini' src='http://res.cloudinary.com/dyghmcqvx/image/upload/v1512973914/WechatIMG18871_zbdkgi.png' />
	        <Card.Header className = 'helperheader'>
	           {this.state.helpername}
	        </Card.Header>
	        <Card.Meta className = 'helpertime'>
	          {this.state.helpertime}
	        </Card.Meta>
	        <Card.Description className = 'helperdisc'>
	          {this.state.helperdescription}
	        </Card.Description>
	      </Card.Content>
	      <Card.Content extra>





		</Card.Content>
	</Card>


{this.state.abletoview? (
	<div>
	{(!this.state.joinstatus || (this.props.username == this.state.helpersubject)) ? (
<Button basic className="helperbutton"  onClick = {this.joinacti}>I can help</Button>
) : (
<Button basic className="helperbutton"  onClick = {this.exitacti}>Undo</Button>
)
}
{(!this.state.openstatus || (this.props.username == this.state.helpersubject))? (
	<div>
	<div id="chatlist">
		{this.state.myItems.map((listitem, index) => {
			if (this.props.username == listitem.username)
		return (
		<List horizontal>

    <List.Item>
      <Image avatar src={this.state.currentimg[imgid = imgid + 1]} />
      <List.Content>
        <List.Header as='a'>{listitem.username}</List.Header>
      <List.Description className='kuangDes'>{listitem.text}</List.Description>
      </List.Content>
    </List.Item>


		</List>

)

	})}
    </div>		<div className='inputkuang'>
			<Input id="add"
			type="text"
			name="initvalue"
			autoComplete="off"
			maxLength="300"
			onFocus={this.handleFocus}
			onChange={this.handleChange}
			onKeyPress={this.handleKeypress}
			onBlur={this.handleBlur}
			value={this.state.content_add}
			placeholder = "comment" />

					<br />

					<div id="helperspan" ref={el => (this.helperspan = el)}>

					</div>
					</div>
				</div>):(<div></div>)}
				</div>):(<p>no access to this</p>)}
				</div>):(<Loader active inline >Loading</Loader>)}
</div>
		)
}

}

export default ReplyHelper
