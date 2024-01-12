import { gql } from "@apollo/client";

export const signin = gql`
  mutation singin($password: String!, $email: String!) {
    item: signin(password: $password, email: $email) {
      email
      id
    }
  }
`;
