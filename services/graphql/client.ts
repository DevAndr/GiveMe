import {
    ApolloClient,
    createHttpLink,
    GraphQLRequest,
    InMemoryCache,
    split, useMutation
} from '@apollo/client';
import {onError} from "@apollo/client/link/error";
import {setContext} from "@apollo/client/link/context";
import AuthService from "../auth.service";
import {GraphQLWsLink} from "@apollo/client/link/subscriptions";
import {createClient} from 'graphql-ws';
import {getMainDefinition} from "@apollo/client/utilities";
import {TokenRefreshLink} from 'apollo-link-token-refresh';
import {decodeJwt} from "jose";
import {REFRESH_TOKEN} from "./gqls";
import {ParamsRefreshToken, ResponseRefreshToken} from "./types";

const HOST_GRAPQL = process.env.HOST_GRAPQL
const url = HOST_GRAPQL ? HOST_GRAPQL : 'http://localhost:3030/graphql'

const credentialLinkHttp = createHttpLink({
    uri: url,
    credentials: 'include'
});

function isRefreshRequest(operation: GraphQLRequest) {
    return operation.operationName === 'Refresh';
}

const returnTokenDependingOnOperation = (operation: GraphQLRequest) => {
    const tokens = AuthService.getLocalTokens();

    if (isRefreshRequest(operation))
        return tokens.rt || '';
    else return tokens.at || '';
}

const authLink = setContext((operation, {headers}) => {
    const token = returnTokenDependingOnOperation(operation);

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

const errorLink = onError(({graphQLErrors, networkError, forward, operation}) => {
    if (graphQLErrors) {
        graphQLErrors.forEach(async ({message, locations, path, extensions}) => {
                // if (extensions.code === "UNAUTHENTICATED") {
                //     if (operation.operationName === 'refresh') return;
                //
                //
                // }

                // const observable = new Observable<FetchResult<Record<string, any>>>(
                //     (observer) => {
                //         // used an annonymous function for using an async function
                //         (async () => {
                //             try {
                //                 const accessToken = await refreshToken();
                //
                //                 if (!accessToken) {
                //                     throw new GraphQLError('Empty AccessToken');
                //                 }
                //
                //                 // Retry the failed request
                //                 const subscriber = {
                //                     next: observer.next.bind(observer),
                //                     error: observer.error.bind(observer),
                //                     complete: observer.complete.bind(observer),
                //                 };
                //
                //                 forward(operation).subscribe(subscriber);
                //             } catch (err) {
                //                 observer.error(err);
                //             }
                //         })();
                //     }
                // );

                // const accessToken = await refreshToken();

                console.log(`[GraphQL error]: Message: ${message}, Location: ${JSON.stringify(locations)}, Path: ${path}`)
            }
        );
    }

    if (networkError) console.log(`[Network error]: ${networkError}`);
});

const splitLink = typeof window !== "undefined" && wsLink != null ? split(
    ({query}) => {
        const def = getMainDefinition(query);

        return (
            def.kind === "OperationDefinition" &&
            def.operation === "subscription"
        );
    },
    wsLink,
    authLink
        .concat(errorLink)
        .concat(authLink).concat(credentialLinkHttp)
) : authLink
    .concat(errorLink)
    .concat(authLink).concat(credentialLinkHttp);

const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: splitLink
});

export default client
