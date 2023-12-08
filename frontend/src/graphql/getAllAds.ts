import { gql } from "@apollo/client";

export const getAllAds = gql`
  query AllAds($skip: Int, $take: Int, $where: AdsWhere) {
    items: allAds(skip: $skip, take: $take, where: $where) {
      id
      title
      imgUrl
      price
      description
      categories {
        id
        name
      }
    }
    count: allAdsCount(where: $where)
  }
`;
