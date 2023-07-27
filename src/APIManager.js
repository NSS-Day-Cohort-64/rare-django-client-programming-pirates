export const getUser = async (id) => {
    const response = await fetch(`http://localhost:8088/users/${id}`);
    const users = await response.json();
    return users;
};