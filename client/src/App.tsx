import React from "react";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import TagList from "./components/tagList";
import "./App.css";

// Connection to GraphQL API
const client = new ApolloClient({
  uri: "/graphql",
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <TagList />
    </ApolloProvider>
  );
}

export default App;
