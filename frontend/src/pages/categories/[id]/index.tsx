import Layout from "../../../components/Layout";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { AdCardProps, AdType } from "../../../components/AdCard";
import AdCard from "../../../components/AdCard";

export default function Category() {
  const router = useRouter();
  const id = Number(router.query.id);
  const [adByCategory, setAdByCategory] = useState([] as AdCardProps[]);
  console.log(adByCategory);

  const [totalPrice, setTotalPrice] = useState(0);
  const [category, setCategory] = useState();

  const filterByCategory = async () => {
    if (id) {
      const result = await axios.get(`http://localhost:5000/categories/${id}`);
      setCategory(result.data);
    }
  };
  useEffect(() => {
    if (id !== undefined) {
      filterByCategory();
    }
  }, [id]);

  const getAds = async () => {
    try {
      const result = await axios.get("http://localhost:5000/ads");
      setAdByCategory(result.data);
      console.log(result.data, "yoooooo");
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
    <Layout title="Categrory">
      <main className="main-content">
        <section className="recent-ads">
          {adByCategory.map((ad) => (
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
    </Layout>
  );
}
