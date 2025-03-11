export async function loginUser(email: string, password: string) {
    console.log({ email, password });
    try {
        const response = await fetch("/api/auth/login", { 
            method: "POST",
            // headers: {
            //     "Accept": "application/json",
            //     "Content-Type": "application/json",
            // },
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });

//         const text = await response.text();
// console.log("Raw Response:", text);

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Login failed");
        }

        return data;
    } catch (error) {
        console.error("Login error:", error);
        throw error;
    }
}


// export async function loginUser(email: string, password: string) {
//     try {
//         const response = await fetch("https://api.timbu.cloud/auth/login", {
//             method: "POST",
//             headers: {
//                 "Accept": "application/json",
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify({ email, password }),
//         });
//         const data = await response.json();
//         if (!response.ok) {
//             throw new Error(data.message || "Login failed");
//         }
//         return data;
//     } catch (error) {
//         console.error("Login error:", error);
//         throw error;
//     }
// }
