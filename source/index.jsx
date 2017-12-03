import React from 'react';
import {render} from 'react-dom';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'
import 'semantic-ui-css/semantic.min.css';
//test
// Include your new Components here
import Home from './components/Home/Home.js';
import SimpleMap from './components/Map/Map.js';
import NewChat from './components/Build/NewChat.js';
import ReplyChat from './components/Reply/ReplyChat.js';

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
    <Route path = "/reply_chat" component = {ReplyChat} />
  </div>
</Router>,
document.getElementById('app')
);
