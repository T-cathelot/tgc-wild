/* eslint-disable react/no-unescaped-entities */
import { AdType } from "@/components/AdCard";
import AdForm from "@/components/AdForm";
import Layout from "@/components/Layout";
import { getAd } from "@/graphql/getAd";
import { useQuery } from "@apollo/client";

import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function EditAd() {
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
    <Layout title="Nouvelle offre">
      <main className="main-content">{ad && <AdForm ad={ad} />}</main>
    </Layout>
  );
}