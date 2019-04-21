import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import MenuAppBar from "./MenuAppBar";
import Button from '@material-ui/core/Button'
import TextField from "@material-ui/core/TextField";
import {Link} from "react-router-dom";

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
          multiline="true"
          rows={5}
          fullWidth={true}
          margin="normal"
          variant="outlined"
        />
      </form>

    )
  }
}


const CREATE_MESSAGE = gql`
  mutation createMessage($text: String!) {
    createMessage(text: $text) {
      id
      text
      createdAt
    }
  }
`;

class Create extends Component {
    constructor() {
        super()
        this.state = {
            text: ""
        }
    }

    handleChangeText = message => {
      this.setState({ text: message });
    };

    render() {
        const { text } = this.state;
        return (
            <div className="App">
                <MenuAppBar />
                <h1>メッセージ作成</h1>
              <OutlinedTextFields
                  name="Message"
                  type="text"
                  changeField={this.handleChangeText}
                />
                <div>
                  <Mutation
                      mutation={CREATE_MESSAGE}
                      variables={{ text }}
                      onCompleted={ () => this._redirectToRoot() }
                  >
                      {
                          mutation => (
                              <Button
                                variant="outlined" color="primary"
                                onClick={mutation}>
                                投稿する
                              </Button>
                          )
                      }
                  </Mutation>
                </div>
                <Link to="/">TOPへ戻る</Link>
            </div>
        )
    }
    _redirectToRoot = async () => {
        this.props.history.push('/');
    }
};

export default Create;

