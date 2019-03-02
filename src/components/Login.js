import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { login } from '../actions/loginActions';
import { Link } from 'react-router-dom'

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    if(localStorage.getItem('currentUser'))
      props.history.push('/home')

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.user) {
      localStorage.setItem("currentUser", JSON.stringify(nextProps.user))
      this.props.history.push('/home')
    }
  }

  onSubmit(e) {
    e.preventDefault();
    const user = {
      email: this.state.email,
      password: this.state.password
    }
    this.props.login(user);
  }

  render() {
    return (
      <div>
        <h1 style={{textAlign: 'center'}}>Login</h1>
        <form onSubmit={this.onSubmit}>
          <div>
            <label>Email:</label>
            <input
              type="email"
              name="email"
              onChange={this.onChange}
              required
            />
          </div>
          <br />
          <div>
            <label>Password:</label>
            <input
              type="password"
              name="password"
              onChange={this.onChange}
              required
            />
          </div>
          <br></br>
          <span style={{fontSize: '14px'}}>Not registered yet? &nbsp;
           <Link to='/register' style={{cursor: 'pointer', color:'blue'}}>Register</Link> now</span>
          <br></br>
          <br></br>
          <button className="button" type="submit">Login</button>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  login: PropTypes.func.isRequired,
  user: PropTypes.object
};

const mapStateToProps = state => ({
    user: state.user
});

export default connect(mapStateToProps, { login })(Login);
