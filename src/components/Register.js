import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { register } from '../actions/loginActions';

class Register extends Component {
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
        alert('User Created Successfully')
        this.props.history.push("/")
    }
  }

  onSubmit(e) {
    e.preventDefault();
    const user = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password
    }
    this.props.register(user);
  }

  render() {
    return (
      <div>
        <h1 style={{textAlign: 'center'}}>Register</h1>
        <form onSubmit={this.onSubmit}>
          <div>
            <label>Name: </label>
            <br />
            <input
              type="text"
              name="name"
              onChange={this.onChange}
              required
            />
          </div>
          <br />
          <div>
            <label>Email: </label>
            <br />
            <input
              type="email"
              name="email"
              onChange={this.onChange}
              required
            />
          </div>
          <br />
          <div>
            <label>Password: </label>
            <br />
            <input
              type="password"
              name="password"
              onChange={this.onChange}
              required
            />
          </div>
          <br />
          <button className="button" type="submit">Register</button>
        </form>
      </div>
    );
  }
}

Register.propTypes = {
  register: PropTypes.func.isRequired,
  user: PropTypes.object
};

const mapStateToProps = state => ({
    user: state.user
});

export default connect(mapStateToProps, { register })(Register);
