import { useState } from 'react';
import Demo from './views/content/Demo';
import { ThemeProvider } from './components/theme-provider';
import Nav from './views/nav/Nav';
import './App.scss';
import './globals.css';

const App = () => {
    return (
        <ThemeProvider
            defaultTheme="dark"
            storageKey="vite-ui-theme"
        >
            <Nav />
            <Demo />
        </ThemeProvider>
    );
};

export default App;
