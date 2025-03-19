import { getAccessToken } from "@/app/api/token";

export async function loginUser(email: string, password: string) {
    try {
        const response = await fetch("/api/auth/login", { 
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.detail || "Login failed");
        }

        return data;
    } catch (error) {
        console.error("Login error:", error);
        throw error;
    }
}

export async function signUpUser(userData: {
    email: string;
    password: string;
    first_name: string;
    last_name: string;
    phone_number: string;
    phone_country_code: string;
}) {
  

    try {
        const response = await fetch("/api/auth/signup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userData),
        });

        const data = await response.json();


        if (!response.ok) {
            throw new Error(`${data.message}: ${data.error?.detail || "Sign-up failed"}`);
        }
       

        return data;
    } catch (error) {
        console.error("Sign-up error:", error);
        throw error;
    }
}


export async function createOrg(orgData: {
    name: string;
    currency_code: string;
    business_type: string;
    locations: {
      country: string;
      state: string;
      full_address: string;
    }[];
  }) {
    const token = await getAccessToken();

    try {
      const response = await fetch("/api/organization/create", {
        method: "POST",
        headers: { Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, },
        body: JSON.stringify(orgData),
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(`${data.message}: ${data.error?.detail || "Organization creation failed"}`);
      }
  
      return data;
    } catch (error) {
      console.error("Organization creation error:", error);
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
