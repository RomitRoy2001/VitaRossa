// src/store/slices/donorSlice.ts
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Donor } from '../../types';

interface DonorState {
  donors: Donor[];
  selectedDonor: Donor | null;
  isLoading: boolean;
  error: string | null;
  totalCount: number;
}

const initialState: DonorState = {
  donors: [],
  selectedDonor: null,
  isLoading: false,
  error: null,
  totalCount: 0,
};

const donorSlice = createSlice({
  name: 'donors',
  initialState,
  reducers: {
    setDonors: (state, action: PayloadAction<{ donors: Donor[]; count: number }>) => {
      state.donors = action.payload.donors;
      state.totalCount = action.payload.count;
      state.isLoading = false;
      state.error = null;
    },
    setSelectedDonor: (state, action: PayloadAction<Donor | null>) => {
      state.selectedDonor = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    upsertDonor: (state, action: PayloadAction<Donor>) => {
      const idx = state.donors.findIndex((d) => d.id === action.payload.id);
      if (idx >= 0) {
        state.donors[idx] = action.payload;
      } else {
        state.donors.unshift(action.payload);
        state.totalCount += 1;
      }
    },
  },
});

export const { setDonors, setSelectedDonor, setLoading, setError, upsertDonor } = donorSlice.actions;
export default donorSlice.reducer;
