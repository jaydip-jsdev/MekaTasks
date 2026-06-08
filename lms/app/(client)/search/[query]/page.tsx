"use client";

import { useEffect, useState } from "react";
import { GetCourses } from "@/lib/axios/api";
import Card from "@/app/components/card/Card";
import { Course } from "@/Types/courses";
import { useRouter } from "next/navigation";
import styles from "./searchRes.module.css";
import Link from "next/link";

export default function SearchResults({
  params,
}: {
  params: Promise<{ query: string }>;
}) {
  const [courses, setCourses] = useState<Course[]>([]);
  const [query, setQuery] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [inputValue, setInputValue] = useState<string>("");

  const router = useRouter();

  const loadCourses = async () => {
    const { query } = await params;

    setSearchQuery(query);
    setInputValue(query);
    setQuery(query);

    const response = await GetCourses(undefined, query);
    setCourses(response.data.data);
  };

  useEffect(() => {
    loadCourses();
  }, [params]);

  const handleSearch = () => {
    if (!inputValue.trim()) return;

    router.push(`/search/${encodeURIComponent(inputValue)}`);
  };

  return (
    <div className="wrapper">
      <div className={styles.topBar}>
        <Link href="/" className={styles.backBtn}>
          ← Back to Home
        </Link>
      </div>
      <div className={styles["search-area"]}>
        <input
          type="text"
          placeholder="Search courses..."
          value={inputValue}
          className={styles.searchbar}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearch();
            }
          }}
        />
        <button onClick={handleSearch} className={styles["search-btn"]}>
          Search
        </button>
      </div>
      <h1>Search Results for "{searchQuery}"</h1>

      <div className="card-container">
        {courses.map((c) => (
          <Card
            key={c._id}
            category={c.category}
            description={c.description}
            image={c.thumbnail || "/course.webp"}
            slug={c.slug}
            title={c.title}
            isEnrolled={c.isEnrolled}
          />
        ))}
      </div>
    </div>
  );
}
