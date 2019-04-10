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
import { ApolloLink } from 'apollo-link';
import { onError } from "apollo-link-error";
import { setContext } from "apollo-link-context";
import { AUTH_TOKEN } from "./constants";

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
            "x-token": token    ? token : ''
        }
    }
});

// エラー設定
const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
        for(let err of graphQLErrors) {
            switch (err.extensions.code) {
                case 'UNAUTHENTICATED':
                    // ここにきたい
                    console.log("えらーーー！！！");
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
    // link: authLink.concat(httpLink),
    link: ApolloLink.from([authLink.concat(httpLink), errorLink]),
    cache,
});

// onError: ({ graphQLErrors, networkError, operaiton, forward }) => {
//     if (graphQLErrors) {
//         for(let err of graphQLErrors) {
//             switch (err.extensions.code) {
//                 case 'UNAUTHENTICATED':
//                     console.log('ログインが必要なんだよ(´・ω・｀)');
//                     // トークンをリフレッシュする
//                     // const newToken = getNewToken();
//                     // const headers = operaiton.getContext().headers;
//                     // operaiton.setContext({
//                     //     ...headers,
//                     //     "x-token": newToken
//                     // })
//                     break;
//                 default:
//             }
//         }
//     }
// }



// コピーここから
// const client = new ApolloClient({
//     uri: '<your graphql endpoint>',
//     // Apollo Boost allows you to specify a custom error link for your client
//     onError: ({ graphQLErrors, networkError, operation, forward }) => {
//         if (graphQLErrors) {
//             for (let err of graphQLErrors) {
//                 // handle errors differently based on its error code
//                 switch (err.extensions.code) {
//                     case 'UNAUTHENTICATED':
//                         // old token has expired throwing AuthenticationError,
//                         // one way to handle is to obtain a new token and
//                         // add it to the operation context
//                         const headers = operation.getContext().headers
//                         operation.setContext({
//                             headers: {
//                                 ...headers,
//                                 authorization: getNewToken(),
//                             },
//                         });
//                         // Now, pass the modified operation to the next link
//                         // in the chain. This effectively intercepts the old
//                         // failed request, and retries it with a new token
//                         return forward(operation);
//
//                     // handle other errors
//                     case 'ANOTHER_ERROR_CODE':
//                     // ...
//                 }
//             }
//         }
//     },
// });
// コピーここまで

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
