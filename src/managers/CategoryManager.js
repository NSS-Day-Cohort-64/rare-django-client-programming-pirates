import React, { useEffect, useState } from "react";
import { getTheCategories } from "../APIManager";

import "./CategoryModel.css";

export const CategoryList = () => {
  const [categories, updateCategory] = useState([]);
  const [newCategory, updateNewCategory] = useState({ label: "" });
  const [modalsVisible, setModalsVisible] = useState({
    editModalVisible: false,
    deleteModalVisible: false,
  });
  const [selectedCategory, setSelectedCategory] = useState(null);

  const fetchCategories = async () => {
    const importedCategories = await getTheCategories();
    updateCategory(importedCategories);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleAddingCategory = (event) => {
    event.preventDefault();
    const categoryToSendToTheApi = {
      label: newCategory.label,
    };

    fetch(`http://localhost:8088/categories`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(categoryToSendToTheApi),
    })
      .then((response) => response.json())
      .then(() => {
        fetchCategories();
      });
  };

  const sortedCategories = categories.sort((a, b) =>
    a.label.localeCompare(b.label)
  );

  const handleEditClick = (category) => {
    setSelectedCategory(category);
    setModalsVisible({ editModalVisible: true, deleteModalVisible: true });
  };

  const handleEdit = (newLabel) => {
    if (newLabel) {
      //edit logic would go here
      console.log(
        "Editing category:",
        selectedCategory,
        "with new label:",
        newLabel
      );
    }
    setModalsVisible({ ...modalsVisible, editModalVisible: false });
  };

  const handleConfirmDelete = () => {
    // delete logic would go here
    console.log("Deleting category:", selectedCategory);
    setModalsVisible({ ...modalsVisible, deleteModalVisible: false });
  };

  return (
    <>
      <h2 className="category-title"> Categories </h2>

      <div className="category-list-container">
        {sortedCategories.map((category) => (
          <section className="category-profile" key={category.id}>
            <a href="#" onClick={() => handleEditClick(category)}>
              {category.label}
            </a>
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
