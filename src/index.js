import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from 'react-apollo';
import { BrowserRouter } from "react-router-dom";
import { Route } from "react-router";

import App from './components/App';
import Login from './components/Login';
import Create from './components/Create';

// TODO client系の設定は別ファイルにする
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from "apollo-cache-inmemory";

// GraphQLで連携するサーバーのURL
const MESSAGE_APP_BASE_URL = 'https://nrgok-graphql-server-node-js.herokuapp.com/graphql';

// headerの設定などを担当するライブラリの設定
const httpLink = new HttpLink({
    uri: MESSAGE_APP_BASE_URL,
});

// GraphQLの通信結果をキャッシュする設定
const cache = new InMemoryCache();

// ApolloClientの設定
const client = new ApolloClient({
    link: httpLink,
    cache,
});

// ApolloClientをrootコンポーネントに適用する
ReactDOM.render(
    <ApolloProvider client={client}>
        <BrowserRouter>
            <React.Fragment>
                <Route exact path="/" component={App} />
                <Route path="/login" component={Login} />
                <Route path="/create" component={Create} />
            </React.Fragment>
        </BrowserRouter>
    </ApolloProvider>,
    document.getElementById('root')
);
