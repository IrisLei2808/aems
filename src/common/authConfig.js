export const msalConfig = {
    auth: {
      clientId: "00a21f64-cd60-4444-8e0f-03c9f4d36762",
      authority: "https://login.microsoftonline.com/0571822d-33dc-455e-a07f-1b5575297583", 
      redirectUri: "http://localhost:3000",
    },
    cache: {
      cacheLocation: "sessionStorage", 
      storeAuthStateInCookie: false, 
    }
  };

export const loginRequest = {
    scopes: ["api://00a21f64-cd60-4444-8e0f-03c9f4d36762/UserAccess"]
   };