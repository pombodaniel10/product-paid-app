import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { checkInfo, requestPayment, getTransaction } from '../../services/payment.service';
import { PaymentMethod, Transaction } from '../../types';

export const checkPaymentInfo = createAsyncThunk(
    'payment/checkPaymentInfo',
    async (paymentInfo: any) => {
        const response = await checkInfo(paymentInfo);
        return response;
    }
);


export const requestTransaction = createAsyncThunk(
    'payment/requestTransaction',
    async (paymentMethod: any) => {
        const response = await requestPayment(paymentMethod);
        return response;
    }
);

export const getTransactionStatus = createAsyncThunk(
    'payment/getTransaction',
    async (transactionId: string) => {
        const response = await getTransaction(transactionId);
        return response;
    }
);

const paymentSlice = createSlice({
    name: 'payment',
    initialState: {
        paymentMethod: null as PaymentMethod | null,
        transaction: null as Transaction | null,
        loading: false,
        error: null as string | null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(checkPaymentInfo.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(checkPaymentInfo.fulfilled, (state, action) => {
                state.paymentMethod = action.payload;
                state.loading = false;
            })
            .addCase(checkPaymentInfo.rejected, (state, action) => {
                state.error = 'Failed to check payment info';
                state.loading = false;
            })
            .addCase(requestTransaction.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(requestTransaction.fulfilled, (state, action) => {
                state.transaction = action.payload;
                state.loading = false;
            })
            .addCase(requestTransaction.rejected, (state, action) => {
                state.error = 'Failed to request transaction';
                state.loading = false;
            })
            .addCase(getTransactionStatus.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getTransactionStatus.fulfilled, (state, action) => {
                state.transaction = action.payload;
                state.loading = false;
            })
            .addCase(getTransactionStatus.rejected, (state, action) => {
                state.error = 'Failed to get transaction';
                state.loading = false;
            });
    },
});

export default paymentSlice.reducer;
