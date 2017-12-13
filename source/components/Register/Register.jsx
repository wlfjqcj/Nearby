import React, { Component } from 'react'
import { Button, Input, Card, Form, Checkbox } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import GoogleMapReact from 'google-map-react';
import GoogleMap from 'google-map-react';
import styles from './styles.scss'

const loginurl = "http://fengshuang.org:3000"
class Register extends Component {
    constructor() {
        super();

        this.state = {
            zoommap:15,
            mapcenter:[40.11683643859134,-88.24157047271729],
            user: {

                username: '',
                password: '',
                email: ''
            },

            message: ''
        }

        this.onSubmit = this.onSubmit.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangeUsername = this.onChangeUsername.bind(this);
    }

    onSubmit(e) {
        e.preventDefault();

        // create a string for an HTTP body message
        const name = encodeURIComponent(this.state.user.username);
        const email = encodeURIComponent(this.state.user.email);
        const password = encodeURIComponent(this.state.user.password);
        const formData = `username=${name}&email=${email}&password=${password}`;

        // create an AJAX POST request (This should probably done with Axios instead)
        const xhr = new XMLHttpRequest();
        xhr.open('post', loginurl + '/api/register');
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhr.responseType = 'json';
        xhr.addEventListener('load', () => {
            if (xhr.status === 200) {
                console.log('The form is valid');
                this.setState({
                    message: 'Registered!'
                })
            } else {
                this.setState({
                    message: 'Unable to register'
                })
            }
        });
        xhr.send(formData);
    }

    onChangeEmail(e) {
        const user = this.state.user;
        user.email = e.target.value;
        this.setState({
            user: user
        })
    }

    onChangeUsername(e) {
        const user = this.state.user;
        user.username = e.target.value;
        this.setState({
            user: user
        })
    }

    onChangePassword(e) {
        const user = this.state.user;
        user.password = e.target.value;
        this.setState({
            user: user
        })
    }


    handleChange(e) {
        this.setState({
            zoommap:e.zoom,
            // mapcenter:e.center
        })

    }



    render() {
        return(
        <div>
            <GoogleMapReact style = {{ height: '100px' , width : '100px',opacity: 0.3}}  onChange={(e)=>this.handleChange(e)}
              center={this.state.mapcenter}
              zoom={this.state.zoommap}
            >
            <div lat = {this.state.mapcenter[0]} lng = {this.state.mapcenter[1]}>

            </div>
            </GoogleMapReact>
            <div>
            <form className="Register" action="/" onSubmit={this.onSubmit}>
                <Card className="Register__content">
                    <div className='log'>
                        <h1>Register</h1>

                          <Form className="fm">
                          <Form.Field>
                          <label className="lb"><h5>Email</h5></label>
                          <input placeholder='Enter Email' onChange={this.onChangeEmail}  />
                        </Form.Field>
                        <Form.Field>
                          <label className="lb"><h5>Username</h5></label>
                          <input placeholder='Enter Username'  onChange={this.onChangeUsername}/>
                        </Form.Field>
                        <Form.Field>
                          <label className="lb"><h5>Password</h5></label>
                          <input placeholder='Enter Password' type = 'password' onChange={this.onChangePassword}/>
                        </Form.Field>
                        <Form.Field>
                          <Checkbox label='I agree to the Terms and Conditions' />
                        </Form.Field>
                        </Form>

                        <p>{this.state.message}</p>
                        <Input id="submitbutton" type="submit" />
                        <h4>Click <Link to="/">here</Link> to Log-in!</h4>

                    </div>
                </Card>
            </form>
            </div>
            </div>
    )
}
}

export default Register
