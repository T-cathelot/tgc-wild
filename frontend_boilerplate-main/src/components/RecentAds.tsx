import React, { useEffect } from "react";
import AdCard, { AdCardProps } from "./AdCard";
import { useState } from "react";
import axios from "axios";

type RecentAdsProps = {
  categories?: number;
};

const RecentAds = ({ categories }: RecentAdsProps): React.ReactNode => {
  const [totalPrice, setTotalPrice] = useState(0);
  const [ads, setAds] = useState([] as AdCardProps[]);

  const getAds = async () => {
    try {
      const result = await axios.get("http://localhost:5000/ads");
      setAds(result.data);
    } catch (error) {
      console.error("not good");
    }
  };

  useEffect(() => {
    getAds();
  }, []);

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
              category={ad.category}
              onDelete={() => {
                getAds();
                setTotalPrice(totalPrice - ad.price);
              }}
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
