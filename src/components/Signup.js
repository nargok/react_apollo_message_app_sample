import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import { Link } from 'react-router-dom'
import {AUTH_TOKEN} from "../constants";
import MenuAppBar from "./MenuAppBar";
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField';

class OutlinedTextFields extends Component {
  constructor() {
    super();
    this.state = {
      name: this.props,
    };
  }

  render() {
    const {classes} = this.props;

    return (
      <form noValidate autoComplete="off">
        <TextField
          id="outlined-name"
          label={this.props.name}
          value={this.state.name}
          onChange={(e) => this.props.changeField(e.target.value)}
          type={this.props.type}
          margin="normal"
          variant="outlined"
        />
      </form>

    )
  }
}

const SIGNUP = gql`
  mutation signUp($username: String!, $email: String!, $password: String!){
    signUp(username: $username, email: $email, password: $password) {
      token
    }
  }
`;

class Signup extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      email: '',
      password: ''
    }
  }

  handleChangeUsername = username => {
    this.setState({ username: username })
  };

  handleChangeEmail = email => {
    this.setState({ email: email })
  };

  handleChangePassword = password => {
    this.setState({ password: password })
  };

  render() {
    const { username, email, password} = this.state;

    return (
      <div>
        <MenuAppBar />
        <h2>Sign Up</h2>
        <OutlinedTextFields
          name="Name"
          type="text"
          changeField={this.handleChangeUsername}
        />
        <OutlinedTextFields
          name="Email"
          type="email"
          changeField={this.handleChangeEmail}
        />
        <OutlinedTextFields
          name="Password"
          type="password"
          changeField={this.handleChangePassword}
        />
        <div>
          <Mutation
            mutation={SIGNUP}
            variables={{ username, email, password }}
            onCompleted={data => this._confirm(data)}
          >
            {
              mutation =>
                <Button
                  variant="outlined" color="primary"
                  onClick={mutation}>
                    サインアップ
                </Button>
            }
          </Mutation>
        </div>
          <Link to="/">TOPへ戻る</Link>

      </div>
    )
  }

  _confirm = async data => {
    const { token } = data.signUp;
    this._saveUserData(token);
    this.props.history.push('/');
  };

  _saveUserData = token => {
    localStorage.setItem(AUTH_TOKEN, token)
  }
}

export default Signup;