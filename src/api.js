import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_BACKEND_URL;

const api = axios.create({
  baseURL: `${API_BASE_URL}/`,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const login = (username, password) => {
  return api.post('login/', { username, password });
};

export const register = (username, email, password) => {
  return api.post('register/', { username, email, password });
};

export const logout = () => {
  return api.post('logout/');
};

// Additional API functions
export const getUserData = (userId) => {
  return api.get(`users/${userId}/`);
};

export const updateUserProfile = (userId, userData) => {
  return api.put(`users/${userId}/`, userData);
};

export const year1Submit = (mainFormId, userData) => {
  return api.post(`form/year1/${mainFormId}`, userData);
}
export const year2Submit = (mainFormId, userData) => {
  return api.post(`form/year2/${mainFormId}`, userData);
}
export const year3Submit = (mainFormId, userData) => {
  return api.post(`form/year3/${mainFormId}`, userData);
}

export const revFormSubmit = (mainFormId, userData) => {
  return api.post(`form/rev_form/${mainFormId}`, userData);
}
export const revFormGet = (mainFormId, userData) => {
  return api.get(`form/rev_form/${mainFormId}`, userData);
}
export const proFormaSubmit = (mainFormId, userData) => {
  return api.post(`form/pro_forma/${mainFormId}`, userData);
}
export const createMainForm = (userId, formName) => {
  return api.post(`form/${userId}`, formName);
}
export const getMainForms = (userId) => {
  return api.get(`form/${userId}`);
}