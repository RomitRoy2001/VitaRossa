// src/store/slices/campSlice.ts
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { DonationCamp } from '../../types';

interface CampState {
  camps: DonationCamp[];
  selectedCamp: DonationCamp | null;
  isLoading: boolean;
  error: string | null;
  totalCount: number;
}

const initialState: CampState = {
  camps: [], selectedCamp: null,
  isLoading: false, error: null, totalCount: 0,
};

const campSlice = createSlice({
  name: 'camps',
  initialState,
  reducers: {
    setCamps: (state, action: PayloadAction<{ camps: DonationCamp[]; count: number }>) => {
      state.camps = action.payload.camps; state.totalCount = action.payload.count;
      state.isLoading = false; state.error = null;
    },
    setSelectedCamp: (state, action: PayloadAction<DonationCamp | null>) => { state.selectedCamp = action.payload; },
    setLoading: (state, action: PayloadAction<boolean>) => { state.isLoading = action.payload; },
    setError: (state, action: PayloadAction<string | null>) => { state.error = action.payload; state.isLoading = false; },
    upsertCamp: (state, action: PayloadAction<DonationCamp>) => {
      const idx = state.camps.findIndex((c) => c.id === action.payload.id);
      if (idx >= 0) state.camps[idx] = action.payload;
      else { state.camps.unshift(action.payload); state.totalCount += 1; }
    },
  },
});

export const { setCamps, setSelectedCamp, setLoading, setError, upsertCamp } = campSlice.actions;
export default campSlice.reducer;
