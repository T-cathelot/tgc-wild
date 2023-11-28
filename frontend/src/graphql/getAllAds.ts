import { gql } from "@apollo/client";

export const getAllAds = gql`
  query ads($where: AdsWhere) {
    items: allAds(where: $where) {
      id
      title
      price
      imgUrl
      description
      categories {
        id
        name
      }
    }
  }
`;
