import {
  AddCourse,
  GetCategories,
  GetCourses,
  UploadLesson,
} from "@/lib/axios/api";
import { useEffect, useState } from "react";

interface categories {
  _id: string;
  name: string;
}

interface UploadLessonModalProps {
  setAddingLesson: React.Dispatch<React.SetStateAction<boolean>>;
  fetchLessons: () => Promise<void>;
  courseId: string;
}

const UploadLessonModal = ({
  setAddingLesson,
  fetchLessons,
  courseId,
}: UploadLessonModalProps) => {
  const [lessonData, setLessonData] = useState({
    title: "",
    description: "",
    slug: "",
    lesson: null as File | null,
    courseId: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;

    setLessonData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      formData.append("title", lessonData.title);
      formData.append("description", lessonData.description);
      formData.append("slug", lessonData.slug);
      formData.append("courseId", courseId);
      if (!lessonData.lesson) {
        alert("Please select a file");
        return;
      }

      formData.append("lesson", lessonData.lesson);

      const response = await UploadLesson(formData);
      if (response.status === 200) {
        await fetchLessons();
        setAddingLesson(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="modal">
      <form onSubmit={handleSubmit}>
        <button
          type="button"
          className="close-btn"
          onClick={() => setAddingLesson(false)}
        >
          ✕
        </button>{" "}
        <div>
          <label htmlFor="title">Lesson Title</label>
          <input
            type="text"
            name="title"
            placeholder="Enter Lesson Title"
            onChange={(e) => handleInputChange(e)}
          />
        </div>
        <div>
          <label htmlFor="title">Lesson Description</label>
          <input
            type="text"
            name="description"
            placeholder="Enter Lesson Description"
            onChange={(e) => handleInputChange(e)}
          />
        </div>
        <div>
          <label htmlFor="slug">Slug</label>
          <input
            type="text"
            name="slug"
            placeholder="Enter slug for SEO"
            onChange={(e) => handleInputChange(e)}
          />
        </div>
        <div>
          <label htmlFor="Lesson">Lesson</label>
          <input
            type="file"
            name="lesson"
            onChange={(e) => {
              const file = e.target.files?.[0];

              setLessonData((prev) => ({
                ...prev,
                lesson: file || null,
              }));
            }}
          />
        </div>
        <div className="modal-action">
          <button>Publish</button>
        </div>
      </form>
    </div>
  );
};

export default UploadLessonModal;
