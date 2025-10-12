import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

const client = new ApolloClient({
  link: new HttpLink({ uri: process.env.WP_GRAPHQL_URL }),
  cache: new InMemoryCache(),
});

export default client;