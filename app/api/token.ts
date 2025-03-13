export const getAccessToken = async (): Promise<string | null> => {
  try {
    const response = await fetch("api/auth/token", {
      method: "GET",
      credentials: "include",
    });
    if (!response.ok) throw new Error("Failed to get access token");
    const data = await response.json();
    return data.accessToken;
  } catch (error) {
    console.error("Error fetching access token:", error);
    return null;
  }
};
