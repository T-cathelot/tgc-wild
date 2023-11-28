import axios from "axios";
import Link from "next/link";
import React from "react";
import { CategoriesProps } from "./AdCategories";
import { useMutation, useQuery } from "@apollo/client";
import { deleteAds } from "../graphql/deleteAds";
import { getAllAds } from "@/graphql/getAllAds";

type AdType = {
  id: number;
  title: string;
  description: string;
  imgUrl: string;
  price: number;
  categories: CategoriesProps | null;
};

type AdCardProps = AdType & {
  // onDelete: () => void;
  onAddToTotalPrice: (price: number) => void;
};

const AdCard = ({
  id,
  title,
  imgUrl,
  price,
  description,
  // onDelete,
  onAddToTotalPrice,
}: AdCardProps) => {
  const [doDelete, { data, error, loading: deleteLoading }] = useMutation(
    deleteAds,
    {
      refetchQueries: [getAllAds],
    }
  );

  const deleteAd = async () => {
    doDelete({
      variables: { deleteAdsId: id },
    });

    // {
    //   onDelete();
    // }
  };

  const addPrice = () => {
    {
      onAddToTotalPrice(price);
    }
  };

  return (
    <div className="ad-card-container">
      {/* <a className="ad-card-link" href={link}></a> */}
      <div className="ad-card-title">{title}</div>
      <div className="ad-card-image-div">
        <img className="ad-card-image" src={imgUrl} />
      </div>
      <p className="ad-card-description">Description :</p>
      <div className="ad-card-text">
        <div className="ad-card-description">{description}</div>
        <div className="ad-card-price">{price}€</div>
      </div>
      <div className="ad-card-link-container">
        <Link href={`ads/${id}/edit`} className="ad-card-link">
          Modifier l&apos;annonce
        </Link>
      </div>
      <div className="btn-container">
        <button className="btn-add" onClick={addPrice}>
          ajouter
        </button>
        <button className="btn-delete" onClick={deleteAd}>
          supprimer
        </button>
      </div>
    </div>
  );
};

export default AdCard;
export type { AdCardProps, AdType };
