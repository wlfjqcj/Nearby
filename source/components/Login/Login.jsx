import React, { Component } from 'react'
import { Button, Input, Card } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { withRouter, browserHistory} from 'react-router'
import styles from './styles.scss'
import PropTypes from "prop-types";
const loginurl = 'http://fengshuang.org:3000'
class Login extends React.Component {



    constructor(props, context) {
        super(props, context);


        this.state = {
            user: {
                password: '',
                email: ''
            },

            message: ''
        }

        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
    }

    onSubmit(e) {
        e.preventDefault();

        const email = encodeURIComponent(this.state.user.email);
        const password = encodeURIComponent(this.state.user.password);
        const formData = `email=${email}&password=${password}`;

        // create an AJAX request (This should probably done with Axios instead)
        const xhr = new XMLHttpRequest();
        xhr.open('post', loginurl + '/api/login');
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhr.responseType = 'json';
        xhr.addEventListener('load', () => {
            if (xhr.status === 200) {
                this.setState({
                    message: 'Successfully logged in!'
                })
                this.props.history.push("/map");

            } else {
                this.setState({
                    message: 'Email or Password not correct'
                })
            }
        });
        xhr.send(formData);
    }

    onChangeEmail(e) {
        const user = this.state.user;
        user.email = e.target.value;
        this.setState({
            user
        })
    }

    onChangePassword(e) {
        const user = this.state.user;
        user.password = e.target.value;
        this.setState({
            user
        })
    }

    render() {
        return(
            <form className="Login" action="/" onSubmit={this.onSubmit}>
            <Card className="Login__content">
                <div>
                    <h1>Login</h1>
                    <Input label="Email" onChange={this.onChangeEmail} />
                    <br/><br/>
                    <Input label="Password"  type = 'password' onChange={this.onChangePassword} />
                    <br/><br/>

                    <p>{this.state.message}</p>
                    <Input type="submit" />
                    <h4>No account yet? Click <Link to="/login/register">here</Link> to Register!</h4>

                    <Link to="/dashboard"><p>Go to Dashboard</p></Link>
                </div>
            </Card>
        </form>
    )
}
}

export default withRouter(Login)
