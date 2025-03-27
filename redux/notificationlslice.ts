import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface NotificationState {
  newOrders: boolean;
  orderStatusUpdates: boolean;
  notificationMethod: string;
  weeklySalesReport: boolean;
  monthlyPerformance: boolean;
  successfulPayments: boolean;
  failedPayments: boolean;
  paymentNotificationMethod: string;
}

const initialState: NotificationState = {
  newOrders: false,
  orderStatusUpdates: false,
  notificationMethod: 'email',
  weeklySalesReport: false,
  monthlyPerformance: false,
  successfulPayments: false,
  failedPayments: false,
  paymentNotificationMethod: 'push',
};

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNewOrders: (state, action: PayloadAction<boolean>) => {
      state.newOrders = action.payload;
    },
    setOrderStatusUpdates: (state, action: PayloadAction<boolean>) => {
      state.orderStatusUpdates = action.payload;
    },
    setNotificationMethod: (state, action: PayloadAction<string>) => {
      state.notificationMethod = action.payload;
    },
    setWeeklySalesReport: (state, action: PayloadAction<boolean>) => {
      state.weeklySalesReport = action.payload;
    },
    setMonthlyPerformance: (state, action: PayloadAction<boolean>) => {
      state.monthlyPerformance = action.payload;
    },
    setSuccessfulPayments: (state, action: PayloadAction<boolean>) => {
      state.successfulPayments = action.payload;
    },
    setFailedPayments: (state, action: PayloadAction<boolean>) => {
      state.failedPayments = action.payload;
    },
    setPaymentNotificationMethod: (state, action: PayloadAction<string>) => {
      state.paymentNotificationMethod = action.payload;
    },
  },
});

export const {
  setNewOrders,
  setOrderStatusUpdates,
  setNotificationMethod,
  setWeeklySalesReport,
  setMonthlyPerformance,
  setSuccessfulPayments,
  setFailedPayments,
  setPaymentNotificationMethod,
} = notificationSlice.actions;

export default notificationSlice.reducer;