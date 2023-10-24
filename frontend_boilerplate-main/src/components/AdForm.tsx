import { AdType } from "@/components/AdCard";
import { CategoriesProps } from "@/components/AdCategories";
import Layout from "@/components/Layout";
import axios from "axios";
import { useRouter } from "next/router";
import { FormEvent, useEffect, useState } from "react";
import { toast } from "react-hot-toast";

type AdFormData = {
  title: string;
  description: string;
  imgUrl: string;
  price: number;
  category: { id: number } | null;
};

type AdFormProps = {
  ad?: AdType;
};

export default function AdForm(props: AdFormProps) {
  const [categories, setCategories] = useState<CategoriesProps[]>([]);
  const [error, setError] = useState<"title" | "price">();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [price, setPrice] = useState(0);
  const [categoryId, setCategoryId] = useState<null | number>(null);

  async function fetchCategories() {
    const result = await axios.get<CategoriesProps[]>(
      `http://localhost:5000/categories`
    );
    setCategories(result.data);
  }

  useEffect(() => {
    // mounting
    fetchCategories();
  }, []);

  const router = useRouter();

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(undefined);
    const data: AdFormData = {
      title,
      description,
      imgUrl,
      price,
      category: categoryId ? { id: Number(categoryId) } : null,
    };

    if (data.title.trim().length < 3) {
      toast.error("Le titre doit faire plus de 3 caractères!");
    } else if (data.price < 0) {
      toast.error("Le prix ne peut être inférieur à 0");
    } else {
      if (!props.ad) {
        const result = await axios.post(`http://localhost:5000/ads`, data);
        if ("id" in result.data) {
          router.replace(`/ads/${result.data.id}`);
          toast.success("Votre annonce a bien été ajoutée!");
        }
      } else {
        const result = await axios.patch(
          `http://localhost:5000/ads/${props.ad.id}`,
          data
        );
        toast.success("Votre annonce a été modifiée!");
        if (result.status >= 200 && result.status < 300) {
          router.replace(`/ads/${props.ad.id}`);
        }
      }
    }
  }

  useEffect(() => {
    if (props.ad) {
      setTitle(props.ad.title);
      setDescription(props.ad.description);
      setPrice(props.ad.price);
      setImgUrl(props.ad.imgUrl);
      setCategoryId(props.ad.category ? props.ad.category.id : null);
    }
  }, [props.ad]);

  return (
    <Layout title="Nouvelle offre">
      <main className="main-content">
        <div className="edit-container">
          <h2 className="editAd-title">
            {props.ad ? "Modifier l'offre" : "Nouvelle offre"}
          </h2>
          {error === "price" && <p>Le prix doit être positif</p>}
          {error === "title" && (
            <p>Le titre est requis et doit faire plus de 3 caractères</p>
          )}
          <form className="form-container" onSubmit={onSubmit}>
            <input
              className="text-field"
              type="text"
              name="title"
              placeholder="Titre de l'annonce"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <br />
            <br />
            <input
              className="text-field"
              type="text"
              name="description"
              placeholder="Description de l'annonce"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <br />
            <br />
            <input
              className="text-field"
              type="text"
              name="imgUrl"
              placeholder="Lien de l'image"
              value={imgUrl}
              onChange={(e) => setImgUrl(e.target.value)}
            />
            <br />
            <br />
            <input
              className="text-field"
              type="number"
              name="price"
              placeholder="0,00€"
              value={price}
              onChange={(e) => setPrice(parseInt(e.target.value))}
            />
            <br />
            <br />
            <select
              className="edit-categories"
              name="categoryId"
              value={categoryId + ""}
              onChange={(e) => setCategoryId(Number(e.target.value))}
            >
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
            <br />
            <br />
            <div className="btn-form">
              <button className="edit-button" type="submit">
                {props.ad ? "Modifier" : "Créer"}
              </button>
            </div>
          </form>
        </div>
      </main>
    </Layout>
  );
}
