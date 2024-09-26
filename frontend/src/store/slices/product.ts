import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getProduct } from '../../services/product.service';

interface ProductState {
  product: any | null;
  loading: boolean;
  error: string | null;
}

const initialState: ProductState = {
  product: null,
  loading: false,
  error: null,
};

// Thunk para obtener el producto
export const fetchProduct = createAsyncThunk(
  'product/fetchProduct',
  async (productId: number) => {
    const response = await getProduct(productId);
    return response;
  }
);

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProduct.fulfilled, (state, action) => {
        state.product = action.payload;
        state.loading = false;
      })
      .addCase(fetchProduct.rejected, (state, action) => {
        state.error = 'Failed to load product';
        state.loading = false;
      });
  },
});

export default productSlice.reducer;
