import { AdType } from "../../../components/AdCard";
import Layout from "../../../components/Layout";
import { useRouter } from "next/router";
import Link from "next/link";
import { useQuery } from "@apollo/client";
import { getAd } from "../../../graphql/getAd";

export default function Ad() {
  const router = useRouter();
  const adId = router.query.id;

  const { data, error, loading } = useQuery<{ item: AdType }>(getAd, {
    variables: {
      id: adId,
    },
    skip: adId === undefined,
  });
  const ad = data ? data.item : null;

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
