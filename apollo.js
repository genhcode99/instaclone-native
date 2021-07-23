import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  makeVar,
} from "@apollo/client"
import { onError } from "@apollo/client/link/error"
import { setContext } from "@apollo/client/link/context"
import { offsetLimitPagination } from "@apollo/client/utilities"
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
  uri: "https://ab4f61acbd05.ngrok.io/graphql",
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

const client = new ApolloClient({
  link: authLink.concat(onErrorLink).concat(uploadHttpLink),
  cache,
})

export default client
