import {
    ApolloClient,
    createHttpLink, FetchResult,
    GraphQLRequest,
    InMemoryCache, Observable,
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
import {useGetTokens} from "./hooks";
import {removeCookies} from "cookies-next";
import {GraphQLError} from 'graphql/error';

const HOST_GRAPHQL = process.env.HOST_GRAPQL
const url = HOST_GRAPHQL ? HOST_GRAPHQL : 'http://localhost:3030/graphql'

const credentialLinkHttp = createHttpLink({
    uri: url,
    credentials: 'include'
});

function isRefreshRequest(operation: GraphQLRequest) {
    return operation.operationName === 'Refresh';
}

const returnTokenDependingOnOperation = (operation: GraphQLRequest): string => {
    console.log('returnTokenDependingOnOperation', operation.operationName)
    const tokens = AuthService.getLocalTokens();
    // console.log('returnTokenDependingOnOperation', tokens)
    if (isRefreshRequest(operation))
        return tokens.rt || '';

    return tokens.at || '';
}

const authLink = setContext((operation, {headers}) => {
    const token = returnTokenDependingOnOperation(operation);
    // console.log('operation', operation, token)

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
            options
    : {
        reconnect: true,
        lazy: true,
    }
})
) :
null;

const errorLink = onError(({graphQLErrors, networkError, forward, operation}) => {
    if (graphQLErrors) {
        graphQLErrors.forEach(async ({message, locations, path, extensions}) => {
                if (extensions.code === "UNAUTHENTICATED") {
                    if (operation.operationName === 'Refresh') return;

                    const updateTokens = await getRefreshToken();
                    forward(operation)

                    // const observable = new Observable<FetchResult<Record<string, any>>>(
                    //     (observer) => {
                    //         (async () => {
                    //             try {
                    //                 const updateTokens = await getRefreshToken();
                    //                 console.log(updateTokens)
                    //
                    //                 if (!updateTokens?.access_token) {
                    //                     throw new GraphQLError('Empty AccessToken');
                    //                 }
                    //
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
                    //
                    // return observable
                   // await getRefreshToken()
                }

                if (extensions.code === "FORBIDDEN") {
                    //redirect to login page
                    window.location.replace('/auth')
                }

                console.log(`[GraphQL error]: Message: ${message}, Location: ${JSON.stringify(locations)}, Path: ${path}`, extensions)
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
    authLink.concat(errorLink)
        .concat(authLink)
        .concat(credentialLinkHttp)
) : authLink.concat(errorLink)
    .concat(authLink)
    .concat(credentialLinkHttp);

const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: splitLink
});

const getRefreshToken = async () => {
    try {
        const refreshResolverResponse = await client.mutate<ResponseRefreshToken, {}>({
            mutation: REFRESH_TOKEN
        })

        return refreshResolverResponse.data?.refresh;
    } catch (e) {
        console.log('getRefreshToken error', e)
        removeCookies('access_token')
        removeCookies('refresh_token')
        // throw e;
    }
}

export default client
