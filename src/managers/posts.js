export const getUserPost = ({ token }) => {
    return fetch(`http://localhost:8000/posts?user=true`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("auth_token")}`
        }
    }).then((res) => res.json());
};