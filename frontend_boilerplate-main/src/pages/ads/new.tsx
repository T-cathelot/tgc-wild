import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { CategoriesProps } from "../../components/AdCategories";
import axios from "axios";
import { useRouter } from "next/router";

type FormData = {
  title: string;
  description: string;
  price: number;
  picture: string;
};

const New = () => {
  const [categories, setCategories] = useState<CategoriesProps[]>([]);
  const [error, setError] = useState<"title" | "price">();
  const router = useRouter();

  const getCategories = async () => {
    try {
      const result = await axios.get("http://localhost:5000/categories");
      setCategories(result.data);
    } catch (error) {
      console.error("not good");
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form as HTMLFormElement);
    const data = Object.fromEntries(formData.entries()) as unknown as FormData;
    setError(undefined);
    console.log(data);
    data.price = Number(data.price);

    if ("categoryId" in data) {
    }

    if (data.title.trim().length < 3) {
      setError("title");
    } else if (data.price < 0) {
      setError("price");
    } else {
      const response = await axios.post("http://localhost:5000/ads", data);
      router.push("/");
    }
  };

  return (
    <Layout title="nouvelle offre">
      <main>
        <div className="newAd-container">
          <form className="form-container" onSubmit={handleSubmit}>
            <h1 className="newAd-title">Ajouter une annonce</h1>
            {error === "title" && (
              <p className="newAd-text">
                Le titre doit faire plus de 3 caractère
              </p>
            )}
            {error === "price" && (
              <p className="newAd-text">Le prix dois être positif</p>
            )}
            <label className="form-labels">
              <p className="newAd-text">Title</p>
              <input
                className="text-field"
                placeholder="Title"
                name="title"
                type="text"
              />
            </label>
            <label className="form-labels">
              <p className="newAd-text">Description</p>
              <input
                className="text-field"
                placeholder="Ajouter une description"
                name="description"
                type="text"
              />
            </label>
            <label className="form-labels">
              <p className="newAd-text"> Prix </p>
              <input
                className="text-field"
                name="price"
                placeholder="0,00"
                type="number"
                step="0.01"
                min="0"
              />
            </label>
            <label className="form-labels">
              <p className="newAd-text"> Pictures</p>
              <input className="text-field" name="imgUrl" type="text" />
            </label>
            <label className="form-labels">
              <p className="newAd-text"> Catégories</p>
              <select name="categories" className="select-categories">
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </label>
            <div className="btn-form">
              <button type="submit" className="newAd-btn">
                Ajouter
              </button>
            </div>
          </form>
        </div>
      </main>
    </Layout>
  );
};

export default New;
