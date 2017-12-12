import React, { Component } from 'react'
import { Button, Menu } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import ReactModal from 'react-modal'
import { Comment, Form, Header, Segment} from 'semantic-ui-react'
import { Card, Feed, List, Image,Input } from 'semantic-ui-react'
import styles from './ReplyChat.scss';
import {emojify} from 'react-emojione';
axios.defaults.withCredentials = true;
const url = 'http://fengshuang.org:3000/api/post/id/'
const posturl = 'http://fengshuang.org:3000/api/post/reply/'
class ReplyChat extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//         chatText: props.chatText,
//         sending: props.sending,
//         showChat: true
//     };
//     this.replyChat = this.replyChat.bind(this);
//     this.closeChat = this.closeChat.bind(this);
//   }
//   replyChat() {
//     this.setState({
//       showChat: true
//     })
//   }
//
//   closeChat () {
//     this.setState({ showChat: false });
//   }
//
//    render() {
//         let chatText = this.state.chatText
//         if (this.state.sending == true) {
//
//
//         return(
//            <div className = 'buildItem' >
//            <ReactModal
//             isOpen={this.state.showChat}
//             contentLabel="Minimal Modal Example"
//             >
//               <Button onClick={this.closeChat}>Close Modal</Button>
//               <Comment.Group>
//               <Segment stacked>
//                  BlaBla
//                </Segment>
//                <Header as='h5' dividing>Comments</Header>
//                   <Form reply>
//                    <Form.TextArea />
//                    <Button content='Add Reply' labelPosition='left' icon='edit' primary />
//                 </Form>
//               </Comment.Group>
//             </ReactModal>
//             </div>
//         )
//       }
//       else {
//         return (
//           <div>
//           </div>
//         )
//       }
//
//
// }
constructor() {
		super();
		this.handleFocus = this.handleFocus.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleKeypress = this.handleKeypress.bind(this);
		this.handleBlur = this.handleBlur.bind(this);
		this.handleClick = this.handleClick.bind(this);
		this.imgId = this.imgId.bind(this);

		this.helperspan = null;

		this.state = {
			content_add: "+ Comment",
			width: 100,
			myItems: [],
			secondsElapsed:0,
			mainchat:'',
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
		  replyUserName: null
		};
		this.lastId = -1;
	}


	handleFocus(event) {
		this.setState({ content_add: "" });
	}

	handleChange(event) {
		const usr_input = event.target.value;
		this.setState({ content_add: usr_input });
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
			});
			axios.post(posturl  +  this.props.chatid, {
    			text:currentcontent
  			},{withCredentials:true})
			.then(function (response) {
				var message = []
				response.data.data.replies.map((obj) => {
					message.push(obj)
				})
				this.setState({
					myItems: message,
					mainchat:response.data.data.text
				})

  		})
  .catch(function (error) {

  });

		}
	}

	handleBlur(event) {
		this.setState({ content_add: "add +" });
	}

	handleClick(event) {
		const idToRemove = Number(event.target.dataset["item"]);
			console.log(idToRemove);
		const newArray = this.state.myItems.filter((listitem) => {return listitem.id !== idToRemove});
		console.log(newArray)
		this.setState({ myItems: newArray });
		//console.log(this.state.myItems);
	}



	componentDidUpdate(prevProps, prevState) {
		if (prevState.content_add != this.state.content_add) {
			const helperWidth = this.helperspan.offsetWidth;
			this.setState({ width: Math.max(50, helperWidth + 1) });
		}
	}

	// makeAddedList() {
  //
	// 	const elements =  this.state.myItems.map((listitem, index) => (
  //
	// 			{listitem.text}
  //
	// 	));
	// 	return elements
  //
	// }
	componentDidMount() {
	    this.interval = setInterval(() => this.tick(), 1000);
	 }
	componentWillUnmount() {
       clearInterval(this.interval);
	   var message = []

	   axios.get(url + this.props.chatid, {withCredentials:true})

		.then((response) =>  {
		var message = []
		response.data.data.replies.map((obj) => {
			message.push(obj)
		})
		this.setState({
			myItems: message,
			mainchat:response.data.data.text
		 })
		})
		.catch(function (error) {
		  console.log(error);
		});
    }

  tick() {
	  var message = []
	axios.get(url + this.props.chatid, {withCredentials:true})

  .then((response) =>  {
	 var message = []

	 var currentWidth = this.helperspan.offsetWidth
	 response.data.data.replies.map((obj) => {
		message.push(obj)


	 })
	 this.setState({
		 myItems: message,
		 mainchat:response.data.data.text,
	 })

  })
  .catch(function (error) {
    console.log(error);
  });
	console.log(message)
      this.setState((prevState) => ({
        secondsElapsed: prevState.secondsElapsed + 1,


      }));
    }
imgId(){
   const id = this.state.iid;
	this.setState({
		iid: id + 1

	});
	return this.state.iid
	console.log(this.state.iid)
}


render() {
  const ct = "wait";
	let imgid = 0
  return (
    <div className = "kuang">
    <div id="chattitle">
		{emojify('Sentiment Analysis:wink: 😸 :D  ^__^')}
		<Segment raised>
  <p>@{this.props.username}: {this.props.chatname}</p>
  </Segment>
	</div>
	<br />

    <div id="chatlist">
		{this.state.myItems.map((listitem, index) => (
		<List horizontal>

    <List.Item>
      <Image avatar src={this.state.currentimg[imgid = imgid + 1]} />
      <List.Content>
        <List.Header as='a'>Rachael</List.Header>
      <List.Description className='kuangDes'>{listitem.text}</List.Description>
      </List.Content>
    </List.Item>


		</List>



		))}
    </div>


		<div className='inputkuang'>
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
    </div>

  )

}
}

export default ReplyChat
