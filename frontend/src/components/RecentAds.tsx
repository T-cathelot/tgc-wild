import React, { useEffect } from "react";
import AdCard, { AdType } from "./AdCard";
import { useState } from "react";
import { useQuery } from "@apollo/client";
import { getAllAds } from "@/graphql/getAllAds";
import { useRouter } from "next/router";

type RecentAdsProps = {
  category?: number;
  searchWord?: string | number;
};

const RecentAds = (props: RecentAdsProps) => {
  const router = useRouter();
  const { category, searchWord } = router.query;
  const { data } = useQuery<{ items: AdType[] }>(getAllAds, {
    variables: {
      where: {
        ...(searchWord ? { searchTitle: searchWord } : {}),
        // ...(searchWord ? { categories: searchWord } : {}),
        // ...(searchWord ? { priceGte: searchWord } : {}),
        // ...(searchWord ? { priceLte: searchWord } : {}),
      },
    },
  });
  console.log("Categories:", category);
  console.log("Search Word:", searchWord);

  const ads = data ? data.items : [];

  const [totalPrice, setTotalPrice] = useState(0);

  const handelPrice = (price: number) => {
    const AdPrice = price + totalPrice;
    setTotalPrice(AdPrice);
  };

  return (
    <main className="main-content">
      <h2 className="recentAd-title">Annonces récentes</h2>
      <p className="recentAd-text">Total price {totalPrice} €</p>
      <section className="recent-ads">
        {ads.map((ad) => (
          <div key={ad.id}>
            <AdCard
              id={ad.id}
              title={ad.title}
              imgUrl={ad.imgUrl}
              description={ad.description}
              price={ad.price}
              categories={ad.categories}
              onAddToTotalPrice={(price) => {
                handelPrice(price);
              }}
            />
          </div>
        ))}
      </section>
    </main>
  );
};

export { RecentAds };
