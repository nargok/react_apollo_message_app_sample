import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';


const PERSONAL_MESSAGE_LIST = gql`
  query personalUserPage($userId: ID!) {
    user(id: $userId) {
      username
      messages {
        id
        text
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
      <div>
        <h1>Message App</h1>
        <Query query={PERSONAL_MESSAGE_LIST} variables={{ userId }}>
        {({ loading, error, data }) => {
          if (loading) { return <div>Loading...</div> }
          else if (error) { return <div>error...</div> }
          else {
            console.log(data.user);
            const { messages } = data.user;
            return (
              <div>
                <h2>{data.user.username}さんのメッセージ一覧</h2>
                <ul>
                  { messages.map(message => {
                      return <li key={ message.id }>{ message.text }</li>
                    })
                  }
                </ul>
              </div>
            )
          }
        }}
        </Query>
      </div>
    )
  }
}

export default PersonalPage;