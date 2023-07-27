import { useParams } from "react-router-dom";

export const getUser = async (id) => {
    const response = await fetch(`http://localhost:8088/users/${id}`);
    const users = await response.json();
    return users;
};

export const getTheCategories = async () => {
  const response = await fetch(`http://localhost:8088/categories`);
  const categories = await response.json();

  return categories;
};
