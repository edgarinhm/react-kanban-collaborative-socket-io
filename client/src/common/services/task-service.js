import { API_URL } from "./api-routes";

export const GetTasks = async () => {
    const response = await fetch(`${API_URL}/home`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    });

    if (!response.ok) {
        throw new Error(`Error getting task`);
    }
    const data = await response.json();
    return data;
}