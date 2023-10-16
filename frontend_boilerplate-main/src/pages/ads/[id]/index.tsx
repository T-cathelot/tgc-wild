import { AdType } from "../../../components/AdCard";
import Layout from "../../../components/Layout";

import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Ad() {
  const [ad, setAd] = useState<AdType>();

  const router = useRouter();
  const adId = router.query.id as string;

  async function fetchAd() {
    const result = await axios.get<AdType>(`http://localhost:5000/ads/${adId}`);
    setAd(result.data);
  }

  useEffect(() => {
    // mounting
    if (adId !== undefined) {
      fetchAd();
    }
  }, [adId]);

  return (
    <Layout title="Ad">
      <main className="main-content">
        <section className="recent-adById">
          {ad ? (
            <div className="adById-container">
              <h2 className="adById-title">{ad.title}</h2>
              <img src={ad.imgUrl} className="adById-image" />
              <p className="adById-description">{ad.description}</p>
              <p className="adById-price">{ad.price} €</p>
              <div className="adById-link-container">
                <Link href={`/ads/${ad.id}/edit`} className="adById-link">
                  {" "}
                  Modifier l&apos;annonce
                </Link>
              </div>
            </div>
          ) : adId ? (
            "Chargement/erreur"
          ) : (
            "Il manque l'id dans l'URL"
          )}
        </section>
      </main>
    </Layout>
  );
}
