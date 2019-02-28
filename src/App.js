import React, { Component } from 'react';
import './App.css';
import { Provider } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom'

import Login from './components/Login'
import Register from './components/Register'

import store from './store';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div className="App">
            <Route exact path='/' component={Login}></Route>
            <Route path='/register' component={Register}></Route>
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
