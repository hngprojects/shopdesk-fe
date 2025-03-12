export const getAccessToken = () => {
    if (typeof window !== "undefined") {
      return sessionStorage.getItem("refresh_token");
    }
    return null;
  };
  