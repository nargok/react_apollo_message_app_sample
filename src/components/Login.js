import React, { Component } from 'react';

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
                    <button>ログインする</button>
                </div>
            </div>
        )
    }
}

export default Login;