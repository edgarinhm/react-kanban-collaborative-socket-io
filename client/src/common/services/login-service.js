import { API_URL } from "./api-routes";

export const CreateSignIn = async (user) => {
    const response = await fetch(`${API_URL}/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
    });

    if (!response.ok) {
        throw new Error(`Error registering user: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
}

export const GetLogin = async (user) => {
    const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
    });

    if (!response.ok) {
        throw new Error(`Error login user`);
    }
    const data = await response.json();
    return data;
}