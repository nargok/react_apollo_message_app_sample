import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import { AUTH_TOKEN } from '../constants';

const LOGIN = gql`
  mutation signIn($loginName: String!, $loginPassword: String!){
      signIn(login: $loginName, password: $loginPassword) {
        token
      }
  }
`;

class Login extends Component {
    constructor() {
        super();
        this.state = {
            loginName: "",
            loginPassword: ""
        }
    }

    handleChangeLoginName = (name) => {
        this.setState({ loginName: name })
    };

    handleChangePassword = (password) => {
        this.setState({ loginPassword: password })
    };

    render () {
        // login_nameとpasswordをStateから取っておく
        const { loginName, loginPassword } = this.state;
        return (
            <div>
                <h1>ログイン</h1>
                <div>
                    <label htmlFor="login_name">ユーザ名</label>
                    <input
                        type="text"
                        id="login_name"
                        placeholder="ユーザ名"
                        onChange={(event) => this.handleChangeLoginName(event.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="login_name">パスワード</label>
                    <input
                        type="password"
                        id="login_password"
                        onChange={(event) => this.handleChangePassword(event.target.value)}
                    />
                </div>
                <div>
                    <Mutation
                        mutation={LOGIN}
                        variables={{ loginName, loginPassword }}
                        onCompleted={data => this._confirm(data)}
                    >
                        {
                            mutation => (
                                <button onClick={mutation}>ログインする</button>
                            )
                        }
                    </Mutation>
                </div>
            </div>
        )
    }
    // Login MutationのResponseからtokenを取り出す
    _confirm = async data => {
        const { token } = data.signIn;
        this._saveUserDate(token);
        this.props.history.push('/');
    }
    // tokenをlocalstorageへ保存する
    _saveUserDate = token => {
        localStorage.setItem(AUTH_TOKEN, token);
    }
}

export default Login;