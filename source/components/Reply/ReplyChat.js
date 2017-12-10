import React, { Component } from 'react'
import { Button, Menu } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { Segment } from 'semantic-ui-react'
import axios from 'axios'
import ReactModal from 'react-modal'
import { Comment, Form, Header } from 'semantic-ui-react'
import styles from './ReplyChat.scss';
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

		this.helperspan = null;

		this.state = {
			content_add: "+ Comment",
			width: 100,
			myItems: [],
			secondsElapsed:0
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
		const newArray = this.state.myItems.filter((listitem) => {return listitem.id !== idToRemove});
		this.setState({ myItems: newArray });
	}



	componentDidUpdate(prevProps, prevState) {
		if (prevState.content_add != this.state.content_add) {
			const helperWidth = this.helperspan.offsetWidth;
			this.setState({ width: Math.max(50, helperWidth + 1) });
		}
	}

	makeAddedList() {

		const elements =  this.state.myItems.map((listitem, index) => (
			<li
				key={listitem.id}
				onClick={this.handleClick}
				data-item={listitem.id}
				style={{
					width: listitem.itemWidth
				}}
			>
				{listitem.content}
			</li>
		));
		return elements

	}
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
			message.push(obj.text)
			this.setState({
				myItems: message
			})
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
	 this.id = -1
	 var currentWidth = this.helperspan.offsetWidth
	 response.data.data.replies.map((obj) => {
		 message.push({
			 content: obj.text,
			 id: ++this.lastId,
			 itemWidth: currentWidth + 2
		 })

		 this.setState({
			 myItems: message
		 })
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


render() {
  const ct = "wait";
  return (
    <div>
    <div><p>{ct}</p>
    <div>
    {this.makeAddedList()}
    </div>
    <input
					id="add"
					type="text"
					name="initvalue"
					autoComplete="off"
				  maxLength="70"
					onFocus={this.handleFocus}
					onChange={this.handleChange}
					onKeyPress={this.handleKeypress}
					onBlur={this.handleBlur}
					value={this.state.content_add}
					style={{ width: this.state.width }}
          placeholder = "comment"
				/>

				<div id="helperspan" ref={el => (this.helperspan = el)}>

				</div>
    </div>
    </div>
  )

}
}

export default ReplyChat
