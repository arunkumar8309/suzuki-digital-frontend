// api.js

const BASE_URL = process.env.Api_Url || "http://localhost:3001/api/users";

console.log("BASE_URL", BASE_URL);

// Function to make a GET request
export const fetchData = async (endpoint) => {
  const response = await fetch(`${BASE_URL}/${endpoint}`);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return await response.json();
};

// Function to make a POST request
export const createData = async (endpoint, data) => {
  const response = await fetch(`${BASE_URL}/${endpoint}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error("Failed to create resource");
  }
  return await response.json();
};

// Function to make a PUT request
export const updateData = async (endpoint, data) => {
  const response = await fetch(`${BASE_URL}/${endpoint}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error("Failed to update resource");
  }
  return await response.json();
};

// Function to make a DELETE request
export const deleteData = async (endpoint) => {
  const response = await fetch(`${BASE_URL}/${endpoint}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Failed to delete resource");
  }
  return await response.json(); // or you can return response status
};
