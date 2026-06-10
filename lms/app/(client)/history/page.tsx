"use client";

import { getHistory } from "@/lib/axios/api";
import { getErrorMessage } from "@/lib/ClientError";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

import styles from "./history.module.css";
import Link from "next/link";
import { History } from "@/Types/history";
import { Lesson } from "@/Types/Lesson";

const HistoryPage = () => {
  const [history, setHistory] = useState<History[]>([]);

  const getHistoryFun = async () => {
    try {
      const response = await getHistory();
      const data = response?.data?.data;

      if (!Array.isArray(data)) {
        toast.error("History Not Found");
        return;
      }

      if (response.status === 200) {
        setHistory(data);
      }
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  useEffect(() => {
    getHistoryFun();
  }, []);

  const getCourseSlug = (courseId: Lesson["courseId"]) => {
    if (courseId && typeof courseId === "object" && "slug" in courseId) {
      return courseId.slug;
    }

    return null;
  };

  return (
    <div className="wrapper">
      <h1>History Page</h1>

      <div className="card-container">
        {history.length > 0 ? (
          history.map((h) => {
            const slug = getCourseSlug(h.lesson?.courseId);
            return (
              <div key={h._id} className={styles.historyItem}>
                <Link href={slug ? `/courses/${slug}` : "#"}>
                  <img
                    src={h.lesson?.thumbnail || "./course.webp"}
                    className={styles.thumbnail}
                  />
                </Link>

                <div className={styles.content}>
                  <h3 className={styles.lessonTitle}>{h.lesson?.title}</h3>

                  <p className={styles.courseTitle}>{h.lesson?.description}</p>

                  <p className={styles.watchedAt}>
                    Watched on {new Date(h.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            );
          })
        ) : (
          <p>History not found</p>
        )}
      </div>
    </div>
  );
};

export default HistoryPage;
