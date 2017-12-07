import React, { Component } from 'react'
import { Button, Menu } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { Segment } from 'semantic-ui-react'
import axios from 'axios'
import ReactModal from 'react-modal'
import { Comment, Form, Header } from 'semantic-ui-react'
import styles from './ReplyChat.scss';

class ChatMarker extends Component {
    constructor(){
        super();
        this.state = {
            locationx: [[40.01,-88.0001],[40.0022,-88.0022],[40.03,-88.0301]],
            locationy:[],
            content:[]
        }
    }
    render() {
        return (<div>

            {this.state.locationx.map(function(v, index){
                    return <ReplyChat style = {{ height: 50 , width : 50, backgroundColor: 'powderblue'}} lat = {v[0]} lng = {v[1]} chatText = 'ssss' key = {index}></ReplyChat>;
                  })
              }

    </div>
)
    }
}




class ReplyChat extends Component {
  constructor(props) {
    super(props);
    this.state = {
        chatText: props,
        showChat: false
    };
    this.replyChat = this.replyChat.bind(this);
    this.closeChat = this.closeChat.bind(this);
  }
  replyChat() {
    this.setState({
      showChat: true
    })
  }

  closeChat () {
    this.setState({ showChat: false });
  }

   render() {
        let chatText = this.state.chatText
        return(
          <div style = {{ height: 50 , width : 50, backgroundColor: 'powderblue'}}>

        <Button onClick = {this.replyChat} style = {{ height: 50 , width : 50, backgroundColor: 'powderblue'}} >chatText</Button>
           <div className = 'buildItem' >
           <ReactModal
            isOpen={this.state.showChat}
            contentLabel="Minimal Modal Example"
            >
              <Button onClick={this.closeChat}>Close Modal</Button>
              <Comment.Group>
              <Segment stacked>
                 BlaBla
               </Segment>
               <Header as='h5' dividing>Comments</Header>
                  <Form reply>
                   <Form.TextArea />
                   <Button content='Add Reply' labelPosition='left' icon='edit' primary />
                </Form>
              </Comment.Group>
            </ReactModal>
            </div>
            </div>
        )


}
}

export default ReplyChat
