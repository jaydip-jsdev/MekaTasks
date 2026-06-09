import {
  AddCourse,
  EditLesson,
  GetCategories,
  GetCourses,
  GetLessonById,
  UploadLesson,
} from "@/lib/axios/api";
import { getErrorMessage } from "@/lib/ClientError";
import { useEffect, useRef, useState } from "react";
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
    thumbnail: null as File | null,
    title: "",
    description: "",
    slug: "",
    lesson: null as File | null,
    lessonUrl: "",
    courseId: "",
  });
  const [publishing, setPublishing] = useState<boolean>(false);
  const [preview, setPreview] = useState<string>("");

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
      setPublishing(true);
      const formData = new FormData();

      if (lessonData.thumbnail !== null) {
        formData.append("thumbnail", lessonData.thumbnail);
      }

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
    } finally {
      setPublishing(false);
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
          lessonUrl: lesson.video_url,
          courseId: lesson.courseId,
        }));

        setPreview(lesson.thumbnail);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (editingId) fetchLessonById();
  }, [editingId]);

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      setLessonData((prev) => ({
        ...prev,
        thumbnail: file || null,
      }));

      setPreview(URL.createObjectURL(file));
    }
  };

  const handleLessonChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setLessonData((prev) => ({
      ...prev,
      lesson: file,
      lessonUrl: URL.createObjectURL(file),
    }));
  };

  const lessonInputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="modal">
      <form onSubmit={handleSubmit}>
        <button type="button" className="close-btn" onClick={handleClose}>
          ✕
        </button>{" "}
        <div className="form-upload-lesson">
          <div className="thumbnail-box">
            <label htmlFor="thumbnail">
              {preview ? (
                <img src={preview} className="preview" />
              ) : (
                <div className="upload-placeholder">
                  <span>Upload Thumbnail</span>
                </div>
              )}
            </label>
            <input
              id="thumbnail"
              type="file"
              name="thumbnail"
              accept="image/*"
              placeholder="Upload thumbnail"
              onChange={(e) => handleThumbnailChange(e)}
              hidden
            />
          </div>
          <div className="inputssss">
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
          </div>
          <div className="lesson-side">
            <label>Lesson</label>

            <div
              className="lesson-upload-box"
              onClick={() => lessonInputRef.current?.click()}
            >
              {lessonData.lessonUrl ? (
                <video
                  src={lessonData.lessonUrl}
                  controls
                  className="lesson-prev"
                />
              ) : (
                <div className="upload-placeholder">
                  <span>Upload Lesson</span>
                </div>
              )}
            </div>

            <input
              ref={lessonInputRef}
              type="file"
              accept="video/*"
              hidden
              onChange={handleLessonChange}
            />
          </div>
        </div>
        <div className="modal-action">
          <button>
            {" "}
            {editingId && publishing
              ? "Updating"
              : editingId
                ? "Update"
                : publishing
                  ? "Publishing"
                  : "Publish"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UploadLessonModal;
