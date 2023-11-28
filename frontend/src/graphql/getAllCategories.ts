import { gql } from "@apollo/client";

export const getAllCategories = gql`
  query categories {
    items: allCategories {
      id
      name
    }
  }
`;
