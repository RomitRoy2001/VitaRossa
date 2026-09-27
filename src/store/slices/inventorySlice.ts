// src/store/slices/inventorySlice.ts
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { BloodUnit, InventorySummaryItem } from '../../types';

interface InventoryState {
  summary: InventorySummaryItem[];
  units: BloodUnit[];
  selectedUnit: BloodUnit | null;
  isLoading: boolean;
  error: string | null;
  totalCount: number;
}

const initialState: InventoryState = {
  summary: [], units: [], selectedUnit: null,
  isLoading: false, error: null, totalCount: 0,
};

const inventorySlice = createSlice({
  name: 'inventory',
  initialState,
  reducers: {
    setSummary: (state, action: PayloadAction<InventorySummaryItem[]>) => { state.summary = action.payload; },
    setUnits: (state, action: PayloadAction<{ units: BloodUnit[]; count: number }>) => {
      state.units = action.payload.units; state.totalCount = action.payload.count;
      state.isLoading = false; state.error = null;
    },
    setSelectedUnit: (state, action: PayloadAction<BloodUnit | null>) => { state.selectedUnit = action.payload; },
    setLoading: (state, action: PayloadAction<boolean>) => { state.isLoading = action.payload; },
    setError: (state, action: PayloadAction<string | null>) => { state.error = action.payload; state.isLoading = false; },
  },
});

export const { setSummary, setUnits, setSelectedUnit, setLoading, setError } = inventorySlice.actions;
export default inventorySlice.reducer;
