import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import { AUTH_TOKEN } from '../constants';
import MenuAppBar from "./MenuAppBar";
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField';
import {Link} from "react-router-dom";

const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
    },
    dense: {
        marginTop: 16,
    },
    menu: {
        width: 200,
    },
});

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
                fullWidth={true}
              />
          </form>

        )
    }
}

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
            <div className="App">
                <MenuAppBar />
                <h1>ログイン</h1>
                <OutlinedTextFields
                  name="Name"
                  type="text"
                  changeField={this.handleChangeLoginName}
                />
                <OutlinedTextFields
                  name="Password"
                  type="password"
                  changeField={this.handleChangePassword}
                />
                <div>
                    <Mutation
                        mutation={LOGIN}
                        variables={{ loginName, loginPassword }}
                        onCompleted={data => this._confirm(data)}
                    >
                        {
                            mutation => (
                                <Button
                                  variant="outlined" color="primary"
                                  onClick={mutation}>
                                    ログインする
                                </Button>
                            )
                        }
                    </Mutation>
                </div>
                <Link to="/">TOPへ戻る</Link>
            </div>
        )
    }
    // Login MutationのResponseからtokenを取り出す
    _confirm = async data => {
        const { token } = data.signIn;
        this._saveUserDate(token);
        this.props.history.push('/');
    };
    // tokenをlocalstorageへ保存する
    _saveUserDate = token => {
        localStorage.setItem(AUTH_TOKEN, token);
    };
}

export default Login;