import { AdType } from "@/components/AdCard";
import { CategoriesProps } from "@/components/AdCategories";
import Layout from "@/components/Layout";
import { useRouter } from "next/router";
import { FormEvent, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { createAds } from "@/graphql/createAds";
import { useMutation, useQuery } from "@apollo/client";
import { getAllAds } from "@/graphql/getAllAds";
import { getAllCategories } from "@/graphql/getAllCategories";
import { getAd } from "@/graphql/getAd";
import { updateAd } from "@/graphql/updateAds";

type AdFormData = {
  title: string;
  description: string;
  imgUrl: string;
  price: number;
  categories: { id: number } | null;
};

type AdFormProps = {
  ad?: AdType;
};

export default function AdForm(props: AdFormProps) {
  const [error, setError] = useState<"title" | "price">();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [price, setPrice] = useState(0);
  const [categoryId, setCategoryId] = useState<null | number>(null);

  const {
    data: categoriesData,
    error: categoriesError,
    loading: categoriesLoading,
  } = useQuery<{ items: CategoriesProps[] }>(getAllCategories, {});
  const categories = categoriesData ? categoriesData.items : [];
  const router = useRouter();

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(undefined);
    const data: AdFormData = {
      title,
      description,
      imgUrl,
      price,
      categories: categoryId ? { id: Number(categoryId) } : null,
    };

    if (data.title.trim().length < 3) {
      toast.error("Le titre doit faire plus de 3 caractères!");
    } else if (data.price < 0) {
      toast.error("Le prix ne peut être inférieur à 0");
    } else {
      if (!props.ad) {
        const result = await doCreate({
          variables: {
            data: {
              title: title,
              description: description,
              imgUrl: imgUrl,
              price: price,
              categories: categoryId ? { id: categoryId } : null,
            },
          },
        });
        if ("id" in result.data?.item) {
          router.replace(`/ads/${result.data.item.id}`);
          toast.success("Votre annonce a été enregistré!");
        }
      } else {
        const result = doUpdate({
          variables: {
            id: props.ad?.id,
            data: {
              title: title,
              description: description,
              imgUrl: imgUrl,
              price: price,
              categories: categoryId ? { id: categoryId } : null,
            },
          },
        });
        toast.success("Votre annonce a été modifiée!");

        router.replace(`/ads/${props.ad.id}`);
      }
    }
  }
  const [doCreate, { loading: createLoading }] = useMutation(createAds, {
    refetchQueries: [{ query: getAllAds }],
  });

  const [doUpdate, { loading: updateLoading }] = useMutation(updateAd, {
    refetchQueries: [getAd, getAllAds],
  });

  useEffect(() => {
    if (props.ad) {
      setTitle(props.ad.title);
      setDescription(props.ad.description);
      setPrice(props.ad.price);
      setImgUrl(props.ad.imgUrl);
      setCategoryId(
        props.ad.categories ? props.ad.categories.id : categories[0]?.id
      );
    } else if (categories.length > 0) {
      setCategoryId(categories[0].id);
    }
  }, [props.ad, categories]);

  return (
    <Layout title="Nouvelle offre">
      <div className="edit-container">
        <div className="edit-secondContainer">
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
      </div>
    </Layout>
  );
}
