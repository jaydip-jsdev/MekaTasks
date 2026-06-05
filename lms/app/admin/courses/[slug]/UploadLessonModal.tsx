import {
  AddCourse,
  EditLesson,
  GetCategories,
  GetCourses,
  GetLessonById,
  UploadLesson,
} from "@/lib/axios/api";
import { getErrorMessage } from "@/lib/ClientError";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

interface UploadLessonModalProps {
  setAddingLesson: React.Dispatch<React.SetStateAction<boolean>>;
  fetchLessons: () => Promise<void>;
  courseId: string;
  editingId: string;
  setEditingId: React.Dispatch<React.SetStateAction<string>>;
}

const UploadLessonModal = ({
  setAddingLesson,
  fetchLessons,
  courseId,
  editingId,
  setEditingId,
}: UploadLessonModalProps) => {
  const [lessonData, setLessonData] = useState({
    title: "",
    description: "",
    slug: "",
    lesson: null as File | null,
    lessonUrl: "",
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

      if (!editingId && !lessonData.lesson) {
        toast.warn("Please select a file");
        return;
      }

      if (lessonData.lesson) {
        formData.append("lesson", lessonData.lesson);
      }
      let response;
      if (editingId) {
        response = await EditLesson(editingId, formData);
      } else {
        response = await UploadLesson(formData);
      }

      if (response.status === 200) {
        await fetchLessons();
        setEditingId("");
        setAddingLesson(false);
      }
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  const handleClose = () => {
    setAddingLesson(false);
    setEditingId("");
  };

  const fetchLessonById = async () => {
    try {
      const response = await GetLessonById(editingId);
      const lesson = response.data.data;
      if (response.status === 200) {
        setLessonData((prev) => ({
          ...prev,
          title: lesson.title,
          description: lesson.description,
          slug: lesson.slug,
          lessonUrl: lesson.lesson,
          courseId: lesson.courseId,
        }));
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (editingId) fetchLessonById();
  }, [editingId]);

  return (
    <div className="modal">
      <form onSubmit={handleSubmit}>
        <button type="button" className="close-btn" onClick={handleClose}>
          ✕
        </button>{" "}
        <div>
          <label htmlFor="title">Lesson Title</label>
          <input
            type="text"
            name="title"
            placeholder="Enter Lesson Title"
            onChange={(e) => handleInputChange(e)}
            value={lessonData.title}
          />
        </div>
        <div>
          <label htmlFor="title">Lesson Description</label>
          <input
            type="text"
            name="description"
            placeholder="Enter Lesson Description"
            onChange={(e) => handleInputChange(e)}
            value={lessonData.description}
          />
        </div>
        <div>
          <label htmlFor="slug">Slug</label>
          <input
            type="text"
            name="slug"
            placeholder="Enter slug for SEO"
            onChange={(e) => handleInputChange(e)}
            value={lessonData.slug}
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
          <button> {editingId ? "Update" : "Publish"}</button>
        </div>
      </form>
    </div>
  );
};

export default UploadLessonModal;
