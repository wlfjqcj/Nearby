import React, { Component } from 'react'
import { Button, Menu } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import axios from 'axios'

class ReplyChat extends Component {

    render() {
        return(
          <div className="ReplyChat">
             <h1>Test Router</h1>
             <br />
              <Link to="/ReplyChat">
                  <Button>
                      ReplyChat
                  </Button>
              </Link>
          </div>

        )
    }
}

export default ReplyChat
