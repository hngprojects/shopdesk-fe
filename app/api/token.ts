export const getAccessToken = () =>{
if (typeof window !== "undefined") {
    return sessionStorage.getItem("access_token");
  }
  return null;
};


const token = getAccessToken();
console.log("Access Token:", token);
