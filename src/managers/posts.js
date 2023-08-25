export const getUserPost = ({ token }) => {
    return fetch(`http://localhost:8000/posts?user=true`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("auth_token")}`
        }
    }).then((res) => res.json());
};

export const getPostById = ({ postId }) => {
    return fetch(`http://localhost:8000/posts/${postId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "Authorization": `Token ${localStorage.getItem("auth_token")}`
        }
    }).then((res) => res.json());
}

export const postDelete = ({ postId }) => {
    return fetch(`http://localhost:8000/posts/${postId}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Token ${localStorage.getItem("auth_token")}`
        }
    })
}