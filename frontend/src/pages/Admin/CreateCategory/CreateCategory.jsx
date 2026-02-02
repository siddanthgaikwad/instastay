import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../Navbar/Navbar";
import "./CreateCategory.css";
import MobileNavBar from "../MobileNavBar/MobileNavBar";
import { CSpinner } from "@coreui/react";
import { toast } from "react-toastify";

const CreateCategory = () => {
  const [categories, setCategories] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [editId, setEditId] = useState(null);

  const fetchCategories = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/category/get-category`
      );
      // console.log("CreatePost fetch response : ", response.data);
      setCategories(response.data.categories);
    } catch (error) {
      // console.log("Error fetching categories:", error);
      toast.error(error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // Handle Edit
  const handleEdit = (id, name) => {
    setEditId(id);
    setCategoryName(name);
  };

  // Handle deleting a category
  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_BASE_URL}/api/category/delete-category/${id}`
      );
      fetchCategories(); //Refresh categories after deletion
    } catch (error) {
      // console.error("Error while deleting category : ", error);
      toast.error("Error while deleting the category.",error);
    }
  };

  // Handle Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (categoryName.trim() === "") return;

    try {
      if (editId) {
        // Update category
        await axios.put(
          `${
            import.meta.env.VITE_BASE_URL
          }/api/category/update-category/${editId}`,
          { name: categoryName }
        ); 
      } else {
        // Create new category
        await axios.post(
          `${import.meta.env.VITE_BASE_URL}/api/category/create-category`,
          { name: categoryName }
        );
      }
      setCategoryName("");
      setEditId(null);
      fetchCategories();
    } catch (error) {
      console.error("Error adding/updating category:", error);
    }
  };

  if(categories.length<1){
    return(
      <div className="d-flex align-items-center justify-content-center min-vh-100">
        <CSpinner />
      </div>
    )
  }
  return (
    <div className="createCategory-bg-container">
      <div className="d-none d-md-block">
        <Navbar />
      </div>
      <div className="ms-3" title="SideBar">
                    <MobileNavBar />
      </div>
      {/* <div className="d-flex justify-content-center"> */}
      <div className="custom-createCategory-container">
        <h1 className="custom-createCategory-heading">Create Category</h1>
        {/* Form */}
        <form onSubmit={handleSubmit} className="custom-createCategory-form mb-4">
          {/* Category Name */}
          <input
            type="text"
            placeholder="Category Name"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            className="custom-createCategory-formInput"
            required
          />

          {/* Button  */}
          <button type="submit" className="custom-createCategory-formButton">
            {editId ? "Update" : "Submit"}
          </button>
        </form>

        {/* Categories Display */}
        <div className="custom-createCategory-boxContainer">
          <h2 className="custom-createCategory-heading2">Categories</h2>
          <ul className="createCategory-list">
            {categories.map((category) => (
              <li key={category._id} className="createCategory-list-item">
                <span className="flex-grow-1">{category.name}</span>
                <div className="d-flex gap-2">
                  {/* Edit btn */}
                  <button
                    onClick={() => handleEdit(category._id, category.name)}
                    className="createCategory-custom-yellow-btn"
                  >
                    Edit
                  </button>

                  {/* Delete btn */}
                  <button
                    onClick={() => handleDelete(category._id)}
                    className="createCategory-custom-red-btn"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      {/* </div> */}
    </div>
  );
};

export default CreateCategory;
