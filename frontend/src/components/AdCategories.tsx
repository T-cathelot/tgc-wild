import Link from "next/link";
import React from "react";

type CategoriesProps = {
  id: number;
  name: string;
};

const AdCategories = ({ id, name }: CategoriesProps): React.ReactNode => {
  return (
    <Link href={`/categories/${id}`} className="category-navigation-link">
      {name}
    </Link>
  );
};

export default AdCategories;
export type { CategoriesProps };
