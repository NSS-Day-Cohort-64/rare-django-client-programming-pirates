import React, { useState, useEffect } from "react";
import { getAllUsers } from "../APIManager.js";
import "./AdminUserListManager.css";

export const UserListManager = () => {
    const [users, setUsers] = useState([]);

    const fetchData = async () => {
        const importUsers = await getAllUsers();
        setUsers(importUsers);
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleToggleActive = async (id, active) => {
        try {
            const response = await fetch(`http://localhost:8088/users/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ active: 0}),
            });
            
            if (response.ok) {
                fetchData();
            } else {
                console.error("Failed to update user's active status:", response);
            }
        } catch (error) {
            console.error("Error updating user's active status:", error);
        }
    };

    return (
        <div className="user-list-container">
            <h2 className="title">User List</h2>
            <ul className="user-list">
                {users.map((user) => (
                    <li key={user.id} className="user-item">
                        <div>
                            <p>
                                Username: {user.first_name} {user.last_name}
                            </p>
                            <p>Active: {user.active ? "Yes" : "No"}</p>
                            <input
                                type="checkbox"
                                checked={user.active}
                                onChange={() => handleToggleActive(user.id, user.active)}
                            />
                            <p>Admin: {user.is_admin ? "Yes" : "No"}</p>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};
