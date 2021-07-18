import { ApolloClient, InMemoryCache } from "@apollo/client"

const client = new ApolloClient({
  uri: "https://06ed4a036423.ngrok.io/graphql",
  cache: new InMemoryCache(),
})

export default client
