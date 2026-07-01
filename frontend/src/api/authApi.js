export const loginUser = async (data) => {
    const res = await fetch("http://localhost:8081/api/auth/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });

    const result = await res.json();

    console.log("LOGIN RESPONSE:", result);

    return result;
};

export const registerUser = async (data) => {
    const res = await fetch("http://localhost:8081/api/auth/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });

    return res.text();
};