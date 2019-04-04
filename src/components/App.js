import React, { Component } from 'react';
import '../App.css';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

const GET_MESSAGES = gql`
  {
    messages {
      edges {
        id
        text
        createdAt
        user {
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
        <h1>Message App</h1>
        <Query query={GET_MESSAGES}>
          {({ loading, error, data }) => {
            // ローディングしているときの処理
            if (loading) { return <div>Loading...</div> }
            // エラーが起きたときの処理
            else if (error) { return <div>error occurred!</div> }
            // Queryが成功してデータが取得できたときの処理
            else {
              const { edges } = data.messages;
              console.log(edges);
              return (
                  <div>
                    <h2>Message一覧</h2>
                    <ul>
                      { edges.map((message) => {
                        return <li key={message.id} className="message_item">
                          <p className="message_text">
                            {message.text} ({message.user.username})
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
}

export default App;
