import MainTemplate from './templates/MainTemplate';
import Hero from './containers/Hero/Hero';
// import { Routes, Route } from 'react-router';

const App = () => {
    return (
        <MainTemplate>
            <main>
                <Hero />
            </main>
        </MainTemplate>
    );
};

export default App;
