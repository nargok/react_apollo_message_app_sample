import React, { Component } from 'react';
import { Mutatoin } from 'react-apollo';

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
                <button>投稿する</button>
            </div>
        )
    }
};

export default Create;

