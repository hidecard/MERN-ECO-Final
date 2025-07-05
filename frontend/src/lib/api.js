const API_URL = 'http://localhost:5000/api';

const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || `Request failed with status ${response.status}`);
  }
  return response.json();
};

export const register = async (userData) => {
  const response = await fetch(`${API_URL}/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });
  return handleResponse(response);
};

export const login = async (userData) => {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });
  return handleResponse(response);
};

export const getAdminUsers = async (token) => {
  const response = await fetch(`${API_URL}/admin/users`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return handleResponse(response);
};

export const createAdminUser = async (token, userData) => {
  const response = await fetch(`${API_URL}/admin/users`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });
  return handleResponse(response);
};

export const updateAdminUser = async (token, id, userData) => {
  const response = await fetch(`${API_URL}/admin/users/${id}`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });
  return handleResponse(response);
};

export const deleteAdminUser = async (token, id) => {
  const response = await fetch(`${API_URL}/admin/users/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return handleResponse(response);
};


// get admin category

export const getAdminCategory = async (token) => {
    const response = await fetch(`${API_URL}/admin/categories`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      });
      return handleResponse(response);
};

// create category

export const createAdminCategory = async (token , categoryData) => {
    const response = await fetch(`${API_URL}/admin/categories`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(categoryData),
      });
      return handleResponse(response);
}

// update category

export const updateAdminCategory = async (token, id, categoryData) => {
    const response = await fetch(`${API_URL}/admin/categories/${id}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(categoryData),
      });
      return handleResponse(response);
}

// delete category

export const deleteAdminCategory = async (token, id) => {
    const response = await fetch(`${API_URL}/admin/categories/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      });
      return handleResponse(response);
}


// get product

export const getAdminProducts = async (token) => { 
  console.log('Fetching admin products from:', `${API_URL}/admin/products`); 
  const response = await fetch(`${API_URL}/admin/products`, { 
    headers: { Authorization: `Bearer ${token}` }, 
  }); 
  return handleResponse(response); 
}; 

// create product 
export const createAdminProduct = async (token, productData) => { 
  console.log('Creating product:', productData); 
  const response = await fetch(`${API_URL}/admin/products`, { 
    method: 'POST', 
    headers: { 
      'Content-Type': 'application/json', 
      Authorization: `Bearer ${token}`, 
    }, 
    body: JSON.stringify(productData), 
  }); 
  return handleResponse(response); 
}; 

// update product
export const updateAdminProduct = async (token, id, productData) => {
  console.log('Updating product:', productData);
  const response = await fetch(`${API_URL}/admin/products/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(productData),
  });
  return handleResponse(response);
};

// delete product

export const deleteAdminProduct = async (token, id) => {
  console.log('Deleting product:', id);
  const response = await fetch(`${API_URL}/admin/products/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return handleResponse(response);
};


