import React from "react";
import AdCard, { AdType } from "./AdCard";
import { useState } from "react";
import { useQuery } from "@apollo/client";
import { getAllAds } from "@/graphql/getAllAds";
import { useRouter } from "next/router";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";

const CustomButton = styled(Button)({
  backgroundColor: "grey",
  width: "30%",
  padding: "5px",
  boxShadow: "none",
  "&:hover": {
    backgroundColor: "#ad7a99",
  },
}) as typeof Button;

type RecentAdsProps = {
  category?: number;
  searchWord?: string | number;
};

const RecentAds = (props: RecentAdsProps) => {
  const router = useRouter();
  const [totalPrice, setTotalPrice] = useState(0);
  const [pageSize, setPageSize] = useState(6);
  const [page, setPage] = useState(0);

  const handelPrice = (price: number) => {
    const AdPrice = price + totalPrice;
    setTotalPrice(AdPrice);
  };

  const { category, searchWord } = router.query;

  const { data } = useQuery<{ items: AdType[]; count: number }>(getAllAds, {
    variables: {
      where: {
        ...(searchWord ? { searchTitle: searchWord } : {}),
        // ...(searchWord ? { categories: searchWord } : {}),
        // ...(searchWord ? { priceGte: searchWord } : {}),
        // ...(searchWord ? { priceLte: searchWord } : {}),
      },
      skip: page * pageSize,
      take: pageSize,
    },
  });
  const ads = data ? data.items : [];
  const count = data ? data.count : 0;
  const pagesCount = Math.ceil(count / pageSize);
  return (
    <main className="main-content">
      <div className="recentAd-title-dv">
        {" "}
        <h2 className="recentAd-title">Annonces récentes</h2>
        <Stack spacing={2} direction="row">
          <CustomButton
            variant="contained"
            disabled={page === 0}
            onClick={() => {
              setPage(Math.max(page - 1, 0));
            }}
          >
            <img
              src="/images/previousArrow.png"
              alt="img"
              className="previousNextImg"
            />
          </CustomButton>
          <p>{page}</p>
          <CustomButton
            variant="contained"
            disabled={page === pagesCount - 1}
            onClick={() => {
              setPage(Math.min(page + 1, pagesCount));
            }}
          >
            <img
              src="/images/nextArrow.png"
              alt="img"
              className="previousNextImg"
            />
          </CustomButton>
        </Stack>
      </div>
      <div className="seconde-container">
        <div className="dv-userChoices">
          <p className="recentAd-text">Total price {totalPrice} €</p>
          <br />
          <p>Nombre d&apos;annonce par page :</p>
          <br />
          <Stack spacing={1} direction="row">
            <CustomButton
              variant="contained"
              disabled={pageSize === 5}
              onClick={() => setPageSize(5)}
            >
              5
            </CustomButton>
            <CustomButton
              variant="contained"
              disabled={pageSize === 10}
              onClick={() => setPageSize(10)}
            >
              10
            </CustomButton>
            <CustomButton
              variant="contained"
              disabled={pageSize === 20}
              onClick={() => setPageSize(20)}
            >
              20
            </CustomButton>
          </Stack>
          <br />
          <p>
            Page actuelle : {page} / Nombre d&apos;élément : {count}
          </p>
          <br />
          <br />
        </div>

        <section className="recent-ads">
          {ads.map((ad) => (
            <div key={ad.id}>
              <AdCard
                id={ad.id}
                title={ad.title}
                imgUrl={ad.imgUrl}
                description={ad.description}
                price={ad.price}
                categories={ad.categories}
                onAddToTotalPrice={(price) => {
                  handelPrice(price);
                }}
              />
            </div>
          ))}
        </section>
      </div>
    </main>
  );
};

export { RecentAds };
