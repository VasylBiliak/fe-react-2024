// App.tsx
import { useState } from 'react';

import { CartContextProvider } from '@/context/Cart';
import { ProductsDataContextProvider } from '@/context/Product';

import { AboutComponent } from './components/About/About.component.tsx';
import { FooterComponent } from './components/Footer/Footer.component.tsx';
import { HeaderComponent } from './components/Header/Header.component.tsx';
import { ProductsList } from './components/ProductsList/ProductsList.component.tsx';
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
                <HeaderComponent onChangeComponent={handleChangeContent} activeComponent={currentComponent} />
                <main>
                    {currentComponent === Component.ABOUT && <AboutComponent />}
                    {currentComponent === Component.PRODUCTS && <ProductsList />}
                </main>
                <FooterComponent />
            </ProductsDataContextProvider>
        </CartContextProvider>
    );
}

export default App;
