import axios from 'axios';

export const getProduct = async (productId: number) => {
  try {
    const response = await axios.get(`http://localhost:3001/products/${productId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching product:', error);
    throw error;
  }
};