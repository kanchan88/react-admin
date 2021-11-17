import axios from 'axios';

export const getAllProducts = async () => {
  try {
    console.log(await axios.get('http://127.0.0.1:8000/api/product'));
    return await axios.get('http://127.0.0.1:8000/api/product');
  } catch (error) {
    console.log(error);
  }
};

export const getAllCategories = async () => {
  try {
    console.log(await axios.get('http://127.0.0.1:8000/api/category'));
    return await axios.get('http://127.0.0.1:8000/api/category');
  } catch (error) {
    console.log(error);
  }
};

export const getAllOrders = async () => {
  try {
    console.log(await axios.get('http://127.0.0.1:8000/api/order'));
    return await axios.get('http://127.0.0.1:8000/api/order');
  } catch (error) {
    console.log(error);
  }
};

export const loadSingleProduct = async (id) => {
  try {
    console.log(await axios.get(`http://127.0.0.1:8000/api/product/${id}`));
    return await axios.get(`http://127.0.0.1:8000/api/product/${id}`);
  } catch (error) {
    console.log(error);
  }
};

export const getMedia = async () => {
  try {
    return await axios.get('http://127.0.0.1:8000/api/media');
  } catch (error) {
    console.log(error);
  }
};

export const getSingleOrder = async (id) => {
  try {
    return await axios.get(`http://127.0.0.1:8000/api/order/${id}`);
  } catch (error) {
    console.log(error);
  }
};

export const getSingleProduct = async (id) => {
  try {
    return await axios.get(`http://127.0.0.1:8000/api/product/${id}`);
  } catch (error) {
    console.log(error);
  }
};

export const getSingleCategory = async (id) => {
  try {
    return await axios.get(`http://127.0.0.1:8000/api/category/${id}`);
  } catch (error) {
    console.log(error);
  }
};
