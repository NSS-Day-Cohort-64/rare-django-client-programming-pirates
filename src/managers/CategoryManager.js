import React, { useEffect, useState } from "react";
import { deleteCategory, editCategory, getTheCategories } from "../APIManager";

import "./CategoryModel.css";

export const CategoryList = () => {
  const [categories, updateCategory] = useState([]);
  const [newCategory, updateNewCategory] = useState({ label: "" });
  const [modalsVisible, setModalsVisible] = useState({
    editModalVisible: false,
    deleteModalVisible: false,
  });
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [error, setError] = useState(null);

  const fetchCategories = async (sortParam, filterParam) => {
    const url = new URL('http://localhost:8000/categories');
    if (sortParam) url.searchParams.append('sort_by', sortParam);
    if (filterParam) url.searchParams.append('filter_by', filterParam);
  
    try {
      const response = await fetch(url.toString(), {
        headers: {
          Authorization: `Token ${localStorage.getItem("auth_token")}`,
        },
      });
  
      if (!response.ok) {
        throw new Error(`Request failed with status: ${response.status}`);
      }
  
      const responseData = await response.json();
  
      if (Array.isArray(responseData)) {
        // The API response is an array
        updateCategory(responseData);
      } else {
        console.error("API response is not an array:", responseData);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };
  

  const handleAddingCategory = async (event) => {
    event.preventDefault();
    const categoryToSendToTheApi = {
      label: newCategory.label,
    };

  
    try {
      const response = await fetch(`http://localhost:8000/categories`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Token ${localStorage.getItem("auth_token")}`,
        },
        body: JSON.stringify(categoryToSendToTheApi),

      });
  
      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage);
      }
  
      fetchCategories();
    } catch (error) {
      console.error("Error adding category:", error.message);
      setError("An error occurred while adding the category.");
    }
  };

  const handleEditClick = (category) => {
    setSelectedCategory(category);
    setModalsVisible({ editModalVisible: true });
  };

  const handleDeleteClick = (category) => {
    setSelectedCategory(category);
    setModalsVisible({ deleteModalVisible: true });
  };

  const handleEdit = async (newLabel) => {

      selectedCategory.label = newLabel;
      await editCategory(selectedCategory);
      fetchCategories();
      console.log(
        "Editing category:",
        selectedCategory,
        "with new label:",
        newLabel
      );
    
    setModalsVisible({ ...modalsVisible, editModalVisible: false });
  };

  const handleConfirmDelete = async () => {
    await deleteCategory(selectedCategory.id);
    fetchCategories();
    console.log("Deleting category:", selectedCategory);
    setModalsVisible({ ...modalsVisible, deleteModalVisible: false });
  };

  useEffect(() => {
    fetchCategories(); // Call the function without any parameters for initial load
  }, []);

  return (
    <>
      <h2 className="category-title"> Categories </h2>

      <div className="category-list-container">
        {categories.map((category) => (
          <section className="category-profile" key={category.id}>
            <a href="#" onClick={() => handleEditClick(category)}>
              {category.label}
            </a>
            <button className="delete-btn" onClick={() => handleDeleteClick(category)}>Delete</button>
          </section>
        ))}
      </div>

      {(modalsVisible.editModalVisible || modalsVisible.deleteModalVisible) && (
        <div className={`modal ${modalsVisible ? "is-active" : ""}`}>
          <div className="modal-container">
            {modalsVisible.editModalVisible && (
              <div className="modal-content">
                <h2 className="modal-title">Edit Category</h2>
                <input
                  type="text"
                  value={selectedCategory ? selectedCategory.label : ""}
                  onChange={(e) =>
                    setSelectedCategory({
                      ...selectedCategory,
                      label: e.target.value,
                    })
                  }
                />
                <button
                  className="modal-btn"
                  onClick={() => handleEdit(selectedCategory.label)}
                >
                  Save
                </button>
                <button
                  className="modal-btn"
                  onClick={() =>
                    setModalsVisible({
                      ...modalsVisible,
                      editModalVisible: false,
                    })
                  }
                >
                  Cancel
                </button>
              </div>
            )}

            {modalsVisible.deleteModalVisible && (
              <div className="modal-content2">
                <h2 className="modal-title">Confirm Delete</h2>
                <p>
                  Are you sure you want to delete "
                  {selectedCategory ? selectedCategory.label : ""}"?
                </p>
                <button className="modal-btn" onClick={handleConfirmDelete}>
                  Confirm
                </button>
                <button
                  className="modal-btn"
                  onClick={() =>
                    setModalsVisible({
                      ...modalsVisible,
                      deleteModalVisible: false,
                    })
                  }
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
          <button
            className="modal-close is-large"
            aria-label="close"
            onClick={() =>
              setModalsVisible({
                editModalVisible: false,
                deleteModalVisible: false,
              })
            }
          ></button>
        </div>
      )}
      <div className="category-form-container">
        <form className="category-form">
          <h2 className="category-form__title">Create a new category</h2>
          <fieldset>
            <div className="form-group">
              <textarea
                required
                autoFocus
                className="form-control"
                placeholder="Add Text"
                value={newCategory.label}
                onChange={(evt) => {
                  const copy = { ...newCategory };
                  copy.label = evt.target.value;
                  updateNewCategory(copy);
                }}
              />
            </div>
          </fieldset>
          <button onClick={handleAddingCategory}>Create</button>
        </form>
      </div>
    </>
  );
};
