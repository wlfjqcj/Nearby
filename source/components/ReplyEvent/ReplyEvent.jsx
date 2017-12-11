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
import {Card, Image } from 'semantic-ui-react'
class ReplyEvent extends Component {
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
		this.state = {
			eventname: this.props.eventname,
            eventdescription:this.props.eventdescription,
            eventtime: this.props.eventtime,
            eventparticipants:this.props.eventparticipants,
			secondsElapsed:0,
            joinstatus: this.props.joinstatus,
            myItems:[]
		};
		this.lastId = -1;
	}










	componentDidUpdate(prevProps, prevState) {
		if (prevState.content_add != this.state.content_add) {
			const helperWidth = this.helperspan.offsetWidth;
			this.setState({ width: Math.max(50, helperWidth + 1) });
		}
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
		})
        this.setState({
            myItems: message
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
        this.setState({
            eventdescription:response.data.data.text.description,
            eventdate:response.data.data.text.date,
            eventname:response.data.data.text.name
        })
        response.data.data.replies.map((obj) => {
			message.push(obj.text)
		})
        this.setState({
            myItems: message
        })
  })
  .catch(function (error) {
    console.log(error);
  });

     this.setState((prevState) => ({
        secondsElapsed: prevState.secondsElapsed + 1,
      }));
}


render()
{
    return
    (<Card>
      <Card.Content>
        <Image floated='right' size='mini' src='/assets/images/avatar/large/steve.jpg' />
        <Card.Header>
          {this.state.eventname}
        </Card.Header>
        <Card.Meta>
          {this.state.eventdate}
        </Card.Meta>
        <Card.Description>
          {this.state.eventdescription}
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
          <div className='ui two buttons'>

              {this.state.joinstatus ? (
        <Button basic color='green'>Join</Button> />
      ) : (
         <Button basic color='red'>Decline</Button> />
      )
        }
        </div>
      </Card.Content>
  </Card>
    )
}
}

export default ReplyEvent
