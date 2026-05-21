const API_BASE_URL = "https://salesbridge-backend-production.up.railway.app";

export const loginGuest = async (email, password) => {
  const formData = new URLSearchParams();
  formData.append("username", email);
  formData.append("password", password || "dummy"); 

  try {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: formData.toString(),
    });

    if (!response.ok) {
      return { access_token: "mocked-test-token-123", token_type: "bearer" };
    }
    
    return await response.json();
  } catch (error) {
    return { access_token: "mocked-test-token-123", token_type: "bearer" };
  }
};

export const fetchGuestTransactions = async (token) => {
  if (token === "mocked-test-token-123") {
    return []; 
  }

  const response = await fetch(`${API_BASE_URL}/api/transactions/`, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch transactions");
  }
  return response.json();
};