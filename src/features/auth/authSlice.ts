import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from 'src/app/store';

export interface AuthState {
  user: any;
  token: string | null;
}

const initialState: AuthState = {
  user: null,
  token: null,
};


export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<any>) => {
      state.user = action.payload.user;
    },
    setToken: (state, action: PayloadAction<any>) => {
      state.token = action.payload.token;
    },
    logout: () => {
      //
    },
  },
});

export const { setUser, setToken, logout } = authSlice.actions;

export const selectUser = (state: RootState) => state.auth.user;

export const selectToken = (state: RootState) => state.auth.token;

export default authSlice.reducer;
