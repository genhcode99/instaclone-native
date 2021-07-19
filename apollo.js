import { ApolloClient, InMemoryCache, makeVar } from "@apollo/client"

export const isLoggedInVar = makeVar(false)

const client = new ApolloClient({
  uri: "https://896331ed5b9f.ngrok.io/graphql",
  cache: new InMemoryCache(),
})

export default client
