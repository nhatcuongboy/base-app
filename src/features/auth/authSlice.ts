import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from 'src/app/store';

export interface AuthState {
  user: any;
}

const initialState: AuthState = {
  user: null,
};


export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<any>) => {
      state.user = action.payload.user;
    },
  },
});

export const { setUser } = authSlice.actions;

export const selectUser = (state: RootState) => state.auth.user;

export default authSlice.reducer;
