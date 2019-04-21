import React, { Component } from 'react';
import '../App.css';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { Link } from 'react-router-dom'
import MenuAppBar from './MenuAppBar'

import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

import { isLoggedIn } from "../commonFunctions";

const GET_MESSAGES = gql`
  {
    messages {
      edges {
        id
        text
        createdAt
        user {
          id
          username
        }
      }
    }
  }
`;

class App extends Component {
  render() {
    return (
      <div className="App">
        <MenuAppBar />
        <h2>Message一覧</h2>
        {
          isLoggedIn() ?
            <Fab
              color="secondary" aria-label="Add"
              className="add_message"
              onClick={() => this._displayCreateMessage()}>
              <AddIcon />
            </Fab> :
            ""
        }
        <Query query={GET_MESSAGES}>
          {({ loading, error, data }) => {
            // ローディングしているときの処理
            if (loading) { return <div>Loading...</div> }
            // エラーが起きたときの処理
            // TODO 認証がきれたときのログイン画面へのリダイレクトを実装する
            else if (error) { return <div>error occurred!</div> }
            // Queryが成功してデータが取得できたときの処理
            else {
              const { edges } = data.messages;
              return (
                  <div>
                    <ul>
                      { edges.map((message) => {
                        return <li key={message.id} className="message_item">
                          <p className="message_text">
                            {message.text}
                            (
                              <Link to={`/personal/${message.user.id}`}>
                                {message.user.username}
                              </Link>
                            )
                          </p>
                          <p className="message_datetime">
                            {message.createdAt}
                          </p>
                        </li>
                      })}
                    </ul>
                  </div>
              );
            }
          }}
        </Query>
      </div>
    );
  }

  _displayLogin = () => {
    this.props.history.push("/login");
  };

  _displayCreateMessage = () => {
    this.props.history.push("/create")
  }

}

export default App;
