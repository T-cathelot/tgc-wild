import { gql } from "@apollo/client";

export const getAd = gql`
  query Query($id: ID!) {
    item: ad(id: $id) {
      id
      imgUrl
      price
      title
      tags {
        id
        name
      }
      categories {
        id
        name
      }
      description
    }
  }
`;
