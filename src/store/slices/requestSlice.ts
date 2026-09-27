// src/store/slices/requestSlice.ts
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { BloodRequest } from '../../types';

interface RequestState {
  requests: BloodRequest[];
  selectedRequest: BloodRequest | null;
  isLoading: boolean;
  error: string | null;
  totalCount: number;
}

const initialState: RequestState = {
  requests: [], selectedRequest: null,
  isLoading: false, error: null, totalCount: 0,
};

const requestSlice = createSlice({
  name: 'requests',
  initialState,
  reducers: {
    setRequests: (state, action: PayloadAction<{ requests: BloodRequest[]; count: number }>) => {
      state.requests = action.payload.requests; state.totalCount = action.payload.count;
      state.isLoading = false; state.error = null;
    },
    setSelectedRequest: (state, action: PayloadAction<BloodRequest | null>) => { state.selectedRequest = action.payload; },
    setLoading: (state, action: PayloadAction<boolean>) => { state.isLoading = action.payload; },
    setError: (state, action: PayloadAction<string | null>) => { state.error = action.payload; state.isLoading = false; },
    upsertRequest: (state, action: PayloadAction<BloodRequest>) => {
      const idx = state.requests.findIndex((r) => r.id === action.payload.id);
      if (idx >= 0) state.requests[idx] = action.payload;
      else { state.requests.unshift(action.payload); state.totalCount += 1; }
    },
  },
});

export const { setRequests, setSelectedRequest, setLoading, setError, upsertRequest } = requestSlice.actions;
export default requestSlice.reducer;
