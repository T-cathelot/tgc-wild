import React from "react";
import Image from "next/image";
import Layout from "@/components/Layout";
import { useQuery } from "@apollo/client";
import { getMe } from "@/graphql/getMe";
import { useRouter } from "next/router";
import { UserType } from "@/types";

const Me = (): React.ReactNode => {
  const { data } = useQuery<{ item: UserType }>(getMe);
  const me = data?.item;
  return (
    <Layout title="Mon profil">
      <p>Mon adresse mail est {me?.email}</p>
    </Layout>
  );
};

export default Me;
