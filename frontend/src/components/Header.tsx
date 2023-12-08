import React, { useState } from "react";
import Link from "next/link";
import AdCategories from "./AdCategories";
import { CategoriesProps } from "./AdCategories";
import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";
import { getAllCategories } from "@/graphql/getAllCategories";
import { Tooltip } from "react-tooltip";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";

const SearchTextField = styled(TextField)({
  "& Label": {
    color: "#E0E3E7",
  },
  "& Input": {
    backgroundColor: "grey",
  },
  "& label.Mui-focused": {
    color: "#6DC0D5",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "black",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#E0E3E7",
    },
    "&:hover fieldset": {
      borderColor: "#B2BAC2",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#6DC0D5",
    },
  },
});

const Header = () => {
  const [searchWord, setSearchWord] = useState("");
  const router = useRouter();

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    router.push(`/?searchWord=${searchWord.trim()}`);
  }

  const { data, error, loading } = useQuery<{ items: CategoriesProps[] }>(
    getAllCategories
  );

  const categories = data ? data.items : [];

  return (
    <header className="header">
      <div className="main-menu">
        <Tooltip id="toolTipTest" />
        <h1>
          <Link href="/" className="btn-logo">
            <span className="mobile-short-label">
              <img
                src="/images/achats.png"
                data-tooltip-id="toolTipTest"
                data-tooltip-content="Add your link here."
                data-tooltip-place="bottom"
                className="app-logo"
              />
            </span>
            <span className="desktop-long-label">
              <img
                src="/images/achats.png"
                data-tooltip-id="toolTipTest"
                data-tooltip-content="Add your link here."
                data-tooltip-place="bottom"
                className="app-logo"
              />
            </span>
          </Link>
        </h1>
        <form className="text-field-with-button" onSubmit={onSubmit}>
          {/* <input
            className="text-field main-search-field"
            type="search"
          
          
          /> */}
          <Box
            component="form"
            sx={{
              "& > :not(style)": { m: 1, width: "30vw" },
            }}
            noValidate
            autoComplete="on"
          >
            <SearchTextField
              label="Search field"
              id="filled-search"
              type="search"
              size="small"
              value={searchWord}
              onChange={(e) => setSearchWord(e.target.value)}
            />
          </Box>
          <button className="button button-primary" type="submit">
            {/* ... le reste de votre bouton */} Find
          </button>
        </form>
        <Link href="/ads/new" className="btn-knitBall link-button">
          <span className="mobile-short-label">
            {" "}
            <img
              src="/images/pelote-de-laine.png"
              data-tooltip-id="toolTipTest"
              data-tooltip-content="Add your link here."
              data-tooltip-place="bottom"
              className="app-logo"
            />
          </span>
          <span className="desktop-long-label">
            {" "}
            {/* <img
              data-tooltip-id="toolTipTest"
              data-tooltip-content="Add your link here."
              data-tooltip-place="bottom"
              className="app-logo"
            /> */}
          </span>
        </Link>
      </div>
      <nav className="categories-navigation">
        {loading === true && <p>Chargement</p>}
        {categories.map((category, index) => (
          <div key={category.id} className="navigation-link-dv">
            <AdCategories name={category.name} id={category.id} />
            {index < categories.length - 1 ? "•" : ""}
          </div>
        ))}
      </nav>
    </header>
  );
};

export default Header;
