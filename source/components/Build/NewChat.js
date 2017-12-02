import React, { Component } from 'react'
import { Button, Menu } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import axios from 'axios'

class NewChat extends Component {

    render() {
        return(
          <div className="NewChat">
             <h1>Test Router</h1>
             <br />
              <Link to="/Map">
                  <Button>
                      Map
                  </Button>
              </Link>
          </div>

        )
    }
}

export default NewChat
