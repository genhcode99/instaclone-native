import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  makeVar,
  split,
} from "@apollo/client"
import { WebSocketLink } from "@apollo/client/link/ws"
import { onError } from "@apollo/client/link/error"
import { setContext } from "@apollo/client/link/context"
import {
  getMainDefinition,
  offsetLimitPagination,
} from "@apollo/client/utilities"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { createUploadLink } from "apollo-upload-client"

export const isLoggedInVar = makeVar(false)
export const authorizationVar = makeVar("")

export const logUserIn = async (authorization) => {
  await AsyncStorage.setItem("authorization", authorization)
  isLoggedInVar(true)
  authorizationVar(authorization)
}

export const logUserOut = async () => {
  await AsyncStorage.removeItem("authorization")
  isLoggedInVar(false)
  authorizationVar(null)
}

const uploadHttpLink = createUploadLink({
  uri: "http://localhost:4000/graphql",
})

const wsLink = new WebSocketLink({
  uri: "ws://localhost:4000/subscriptions",
  options: {
    reconnect: true,
    connectionParams: {
      authorization: authorizationVar(),
    },
  },
})

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      authorization: authorizationVar(),
    },
  }
})

const onErrorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    console.log("GrqphQl Error", graphQLErrors)
  }
  if (networkError) {
    console.log("Network Error", networkError)
  }
})

export const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        seeFeed: offsetLimitPagination(),
      },
    },
  },
})

const httpLinks = authLink.concat(onErrorLink).concat(uploadHttpLink)

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query)
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    )
  },
  wsLink,
  httpLinks,
)

const client = new ApolloClient({
  link: splitLink,
  cache,
})

export default client
