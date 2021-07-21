import { gql, useQuery, useReactiveVar } from "@apollo/client"
import { useEffect } from "react"
import { isLoggedInVar, logUserOut } from "../apollo"

export const ME_QUERY = gql`
  query me {
    me {
      id
      username
      avatar
      totalFollowing
      totalFollowers
    }
  }
`

const useUser = () => {
  const hasAuthorization = useReactiveVar(isLoggedInVar)
  const { data } = useQuery(ME_QUERY, { skip: !hasAuthorization })

  useEffect(() => {
    if (data?.me === null) {
      logUserOut()
    }
  }, [data])
  return { data }
}

export default useUser
