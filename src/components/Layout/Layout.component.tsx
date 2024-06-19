import { Outlet } from 'react-router-dom';

import { Footer } from '@/components/Footer/Footer.component';
import { Header } from '@/components/Header/Header.component';

import '@/index.css';

export const LayoutPage = () => (
    <div className="app_container">
        <Header />
        <main className="app_container__main">
            <Outlet />
        </main>
        <Footer />
    </div>
);
