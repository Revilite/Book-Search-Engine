import { gql } from "@apoll/client";

export const QUERY_ME = gql`
  query GET_ME {
    User {
      _id
      username
      email
      bookCount
      savedBooks
    }
  }

`