import React, { useEffect, useState } from "react";
import Layout from "../../../components/Layout";
import { CategoriesProps } from "../../../components/AdCategories";
import axios from "axios";
import { useRouter } from "next/router";
import { AdType } from "@/components/AdCard";
import toast from "react-hot-toast";

type FormData = {
  id: number;
  title: string;
  description: string;
  price: number;
  picture: string;
};

const EditAd = () => {
  const [categories, setCategories] = useState<CategoriesProps[]>([]);
  const [adEdit, setAdEdit] = useState<AdType>({
    id: 0,
    title: "",
    description: "",
    imgUrl: "",
    price: 0,
    categories: 0,
  });
  console.log(adEdit, "adEdit");
  const router = useRouter();
  const adId = router.query.id as string;

  const getCategories = async () => {
    try {
      const result = await axios.get("http://localhost:5000/categories");
      setCategories(result.data);
    } catch (error) {
      console.error("not good");
    }
  };

  const getAdData = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/ads/${adId}`);
      setAdEdit(response.data);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    getCategories();
    getAdData();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form as HTMLFormElement);
    const data = Object.fromEntries(formData.entries()) as unknown as FormData;
    console.log(data);
    data.price = Number(data.price);

    if (data.title.trim().length < 3) {
      toast.error("Le titre doit faire plus de 3 caractères!");
    } else if (data.price < 0 || data.price === 0) {
      toast.error("Le prix ne peut pas être à 0 euros.");
    } else {
      const response = await axios.patch(
        `http://localhost:5000/ads/${adId}`,
        data
      );
      router.push("/");
      toast.success("Votre annonce est modifiée!");
    }
  };

  return (
    <Layout title="nouvelle offre">
      <main>
        <div className="edit-container">
          <form className="form-container" onSubmit={handleSubmit}>
            <h1 className="editAd-title">Modifier une annonce</h1>
            {/* {error === "title" && (
              <p className="editAd-text">
                Le titre doit faire plus de 3 caractère
              </p>
            )}
            {error === "price" && (
              <p className="editAd-text">Le prix dois être positif</p>
            )} */}
            <label className="form-labels">
              <p className="editAd-text">Title</p>
              <input
                className="text-field"
                placeholder="Title"
                name="title"
                type="text"
                value={adEdit.title}
                onChange={(e) =>
                  setAdEdit({ ...adEdit, title: e.target.value })
                }
              />
            </label>
            <label className="form-labels">
              <p className="editAd-text">Description</p>
              <input
                className="text-field"
                placeholder="Ajouter une description"
                name="description"
                type="text"
                value={adEdit.description}
                onChange={(e) =>
                  setAdEdit({ ...adEdit, description: e.target.value })
                }
              />
            </label>
            <label className="form-labels">
              <p className="editAd-text"> Prix </p>
              <input
                className="text-field"
                name="price"
                placeholder="0,00"
                type="number"
                step="0.01"
                min="0"
                value={adEdit.price}
                onChange={(e) => {
                  const newPrice = parseInt(e.target.value);
                  setAdEdit({ ...adEdit, price: newPrice });
                }}
              />
            </label>
            <label className="form-labels">
              <p className="editAd-text"> Pictures</p>
              <input
                className="text-field"
                name="imgUrl"
                type="text"
                value={adEdit.imgUrl}
                onChange={(e) =>
                  setAdEdit({ ...adEdit, imgUrl: e.target.value })
                }
              />
            </label>
            <label className="form-labels">
              <p className="editAd-text"> Catégories</p>
              <select name="categories" className="select-categories">
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </label>
            <div className="btn-form">
              <button type="submit" className="edit-button">
                Modifier
              </button>
            </div>
          </form>
        </div>
      </main>
    </Layout>
  );
};

export default EditAd;
