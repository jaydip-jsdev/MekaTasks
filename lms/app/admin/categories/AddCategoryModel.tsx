import { addCategory } from "@/lib/axios/api";
import { getErrorMessage } from "@/lib/errorHandling/ClientError";
import { useState } from "react";
import { toast } from "react-toastify";

interface AddCategoryModalProps {
  setAddingCategory: React.Dispatch<React.SetStateAction<boolean>>;
  fetchCategories: () => Promise<void>;
}

const AddCategoryModel = ({
  setAddingCategory,
  fetchCategories,
}: AddCategoryModalProps) => {
  const [name, setName] = useState<string>("");
  const [slug, setSlug] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const payload = {
        name,
        slug,
      };

      const response = await addCategory(payload);

      if (response.status === 200) {
        setAddingCategory(false);
        fetchCategories();
      }
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  return (
    <div className="modal">
      <form onSubmit={handleSubmit}>
        <button
          type="button"
          className="close-btn"
          onClick={() => setAddingCategory(false)}
        >
          ✕
        </button>{" "}
        <div>
          <label htmlFor="category">Category</label>
          <input
            type="text"
            name="category"
            placeholder="Enter category name"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="category">Slug</label>
          <input
            type="text"
            name="slug"
            placeholder="Enter category slug"
            onChange={(e) => setSlug(e.target.value)}
          />
        </div>
        <div className="modal-action">
          <button>Publish</button>
        </div>
      </form>
    </div>
  );
};

export default AddCategoryModel;
