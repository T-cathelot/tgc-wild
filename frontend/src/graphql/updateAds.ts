import { gql } from "@apollo/client";

export const updateAd = gql`
  mutation UpdateAds($data: AdsUpdateInput!, $id: ID!) {
    updateAds(data: $data, id: $id) {
      categories {
        id
        name
      }
      title
      price
      imgUrl
      description
      id
    }
  }
`;
