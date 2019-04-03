import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { ApolloClient } from 'apollo-client';
import {HttpLink, httpLink} from 'apollo-link-http';
import { InMemoryCache } from "apollo-cache-inmemory";

const MESSAGE_APP_BASE_URL = 'https://nrgok-graphql-server-node-js.herokuapp.com/graphql';

const httpLink = new HttpLink({
    uri: MESSAGE_APP_BASE_URL,
});

const cache = new InMemoryCache();
const client = new ApolloClient({
    link: httpLink,
    cache,
});

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
