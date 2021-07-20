import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  makeVar,
} from "@apollo/client"
import { setContext } from "@apollo/client/link/context"
import { offsetLimitPagination } from "@apollo/client/utilities"
import AsyncStorage from "@react-native-async-storage/async-storage"

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

const httpLink = createHttpLink({
  uri: "https://dca5eff18843.ngrok.io/graphql",
})

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      authorization: authorizationVar(),
    },
  }
})
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          seeFeed: offsetLimitPagination(),
        },
      },
    },
  }),
})

export default client
