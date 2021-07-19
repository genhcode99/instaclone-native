import { ApolloClient, InMemoryCache, makeVar } from "@apollo/client"
import AsyncStorage from "@react-native-async-storage/async-storage"

export const isLoggedInVar = makeVar(false)

export const logUserIn = async (authorization) => {
  await AsyncStorage.multiSet([
    ["authorization", JSON.stringify(authorization)],
    ["loggedIn", JSON.stringify("yes")],
  ])
  isLoggedInVar(true)
}

const client = new ApolloClient({
  uri: "https://896331ed5b9f.ngrok.io/graphql",
  cache: new InMemoryCache(),
})

export default client
