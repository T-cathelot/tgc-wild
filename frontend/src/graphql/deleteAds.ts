import { gql } from "@apollo/client";

export const deleteAds = gql`
  mutation DeleteAds($deleteAdsId: ID!) {
    deleteAds(id: $deleteAdsId) {
      id
    }
  }
`;
