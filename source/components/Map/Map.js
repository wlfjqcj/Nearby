import React, { Component } from 'react'
import { Button, Menu } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import axios from 'axios'

class Map extends Component {

    render() {
        return(
          <div className="Map">
             <h1>Test Router</h1>
             <br />
              <Link to="/NewChat">
                  <Button>
                      NewChat
                  </Button>
              </Link>
          </div>

        )
    }
}

export default Map
