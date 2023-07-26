// Gets all posts
export const getAllPosts = () => {
    fetch(`http://localhost:8088/posts`)
    .then(response => response.json())
    .then(postsArray => {
        const sortedPosts = postsArray.sort((a, b) => {
            const dateA = new Date(a.publication_date);
            const dateB = new Date(b.publication_date);
            return dateB - dateA;
        })
})
}

// Gets selected post details
export const getPostDetails = () => {
    fetch(`http://localhost:8088/posts/${postId}?_expand=categories`)
    .then((response) => response.json())
    .then((singlePost) => {
        setSelectedPost(singlePost);
    })
}