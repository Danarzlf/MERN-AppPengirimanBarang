export const postRequest = async (url, body) => {
  // console.log("body", body);
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body,
  });

  const data = await response.json();
  console.log("Response from server:", response);

  if (!response.ok) {
    let message;

    if (data?.message) {
      message = data.message;
    } else {
      message = data;
    }
    return { error: true, message };
  }

  return data;
};

export const getRequest = async (url, headers = {}) => {
  const response = await fetch(url, { headers });
  const data = await response.json();

  if (!response.ok) {
    let message = "Terjadi kesalahan...";

    if (data?.message) {
      message = data.message;
    }

    return { error: true, message };
  }

  return data;
};

export const putRequest = async (url, body, headers = {}) => {
  try {
    // console.log("PUT Request URL:", url);
    // console.log("PUT Request Headers:", headers);

    const response = await fetch(url, {
      method: "PUT",
      body,
      headers: {
        ...headers,
      },
    });

    console.log("PUT Response:", response);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return response;
  } catch (error) {
    console.error("Error in putRequest:", error.message);
    throw error;
  }
};
