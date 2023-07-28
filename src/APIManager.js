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

export const getAllUsers = async () => {
  const response = await fetch(`http://localhost:8088/users`);
  const users = await response.json();

  return users;
}
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

export const getPost = async (id) => {
  const response = await fetch(`http://localhost:8088/posts/${id}`)
  const postToEdit = await response.json()
  return postToEdit
}

export const editPost = async (post) => {
  const response = await fetch(`http://localhost:8088/posts/${post.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(post)
  })
  const editedPost = await response.json()
  return editedPost
}
