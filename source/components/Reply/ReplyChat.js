import React, { Component } from 'react'
import { Button, Menu } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { Segment } from 'semantic-ui-react'
import axios from 'axios'
import ReactModal from 'react-modal'
import { Comment, Form, Header } from 'semantic-ui-react'
import styles from './ReplyChat.scss';


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
render() {
  const ct = "wait";
  return (
    <div>
    {ct}
    </div>
  )

}
}

export default ReplyChat
