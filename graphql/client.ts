import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { getSession } from "next-auth/react";

const httpLink = createHttpLink({
  uri: process.env.NEXT_PUBLIC_GRAPHQL,
});

const authLink = setContext(async (_, { headers }) => {
  const session = await getSession();
  const token = session?.user.token;
  console.log(token);
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  // uri: process.env.NEXT_PUBLIC_GRAPHQL,
  cache: new InMemoryCache(),
});

export default client;
