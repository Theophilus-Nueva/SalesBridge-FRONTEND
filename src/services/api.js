const API_BASE_URL = "https://salesbridge-backend-production.up.railway.app";

export const loginGuest = async (bookingId, password) => {
  const formData = new URLSearchParams();
  formData.append("username", bookingId);
  formData.append("password", password || "dummy"); 

  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: formData.toString(),
  });

  if (!response.ok) {
    throw new Error("Invalid credentials");
  }
  return response.json();
};

export const fetchGuestTransactions = async (token) => {
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