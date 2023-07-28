import { HumanDate } from "./components/utils/HumanDate";

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

export const getAllTags = async () => {
  const response = await fetch(`http://localhost:8088/tags`);
  const tags = await response.json();

  return tags;
}

<<<<<<< HEAD
export const getAllUsers = async () => {
  const response = await fetch(`http://localhost:8088/users`);
  const users = await response.json();

  return users;
}
=======
export const createNewPost = async (post) => {
  const response = await fetch("http://localhost:8088/posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(post)
  })
  const newPost = await response.json()
  return newPost
}
>>>>>>> f410599777ce7292b809c98b63e0df29fad0a348
