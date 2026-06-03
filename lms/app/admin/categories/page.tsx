"use client";

import { GetCategories } from "@/lib/axios/api";
import React, { useEffect, useState } from "react";
import AddCategoryModel from "./AddCategoryModel";
import styles from "./style.module.css";

interface category {
  _id: string;
  name: string;
  slug: string;
}

const CategoriesPage = () => {
  const [isAddingCategory, setIsAddingCategory] = useState<boolean>(false);
  const [categories, setCategories] = useState<category[]>([]);

  const fetchCategoreis = async () => {
    const response = await GetCategories();
    setCategories(response.data.data);
  };

  useEffect(() => {
    fetchCategoreis();
  }, []);
  return (
    <div>
      <div className={styles["category-header"]}>
        <button onClick={() => setIsAddingCategory(true)}>Add Category</button>
      </div>
      <div className={styles["card-container"]}>
        {categories.map((c, i) => {
          return (
            <div className={styles["category-card"]}>
              <h3>{c.name}</h3>
            </div>
          );
        })}
      </div>
      {isAddingCategory && (
        <AddCategoryModel
          setAddingCategory={setIsAddingCategory}
          fetchCategories={fetchCategoreis}
        />
      )}
    </div>
  );
};

export default CategoriesPage;
