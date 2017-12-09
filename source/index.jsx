import React from 'react';
import {render} from 'react-dom';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'
import 'semantic-ui-css/semantic.min.css';
//test
// Include your new Components here
import Home from './components/Home/Home.js';
import SimpleMap from './components/Map/Map.js';
import loginprocess from './components/Map/login.js';
import NewChat from './components/Build/NewChat.js';
import ReplyChat from './components/Reply/ReplyChat.js';
import Login from './components/Login/Login.jsx';
import Register from './components/Register/Register.jsx';

// Include any new stylesheets here
// Note that components' stylesheets should NOT be included here.
// They should be 'require'd in their component class file.
require('./styles/main.scss');

render(
<Router>
  <div>
     <Route exact path = "/" component = {Home}/>
     <Route exact path = "/map" component = {SimpleMap}/>
     <Route exact path = "/new_chat" component = {NewChat} />
     <Route exact path = "/reply_chat" component = {ReplyChat} />
     <Route exact path = "/login" component = {loginprocess} />
     <Route exact path = "/login/login" component = {Login} />
     <Route exact path = "/login/register" component = {Register} />
  </div>
</Router>,
document.getElementById('app')
);
