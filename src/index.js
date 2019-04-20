import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from 'react-apollo';
import { Router, Switch } from 'react-router-dom';
import { Route } from "react-router";
import { onError } from "apollo-link-error";
import { ApolloLink } from "apollo-link";

import browserHistory from './browserHistory';
import App from './components/App';
import Login from './components/Login';
import Create from './components/Create';


// TODO client系の設定は別ファイルにする
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from "apollo-cache-inmemory";
import { setContext } from "apollo-link-context";
import { AUTH_TOKEN } from "./constants";
import PersonalPage from "./components/Personal";

// GraphQLで連携するサーバーのURL
const MESSAGE_APP_BASE_URL = 'https://nrgok-graphql-server-node-js.herokuapp.com/graphql';

// headerの設定などを担当するライブラリの設定
const httpLink = new HttpLink({
    uri: MESSAGE_APP_BASE_URL,
});

const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem(AUTH_TOKEN);
    return {
        headers: {
            ...headers,
            "x-token": token    ? `${token}` : ''
        }
    }
});

const errorLink = onError(  ({ graphQLErrors, networkError, operation, forward }) => {
    if (graphQLErrors) {
        for (let err of graphQLErrors) {
            switch (err.extensions.code) {
                case 'BAD_USER_INPUT':
                    console.log("もう一度入力内容を確認させよう");
                    break;
                case 'UNAUTHENTICATED':
                    console.log("認証が必要");
                    alert("ログインしてください");
                    browserHistory.push("/login");
                    break;
                case 'FORBIDDEN':
                    console.log('認証が必要');
                    alert("ログインしてください");
                    browserHistory.push("/login");
                    break;
                default:
            }
        }
    }
    if (networkError) console.log(`[Network error]: ${networkError}`);
});

// GraphQLの通信結果をキャッシュする設定
const cache = new InMemoryCache();

// ApolloClientの設定
const client = new ApolloClient({
    link: ApolloLink.from([authLink, errorLink, httpLink]),
    cache,
});

// ApolloClientをrootコンポーネントに適用する
ReactDOM.render(
    <ApolloProvider client={client}>
        <Router history={browserHistory}>
            <React.Fragment>
                <Switch>
                    <Route exact path="/" component={App} />
                    <Route path="/login" component={Login} />
                    <Route path="/create" component={Create} />
                    <Route path="/personal/:userId" component={PersonalPage} />
                </Switch>
            </React.Fragment>
        </Router>
    </ApolloProvider>,
    document.getElementById('root')
);


