import { Route, Routes } from 'react-router-dom';

import { CartContextProvider } from '@/context/Cart';
import { ProductsDataContextProvider } from '@/context/ProductsList';
import { Component } from '@/interfaces/Component';

import { AboutPage } from './components/About/About.component.tsx';
import { LayoutPage } from './components/Layout/Layout.component';
import { MenuPage } from './components/Menu/Menu.component';
import { PageNotFound } from './pages/PageNotFound/PageNotFound.component';
import { ProductPage } from './pages/ProductPage/ProductPage.component';
import { ProductsPage } from './pages/ProductsPage/ProductsPage.component';

function App() {
    return (
        <CartContextProvider>
            <ProductsDataContextProvider>
                <Routes>
                    <Route path={'/'} element={<LayoutPage />}>
                        <Route index element={<AboutPage />} />
                        <Route path={Component.PRODUCTS} element={<ProductsPage />} />
                        <Route path={Component.MENU} element={<MenuPage />} />
                        <Route path={`${Component.PRODUCTS}/:id`} element={<ProductPage />} />
                        <Route path="*" element={<PageNotFound />} />
                    </Route>
                </Routes>
            </ProductsDataContextProvider>
        </CartContextProvider>
    );
}

export default App;
