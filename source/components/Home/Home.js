import React, { Component } from 'react'
import { Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

import styles from './Home.scss'

class Home extends Component {

    render() {
        return(

      <div className="Home">
         <h1>Test Router</h1>
         <br />
          <Link to="/Map">
              <Button>
                  Map
              </Button>
          </Link>
          <Link to="/NewChat">
                <Button>
                    NewChat
                </Button>
          </Link>
          <Link to="/ReplyChat">
                <Button>
                    Reply
                </Button>
          </Link>
    </div>

        )
    }
}

export default Home
