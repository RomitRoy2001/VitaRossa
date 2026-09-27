// src/store/slices/donationSlice.ts
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Donation } from '../../types';

interface DonationState {
  donations: Donation[];
  selectedDonation: Donation | null;
  isLoading: boolean;
  error: string | null;
  totalCount: number;
}

const initialState: DonationState = {
  donations: [], selectedDonation: null,
  isLoading: false, error: null, totalCount: 0,
};

const donationSlice = createSlice({
  name: 'donations',
  initialState,
  reducers: {
    setDonations: (state, action: PayloadAction<{ donations: Donation[]; count: number }>) => {
      state.donations = action.payload.donations;
      state.totalCount = action.payload.count;
      state.isLoading = false; state.error = null;
    },
    setSelectedDonation: (state, action: PayloadAction<Donation | null>) => { state.selectedDonation = action.payload; },
    setLoading: (state, action: PayloadAction<boolean>) => { state.isLoading = action.payload; },
    setError: (state, action: PayloadAction<string | null>) => { state.error = action.payload; state.isLoading = false; },
    upsertDonation: (state, action: PayloadAction<Donation>) => {
      const idx = state.donations.findIndex((d) => d.id === action.payload.id);
      if (idx >= 0) state.donations[idx] = action.payload;
      else { state.donations.unshift(action.payload); state.totalCount += 1; }
    },
  },
});

export const { setDonations, setSelectedDonation, setLoading, setError, upsertDonation } = donationSlice.actions;
export default donationSlice.reducer;
