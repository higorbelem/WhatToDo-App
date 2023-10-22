import { ApolloClient, InMemoryCache } from "@apollo/client";

export const getApolloClient = () => {
    const client = new ApolloClient({
        uri: process.env.EXPO_PUBLIC_GRAPHQL_URL,
        cache: new InMemoryCache()
    });

    return client
}