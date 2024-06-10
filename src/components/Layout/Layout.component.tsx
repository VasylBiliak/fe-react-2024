import { useState } from 'react';
import { Outlet } from 'react-router-dom';

import { Footer } from '@/components/Footer/Footer.component';
import { Header } from '@/components/Header/Header.component';
import { Component } from '@/interfaces/Component';

import '@/index.css';

export const LayoutPage = () => {
    const [currentComponent, setCurrentComponent] = useState<Component>(Component.ABOUT);

    function handleChangeContent(content: Component) {
        setCurrentComponent(content);
    }

    return (
        <div className="app_container">
            <Header onChangeComponent={handleChangeContent} activeComponent={currentComponent} />
            <main className="app_container__main">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};
