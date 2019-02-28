import React, { Component } from 'react';
import './App.css';
import { Provider } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom'

import Login from './components/Login'
import Register from './components/Register'
import Home from './components/Home'
import Postform from './components/Postform'

import store from './store';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div className="App">
            <Route exact path='/' component={Login}></Route>
            <Route path='/register' component={Register}></Route>
            <Route path='/home' component={Home}></Route>
            <Route path='/add-post' component={Postform}></Route>
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
