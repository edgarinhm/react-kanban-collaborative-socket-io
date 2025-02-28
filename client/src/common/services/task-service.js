import { API_URL } from "../constants/environment-constants";

export const GetBoardTasks = async (boardId) => {
    const response = await fetch(`${API_URL}/board/${boardId}/tasks`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    });

    if (!response.ok) {
        throw new Error(`Error getting board tasks`);
    }
    const data = await response.json();
    return data;
}

export const CreateTask = async (task) => {
    const response = await fetch(`${API_URL}/tasks`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(task)
    });

    if (!response.ok) {
        throw new Error(`Error creating task`);
    }
    const data = await response.json();
    return data;
}

export const DeleteTask = async (taskId) => {
    const response = await fetch(`${API_URL}/tasks/${taskId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        }
    });

    if (!response.ok) {
        throw new Error(`Error deleting task`);
    }
    const data = await response.json();
    return data;
}