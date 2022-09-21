import {ApolloClient, createHttpLink, from, InMemoryCache, split} from '@apollo/client';
import {onError} from "@apollo/client/link/error";
import {setContext} from "@apollo/client/link/context";
import AuthService from "../auth.service";
import {GraphQLWsLink} from "@apollo/client/link/subscriptions";
import { createClient } from 'graphql-ws';
import {getMainDefinition} from "@apollo/client/utilities";

const HOST_GRAPQL = process.env.HOST_GRAPQL
const url = HOST_GRAPQL ? HOST_GRAPQL : 'http://localhost:3030/graphql'

const credentialLinkHttp = createHttpLink({
    uri: url,
    credentials: 'include'
});

const authLnkHttp = setContext((_, {headers}) => {
    const tokens = AuthService.getLocalTokens();
    console.log(headers)
    return {
        headers: {
            ...headers,
            Authorization: token.at ? `Bearer ${token.at}` : "",
        }
    }
})

const authLink = setContext((_, { headers }) => {
    const tokens = AuthService.getLocalTokens();
    const token = tokens.at

    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : "",
        }
    }
});

const wsLink = typeof window !== "undefined" ? new GraphQLWsLink(
            createClient({
                url: "ws://localhost:3030/graphql",
                options: {
                    reconnect: true,
                    lazy: true,
                }
            })
        ) : null;

const publicLinkHttp = createHttpLink({
    uri: url,
    credentials: 'include'
});

const errorLink = onError(({graphQLErrors, networkError}) => {
    if (graphQLErrors)
        graphQLErrors.forEach(({message, locations, path}) =>
            console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`),
        );

    if (networkError) console.log(`[Network error]: ${networkError}`);
});

const splitLink =  typeof window !== "undefined" && wsLink != null ? split(
        ({ query }) => {
            const def = getMainDefinition(query);
            return (
                def.kind === "OperationDefinition" &&
                def.operation === "subscription"
            );
        },
        wsLink,
        authLink.concat(credentialLinkHttp)
    ) : authLink.concat(credentialLinkHttp);

const client = new ApolloClient({
    cache: new InMemoryCache(),
    // link: credentialLnkHttp
    link: splitLink
    // link: authLink.concat(credentialLinkHttp)
    // link: from([authLnkHttp, credentialLnkHttp])
    // from([errorLink, authLnkHttp, publicLinkHttp])
});

export default client
