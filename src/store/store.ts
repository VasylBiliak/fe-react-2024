import { configureStore } from '@reduxjs/toolkit';

import products from './products/slice';
import theme from './theme/slice';

export const store = configureStore({
    reducer: {
        theme,

        products,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
