import Layout from "@/components/Layout";
import { getMe } from "@/graphql/getMe";
import { signin } from "@/graphql/signin";
import { useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import React, { FormEvent, useState } from "react";
import { toast } from "react-toastify";

const Signin = (): React.ReactNode => {
  const [email, setEmail] = useState("coco@gmail.com");
  const [password, setPassword] = useState("cocorico");

  const router = useRouter();

  const [doSignin] = useMutation(signin, { refetchQueries: [getMe] });

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { data } = await doSignin({
      variables: {
        email,
        password,
      },
    });

    if (data.item) {
      console.log("data part", data.item);
      router.replace("/");
      toast.success(`Bienvenu ${data.item.email} ✌️`);
    } else {
      toast.error("Erreur de connexion 🚨");
    }
  };

  return (
    <Layout title="signin">
      <div>
        <p>l&apos;authentification</p>
        <br />
        <form onSubmit={onSubmit}>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email"
          />
          <label>password</label>
          <input
            type="passWord"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="password"
          />
          <button type="submit">connexion</button>
        </form>
      </div>
    </Layout>
  );
};

export default Signin;
