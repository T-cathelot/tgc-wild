import { gql } from "@apollo/client";

export const createAds = gql`
  mutation CreateAds($data: AdsCreateInput!) {
    item: createAds(data: $data) {
      id
    }
  }
`;
