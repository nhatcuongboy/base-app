import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from './store';

export interface AppState {
  theme: string;
  language: string;
}

const initialState: AppState = {
  theme: 'light',
  language: 'en',
};


export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    changeTheme: (state, action: PayloadAction<string>) => {
      state.theme = action.payload;
    },
    changeLanguage: (state, action: PayloadAction<string>) => {
      state.language = action.payload;
    },
  },
});

export const { changeTheme, changeLanguage } = appSlice.actions;

export const selectTheme = (state: RootState) => state.app.theme;

export const selectLanguage = (state: RootState) => state.app.language;

export default appSlice.reducer;
