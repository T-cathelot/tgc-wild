import { gql } from "@apollo/client";

export const getMe = gql`
  query me {
    item: me {
      id
      email
    }
  }
`;
