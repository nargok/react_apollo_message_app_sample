import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import { Link } from 'react-router-dom'


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
        <h2>Sign Up</h2>
        <div>
          <label htmlFor="signup_username">ユーザ名</label>
          <input type='text'
                 id='signup_username'
                 placeholder="ユーザ名を入力"
                 onChange={e => this.handleChangeUsername(e.target.value)} />
        </div>
        <div>
          <label htmlFor="signup_email">メールドレス</label>
          <input type='email'
                 id='signup_email'
                 placeholder="メールアドレスを入力"
                 onChange={e => this.handleChangeEmail(e.target.value)} />
        </div>
        <div>
          <label htmlFor="signup_password">パスワード</label>
          <input type='password'
                 id='signup_password'
                 onChange={e => this.handleChangePassword(e.target.value)} />
        </div>
        <div>
          <button>サインアップ</button>
          <Link to="/">TOPへ戻る</Link>
        </div>
      </div>
    )
  }
}

export default Signup;