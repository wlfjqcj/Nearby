import React, { Component } from 'react'
import { Button, Card } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

import styles from './login.scss'

class loginprocess extends Component {
    render() {
        return(
            <div className="loginprocess">
                <Card>
                    <h1>Welcome to MP2!</h1>

                    <span>
                        <Link to="/login/login">
                            <Button>
                                Login
                            </Button>
                        </Link>

                        <Link to="/login/register">
                            <Button>
                                Register
                            </Button>
                        </Link>
                    </span>

                    <br />
                </Card>
            </div>
        )
    }
}

export default loginprocess
