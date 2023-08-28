export const getUser = async (id) => {
  const response = await fetch(`http://localhost:8000/users/${id}`);
  const user = await response.json();
  return user;
};

export const getTheCategories = async () => {
  const response = await fetch(`http://localhost:8000/categories`, {
    headers: {
      "Authorization": `Token ${localStorage.getItem("auth_token")}`
    }
  });
  const categories = await response.json();

  return categories;
};
export const getAllTags = async () => {
  console.log(localStorage.getItem("auth_token"))
  const response = await fetch(`http://localhost:8000/tags`, {
    method: "GET",
    headers: {
      "Authorization": `Token ${localStorage.getItem("auth_token")}`
    }
  });
  const tags = await response.json();

  return tags;
}

export const getAllUsers = async () => {
  const response = await fetch(`http://localhost:8000/users`);
  const users = await response.json();

  return users;
}

export const createNewPost = async (post) => {
  try {
    // Make the API call to create the post
    const postResponse = await fetch("http://localhost:8000/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Token ${localStorage.getItem("auth_token")}`
      },
      body: JSON.stringify(post),
    });

    if (!postResponse.ok) {
      throw new Error("Failed to create post");
    }

    // Get the new post object from the response
    const newPost = await postResponse.json();
  } catch (error) {
    // Handle any errors that occurred during the process
    console.error("Error creating post and tags:", error);
    throw error;
  }
};

export const getPost = async (id) => {
  const response = await fetch(`http://localhost:8000/posts/${id}`, {
    headers: {
      "Authorization": `Token ${localStorage.getItem("auth_token")}`
    }
  });
  const postToEdit = await response.json()
  return postToEdit
}

export const editPost = async (post) => {
  await fetch(`http://localhost:8000/posts/${post.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Token ${localStorage.getItem("auth_token")}`
    },
    body: JSON.stringify(post)
  })
}

export const editPostTags = async (postId, tags) => {
  await fetch(`http://localhost:8000/posts/${postId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Token ${localStorage.getItem("auth_token")}`
    },
    body: JSON.stringify({tags: tags})
  })
}

export const getSubscriptions = async () => {
  const response = await fetch(`http://localhost:8000/subscriptions`);
  const subscriptions = await response.json();
  return subscriptions
}

export const createSubscription = async (newSubscription) => {
  const response = await fetch("http://localhost:8000/subscriptions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(newSubscription)
  })
  const createdSubscription = await response.json()
  return createdSubscription
}

export const deleteSubscription = async (id) => {
  fetch(`http://localhost:8000/subscriptions/${id}`, {
    method: "DELETE"
  })
}

export const deleteCategory = async (id) => {
  await fetch(`http://localhost:8000/categories/${id}`, {
    method: "DELETE",
    headers: {
      "Authorization": `Token ${localStorage.getItem("auth_token")}`
    }
  })
}


export const editCategory = async (category) => {
  await fetch(`http://localhost:8000/categories/${category.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Token ${localStorage.getItem("auth_token")}`
    },
    body: JSON.stringify(category)
  })
}

export const deleteTag = async (tagId) => {
  await fetch(`http://localhost:8000/tags/${tagId}`, {
    method: "DELETE",
    headers: {
      "Authorization": `Token ${localStorage.getItem("auth_token")}`
    }
  })
}

export const deleteComment = async (commentId) => {
  await fetch(`http://localhost:8000/comments/${commentId}`, {
    method: "DELETE",
    headers: {
      "Authorization": `Token ${localStorage.getItem("auth_token")}`
    }
  })
}

export const togglePostApproval = async (postId, currentStatus) => {
  await fetch(`http://localhost:8000/posts/${postId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Token ${localStorage.getItem("auth_token")}`
    },
    body: JSON.stringify({ approved: !currentStatus }),
  });
}

export const editTag = async (tagId, newTag) => {
  await fetch(`http://localhost:8000/tags/${tagId}`, {
    method: "PUT",
    headers: {
      "Authorization": `Token ${localStorage.getItem("auth_token")}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(newTag)
  })
}
