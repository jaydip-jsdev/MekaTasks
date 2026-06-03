import {
  AddCourse,
  EditCourse,
  GetCategories,
  getCourseDetails,
} from "@/lib/axios/api";
import { useEffect, useState } from "react";

interface categories {
  _id: string;
  name: string;
}

interface AddCourseModalProps {
  setAddingCourse: React.Dispatch<React.SetStateAction<boolean>>;
  fetchCourses: () => Promise<void>;
  editingSlug: string;
  setEditing?: React.Dispatch<React.SetStateAction<string>>;
}

const AddCourseModal = ({
  setAddingCourse,
  fetchCourses,
  editingSlug,
  setEditing,
}: AddCourseModalProps) => {
  const [categories, setCategories] = useState<categories[]>([]);
  const [courseData, setCourseData] = useState({
    title: "",
    description: "",
    slug: "",
    category: "",
  });

  const getCourseData = async () => {
    try {
      const response = await getCourseDetails(editingSlug);
      const course = response.data.data;

      setCourseData((p) => ({
        ...p,
        title: course.title,
        description: course.description,
        slug: course.slug,
        category: course.category,
      }));
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
      const payload = {
        title: courseData.title,
        description: courseData.description,
        slug: courseData.slug,
        category: courseData.category,
      };

      let response;
      if (editingSlug !== "") {
        response = await EditCourse(editingSlug, payload);
      } else {
        response = await AddCourse(payload);
      }

      if (response.status === 200) {
        await fetchCourses();
        setEditing?.("");
        setAddingCourse(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getCategories = async () => {
    const response = await GetCategories();
    setCategories(response.data.data);
  };

  useEffect(() => {
    getCategories();
  }, []);

  const handleClose = () => {
    setEditing?.("");
    setAddingCourse(false);
  };

  return (
    <div className="modal">
      <form onSubmit={handleSubmit}>
        <button type="button" className="close-btn" onClick={handleClose}>
          ✕
        </button>{" "}
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
              return <option value={c.name}>{c.name}</option>;
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
