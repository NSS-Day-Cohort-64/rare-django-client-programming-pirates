export const commentUpdate = (comment) => {
    return fetch(`http://localhost:8000/comments/${comment.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Token ${localStorage.getItem("auth_token")}`
            },
            body: JSON.stringify(comment)
        })
    };