import { useState } from 'react';

import { CartContextProvider } from '@/context/Cart';
import { ProductsDataContextProvider } from '@/context/Product';

import { AboutPage } from './components/About/About.component.tsx';
import { Footer } from './components/Footer/Footer.component.tsx';
import { Header } from './components/Header/Header.component.tsx';
import { MenuPage } from './components/Menu/Menu.component';
import { ProductsPage } from './components/ProductsPage/ProductsPage.component';
import { Component } from './interfaces/Component.ts';

import './index.css';

function App() {
    const [currentComponent, setCurrentComponent] = useState<Component>(Component.ABOUT);

    function handleChangeContent(content: Component) {
        setCurrentComponent(content);
    }

    return (
        <CartContextProvider>
            <ProductsDataContextProvider>
                <div className="app_container">
                    <Header className="app_container__header" onChangeComponent={handleChangeContent} activeComponent={currentComponent} />
                    <main className="app_container__main">
                        {currentComponent === Component.ABOUT && <AboutPage />}
                        {currentComponent === Component.PRODUCTS && <ProductsPage />}
                        {currentComponent === Component.MENU && (
                            <MenuPage onChangeComponent={handleChangeContent} activeComponent={currentComponent} />
                        )}
                    </main>
                    <Footer className="app_container__footer" />
                </div>
            </ProductsDataContextProvider>
        </CartContextProvider>
    );
}

export default App;
