import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import { Theme } from '@/interfaces/Theme';

const getDefaultTheme = (): Theme => {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme) {
        return storedTheme as Theme;
    } else {
        const isLightTheme = window.matchMedia('(prefers-color-scheme: light)').matches;
        return isLightTheme ? Theme.LIGHT : Theme.DARK;
    }
};

const initialState: Theme = getDefaultTheme();

const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        setTheme(state, action: PayloadAction<Theme>) {
            return action.payload;
        },
    },
});

export const { setTheme } = themeSlice.actions;
export const selectTheme = (state: { theme: Theme }) => state.theme;
export default themeSlice.reducer;
