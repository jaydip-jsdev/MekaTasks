"use client";

import { GetCategories } from "@/lib/axios/api";
import { getErrorMessage } from "@/lib/ClientError";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Styles from "./style.module.css";
import Link from "next/link";
import { Category } from "@/Types/category";

const CategoriesPage = () => {
  const [cats, setCats] = useState<Category[]>([]);

  const fetchCategories = async () => {
    try {
      const response = await GetCategories();
      const data = response?.data?.data;
      
      if (response.status === 200) {
        setCats(data);
      }
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div>
      <div className={Styles.cardContainer}>
        {cats.length > 0 ? (
          cats.map((c, i) => {
            return (
              <Link
                key={c._id}
                href={"categories/" + c.slug}
                className={Styles.categoryCard}
              >
                <div key={c._id}>
                  <h3>{c.name}</h3>
                </div>
              </Link>
            );
          })
        ) : (
          <p>No Categories found</p>
        )}
      </div>
    </div>
  );
};

export default CategoriesPage;
