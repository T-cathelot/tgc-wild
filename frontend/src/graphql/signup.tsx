import { gql } from "@apollo/client";

export const signup = gql`
  mutation signup($data: UserCreateInput!) {
    item: signup(data: $data) {
      id
    }
  }
`;
