import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { Link } from 'react-router-dom'
import MenuAppBar from "./MenuAppBar";


const PERSONAL_MESSAGE_LIST = gql`
  query personalUserPage($userId: ID!) {
    user(id: $userId) {
      username
      messages {
        id
        text
        createdAt
      }
    }
  }
`;

class PersonalPage extends Component {
  constructor() {
    super();
    this.state = {

    }
  }

  render() {
    const { userId } = this.props.match.params;
    return (
      <div className="App">
        <MenuAppBar />
        <Query query={PERSONAL_MESSAGE_LIST} variables={{ userId }}>
        {({ loading, error, data }) => {
          if (loading) { return <div>Loading...</div> }
          else if (error) { return <div>error...</div> }
          else {
            const { messages } = data.user;
            return (
              <div>
                <h2>{data.user.username}さんのメッセージ一覧</h2>
                <ul>
                  { messages.map(message => {
                      return (
                        <li key={ message.id } className="message_item">
                          <p className="message_text">
                            { message.text }
                          </p>
                          <p className="message_datetime">
                            { message.createdAt }
                          </p>
                        </li>
                      )
                    })
                  }
                </ul>
              </div>
            )
          }
        }}
        </Query>
        <div>
          <Link to="/">
            TOPへ戻る
          </Link>
        </div>
      </div>
    )
  }
}

export default PersonalPage;