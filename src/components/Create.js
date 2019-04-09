import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';

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
    render() {
        const { text } = this.state;
        return (
            <div>
                <h1>メッセージ作成</h1>
                <div>
                    <textarea
                        name="message_text"
                        id="message_text"
                        cols="40"
                        rows="10"
                        placeholder="メッセージを入力してください"
                        onChange={(event) => this.setState({ text: event.target.value})}
                    >
                    </textarea>
                </div>
                <Mutation
                    mutation={CREATE_MESSAGE}
                    variables={{ text }}
                    onCompleted={ () => this._redirectToRoot() }
                >
                    {
                        mutation => (
                            <button onClick={mutation}>投稿する</button>
                        )
                    }
                </Mutation>
            </div>
        )
    }
    _redirectToRoot = async () => {
        this.props.history.push('/');
    }
};

export default Create;

