import {
    ApolloClient,
    createHttpLink, FetchResult,
    GraphQLRequest,
    InMemoryCache, Observable,
    split, useMutation
} from '@apollo/client';
import {onError} from "@apollo/client/link/error";
import {setContext} from "@apollo/client/link/context";
import AuthService from "../services/auth.service";
import {GraphQLWsLink} from "@apollo/client/link/subscriptions";
import {createClient} from 'graphql-ws';
import {getMainDefinition} from "@apollo/client/utilities";
import {REFRESH_TOKEN} from "./gqls";
import {ResponseRefreshToken} from "./types";
import {deleteCookie} from "cookies-next";
import LocalStorageService from '@/services/LocalStorageService';
import {registerApolloClient} from "@apollo/experimental-nextjs-app-support/rsc";

const HOST_GRAPHQL = process.env.HOST_GRAPQL;
const url = HOST_GRAPHQL ? HOST_GRAPHQL : 'http://localhost:3030/graphql';

const credentialLinkHttp = createHttpLink({
    uri: url,
    credentials: 'include'
});

function isRefreshRequest(operation: GraphQLRequest) {
    return operation.operationName === 'refresh';
}

// const returnTokenDependingOnOperation = (operation: GraphQLRequest): string => {
//     console.log('returnTokenDependingOnOperation', operation.operationName);
//     const tokens = AuthService.getLocalTokens();
//     const at = LocalStorageService.get('access_token');
//     const rt = LocalStorageService.get('refresh_token');
//
//     if (isRefreshRequest(operation)) {
//         console.log('CHEK refresh', operation.operationName);
//         if (!rt)
//             window.location.replace('/auth');
//
//         return rt || '';
//     }
//
//     return at || '';
// };

const authLink = setContext((operation, {headers}) => {
            const at = LocalStorageService.get('access_token');
            const rt = LocalStorageService.get('refresh_token');
            let token = null;

            if (operation.operationName === 'refresh' || operation.operationName === 'Refresh') {
                token = rt;
                if (!token)
                    window.location.replace('/auth');
            } else token = at;

            return {
                headers: {
                    ...headers,
                    authorization: token ? `Bearer ${token}` : "",
                }
            };
        }
    )
;

const wsLink = typeof window !== "undefined" ? new GraphQLWsLink(
    createClient({
        url: "ws://localhost:3030/graphql",
        lazy: true,
    })
) : null;

const errorLink = onError(({graphQLErrors, networkError, forward, operation}) => {
    if (graphQLErrors) {
        graphQLErrors.forEach(async ({message, locations, path, extensions}) => {
                if (extensions.code === "UNAUTHENTICATED") {
                    console.log("UNAUTHENTICATED");
                    if (operation.operationName === 'Refresh') {
                        return;
                    }

                    const rt = LocalStorageService.get('refresh_token');

                    if (rt) {
                        await getRefreshToken();
                    }
                    // else {
                    //     window.location.replace('/auth');
                    // }

                    forward(operation);
                }

                if (extensions.code === "FORBIDDEN") {
                    window.location.replace('/auth');
                }

                console.log(`[GraphQL error]: Message: ${message}, Location: ${JSON.stringify(locations)}, Path: ${path}`, extensions);
                console.log(extensions);
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
        .concat(credentialLinkHttp)
) : authLink.concat(errorLink)
    .concat(credentialLinkHttp);

const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: splitLink
});

const getRefreshToken = async () => {
    try {
        const refreshResolverResponse = await client.mutate<ResponseRefreshToken, {}>({
            mutation: REFRESH_TOKEN
        });

        LocalStorageService.add('access_token', refreshResolverResponse.data?.data?.refresh?.access_token);
        LocalStorageService.add('refresh_token', refreshResolverResponse.data?.data?.refresh?.refresh_token);

        return refreshResolverResponse.data?.refresh;
    } catch (e) {
        console.log('getRefreshToken error', e);
        deleteCookie('access_token');
        deleteCookie('refresh_token');
        LocalStorageService.remove('access_token');
        LocalStorageService.remove('refresh_token');
        throw e;
    }
};

// export const { getClient, query, PreloadQuery } = registerApolloClient(() => {
//     return new ApolloClient({
//         cache: new InMemoryCache(),
//         link: splitLink
//     });
// });

export default client;
