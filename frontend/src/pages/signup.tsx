import Layout from "@/components/Layout";
import { signup } from "@/graphql/signup";
import { useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import React, { FormEvent, useState } from "react";
import { toast } from "react-toastify";

const Signup = (): React.ReactNode => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const [doSignup] = useMutation(signup);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { data } = await doSignup({
      variables: {
        data: {
          email,
          password,
        },
      },
    });

    if (data.item) {
      console.log("data part", data.item);
      router.replace("/signin");
      toast.success("Vous ête enregistré! ✌️");
    }
  };

  return (
    <Layout title="signup">
      <div>
        <p>l&apos;enregistrement</p>
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
          <button type="submit">M&apos;enregistrer</button>
        </form>
      </div>
    </Layout>
  );
};

export default Signup;
