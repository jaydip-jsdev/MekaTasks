"use client";

import { DeleteCategories, GetCategories } from "@/lib/axios/api";
import React, { useEffect, useState } from "react";
import AddCategoryModel from "./AddCategoryModel";
import styles from "./style.module.css";
import { Trash2 } from "lucide-react";
import { Category } from "@/Types/category";

const CategoriesPage = () => {
  const [isAddingCategory, setIsAddingCategory] = useState<boolean>(false);
  const [categories, setCategories] = useState<Category[]>([]);

  const fetchCategoreis = async () => {
    const response = await GetCategories();
    setCategories(response.data.data);
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await DeleteCategories(id);
      if (response.status === 200) {
        fetchCategoreis();
      }
    } catch (error) {
      console.log(error);
    }
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
        {categories.length < 1 ? (
          <div className={styles.notFound}>
            <p>Categories not found</p>
          </div>
        ) : (
          categories.map((c) => (
            <div key={c._id} className={styles["category-card"]}>
              <button
                onClick={() => handleDelete(c._id)}
                className={styles.deleteBtn}
              >
                <Trash2 color="red" />
              </button>

              <h3>{c.name}</h3>
            </div>
          ))
        )}
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
