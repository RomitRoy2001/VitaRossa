// src/store/slices/employeeSlice.ts
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Employee } from '../../types';

interface EmployeeState {
  employees: Employee[];
  selectedEmployee: Employee | null;
  isLoading: boolean;
  error: string | null;
  totalCount: number;
}

const initialState: EmployeeState = {
  employees: [], selectedEmployee: null,
  isLoading: false, error: null, totalCount: 0,
};

const employeeSlice = createSlice({
  name: 'employees',
  initialState,
  reducers: {
    setEmployees: (state, action: PayloadAction<{ employees: Employee[]; count: number }>) => {
      state.employees = action.payload.employees; state.totalCount = action.payload.count;
      state.isLoading = false; state.error = null;
    },
    setSelectedEmployee: (state, action: PayloadAction<Employee | null>) => { state.selectedEmployee = action.payload; },
    setLoading: (state, action: PayloadAction<boolean>) => { state.isLoading = action.payload; },
    setError: (state, action: PayloadAction<string | null>) => { state.error = action.payload; state.isLoading = false; },
  },
});

export const { setEmployees, setSelectedEmployee, setLoading, setError } = employeeSlice.actions;
export default employeeSlice.reducer;
