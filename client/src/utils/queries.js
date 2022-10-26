import { gql } from "@apollo/client";

export const GET_ME = gql`
  query GET_ME {
    User{
      _id
      username
      email
      bookCount
      savedBooks
    }
  }

`