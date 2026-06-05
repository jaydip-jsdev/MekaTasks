"use client";

import Card from "@/app/components/card/Card";
import { getHistory } from "@/lib/axios/api";
import { getErrorMessage } from "@/lib/ClientError";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

import styles from "./history.module.css";
import { Lesson } from "@/Types/Lesson";
import Link from "next/link";

interface HistoryT {
  _id: string;
  lesson: Lesson;
  createdAt: string;
}

const HistoryPage = () => {
  const [history, setHistory] = useState<HistoryT[]>([]);

  const getHistoryFun = async () => {
    try {
      const response = await getHistory();
      const data = response.data.data;

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

  return (
    <div className="wrapper">
      <h1>History Page</h1>

      <div className="card-container">
        {history.length > 0 ? (
          history.map((h) => (
            <div key={h._id} className={styles.historyItem}>
              <Link
                href={
                  "/courses/" + (h.lesson.courseId as { slug: string }).slug
                }
              >
                <img src={"./course.webp"} className={styles.thumbnail} />
              </Link>

              <div className={styles.content}>
                <h3 className={styles.lessonTitle}>{h.lesson.title}</h3>

                <p className={styles.courseTitle}>{h.lesson.description}</p>

                <p className={styles.watchedAt}>
                  Watched on {new Date(h.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p>History not found</p>
        )}
      </div>
    </div>
  );
};

export default HistoryPage;
