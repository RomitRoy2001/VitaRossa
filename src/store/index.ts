// src/store/index.ts
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import uiReducer from './slices/uiSlice';
import donorReducer from './slices/donorSlice';
import donationReducer from './slices/donationSlice';
import inventoryReducer from './slices/inventorySlice';
import requestReducer from './slices/requestSlice';
import campReducer from './slices/campSlice';
import employeeReducer from './slices/employeeSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    ui: uiReducer,
    donors: donorReducer,
    donations: donationReducer,
    inventory: inventoryReducer,
    requests: requestReducer,
    camps: campReducer,
    employees: employeeReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
