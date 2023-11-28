import { RecentAds } from "@/components/RecentAds";
import Layout from "@/components/Layout";
import { useRouter } from "next/router";

export default function Home() {
  return (
    <>
      <Layout title="home">
        <RecentAds />
      </Layout>
    </>
  );
}
