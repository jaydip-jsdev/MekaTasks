import {
  AddCourse,
  EditCourse,
  GetCategories,
  getCourseDetails,
} from "@/lib/axios/api";
import { getErrorMessage } from "@/lib/ClientError";
import { Category } from "@/Types/category";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

interface AddCourseModalProps {
  setAddingCourse: React.Dispatch<React.SetStateAction<boolean>>;
  fetchCourses: () => Promise<void>;
  editingSlug: string;
  setEditing: React.Dispatch<React.SetStateAction<string>>;
}

const AddCourseModal = ({
  setAddingCourse,
  fetchCourses,
  editingSlug,
  setEditing,
}: AddCourseModalProps) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [courseData, setCourseData] = useState({
    thumbnail: null as File | null,
    title: "",
    description: "",
    slug: "",
    category: "",
  });
  const [preview, setPreview] = useState("");

  const getCourseData = async () => {
    try {
      const response = await getCourseDetails(editingSlug);
      const course = response?.data?.data;

      if (!course) {
        toast.error("Courses not found");
        return;
      }
      setCourseData((p) => ({
        ...p,
        title: course.title,
        description: course.description,
        slug: course.slug,
        category: course.category,
      }));

      setPreview(course.thumbnail);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (editingSlug) getCourseData();
  }, [editingSlug]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;

    setCourseData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      if (courseData.thumbnail !== null) {
        formData.append("thumbnail", courseData.thumbnail);
      }

      formData.append("title", courseData.title);
      formData.append("description", courseData.description);
      formData.append("slug", courseData.slug);
      formData.append("category", courseData.category);

      let response;
      if (editingSlug !== "") {
        response = await EditCourse(editingSlug, formData);
      } else {
        response = await AddCourse(formData);
      }

      if (response.status === 200) {
        await fetchCourses();
        setEditing("");
        setAddingCourse(false);
      }
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  const getCategories = async () => {
    try {
      const response = await GetCategories();
      const cats = response?.data?.data;
      if (!cats) {
        toast.error("Categories not found");
        return;
      }
      setCategories(cats);
    } catch (error) {
      console.log(error);
      toast.error(getErrorMessage(error));
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  const handleClose = () => {
    setEditing?.("");
    setAddingCourse(false);
  };

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      setCourseData((prev) => ({
        ...prev,
        thumbnail: file || null,
      }));

      setPreview(URL.createObjectURL(file));
    }
  };

  return (
    <div className="modal">
      <form onSubmit={handleSubmit}>
        <button type="button" className="close-btn" onClick={handleClose}>
          ✕
        </button>{" "}
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
        <div>
          <label htmlFor="title">Course Title</label>
          <input
            type="text"
            name="title"
            placeholder="Enter Course Title"
            value={courseData.title}
            onChange={(e) => handleInputChange(e)}
          />
        </div>
        <div>
          <label htmlFor="title">Course Description</label>
          <input
            type="text"
            name="description"
            value={courseData.description}
            placeholder="Enter Course Description"
            onChange={(e) => handleInputChange(e)}
          />
        </div>
        <div>
          <label htmlFor="slug">Slug</label>
          <input
            type="text"
            name="slug"
            value={courseData.slug}
            placeholder="Enter slug for SEO"
            onChange={(e) => handleInputChange(e)}
          />
        </div>
        <div>
          <label htmlFor="category">Category</label>

          <select
            name="category"
            id="categories"
            value={courseData.category}
            onChange={(e) => handleInputChange(e)}
          >
            <option value="">Select category</option>
            {categories.map((c) => {
              return (
                <option key={c._id} value={c._id}>
                  {c.name}
                </option>
              );
            })}
          </select>
        </div>
        <div className="modal-action">
          <button>{editingSlug ? "Update" : "Publish"}</button>
        </div>
      </form>
    </div>
  );
};

export default AddCourseModal;
