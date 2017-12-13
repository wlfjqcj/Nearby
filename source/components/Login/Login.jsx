import React, { Component } from 'react'
import { Button, Input, Card, Form, Checkbox } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { withRouter, browserHistory} from 'react-router'
import styles from './styles.scss'
import GoogleMapReact from 'google-map-react';
import GoogleMap from 'google-map-react';
import PropTypes from "prop-types";
const loginurl = 'http://fengshuang.org:3000';
class Login extends React.Component {




    constructor(props, context) {
        super(props, context);


        this.state = {
            zoommap:15,
            mapcenter:[40.11683643859134,-88.24157047271729],
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
        xhr.withCredentials = true;
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

        xhr.responseType = 'json';
        xhr.addEventListener('load', () => {
            if (xhr.status === 200) {
                this.setState({
                    message: 'Successfully logged in!'
                })
                localStorage.setItem('username', xhr.response.data.username);
                this.props.history.push("/map");

            } else {
                this.setState({
                    message: 'Email or Password not correct'
                })
            }
        });
        xhr.send(formData);
    }




    componentWillMount() {
        if (localStorage.getItem('username'))
            this.props.history.push("/map");


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


    handleChange(e) {
        this.setState({
            zoommap:e.zoom,
            boundsmap:e.bounds,

        })

    }

    render() {
        return(
        <div>
            <GoogleMapReact style = {{ height: '100px' , opacity: 0.3, width : '100px'}}  onChange={(e)=>this.handleChange(e)}
              center={this.state.mapcenter}
              zoom={this.state.zoommap}
            >
                <div lat = {this.state.mapcenter[0]} lng = {this.state.mapcenter[1]} >

                </div>
    </GoogleMapReact>
    <div>
    <form className="Login" action="/" onSubmit={this.onSubmit} >
    <Card className="Login__content">
        <div className='log'>
            <h1>Nearby</h1>

            <Form className="fm">
    <Form.Field>
      <label className="lb"><h5>Email</h5></label>
      <input placeholder='Enter Email' onChange={this.onChangeEmail}  />
    </Form.Field>
    <Form.Field>
      <label className="lb"><h5>Password</h5></label>
      <input placeholder='Enter Password' type = 'password' onChange={this.onChangePassword}/>
    </Form.Field>
    <Form.Field>
      <Checkbox id ="checkboxlabel" label='I agree to the Terms and Conditions' />
    </Form.Field>
  </Form>



            <p>{this.state.message}</p>
            <Input id="submitbutton" type="submit"/>
            <h4>Click <Link to="/register">here</Link> to Register!</h4>


        </div>
    </Card>
</form>


</div>
</div>
    )
}
}

export default withRouter(Login)
